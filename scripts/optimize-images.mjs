/**
 * Compresses the photographs in public/ and rewrites the references to them.
 *
 * The gallery shipped 31 source JPEGs totalling ~8 MB, several over 350 KB.
 * next/image optimises these when serving, so this is not about what a visitor
 * downloads today — it is about repo weight, build time and giving the
 * optimiser a sensible input to work from.
 *
 * Converts to WebP, caps the longest edge, and deletes the originals once the
 * replacement is confirmed smaller. Run with --dry to preview.
 *
 *   node scripts/optimize-images.mjs [--dry] [--quality=78] [--max=1400]
 *
 * `sharp` is already present as a Next.js dependency, so this adds nothing.
 */

import { readdir, stat, unlink, readFile, writeFile } from "node:fs/promises";
import { join, extname, relative } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = join(ROOT, "public");
const SRC_DIR = join(ROOT, "src");

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const QUALITY = Number(args.find((a) => a.startsWith("--quality="))?.split("=")[1] ?? 78);
const MAX_EDGE = Number(args.find((a) => a.startsWith("--max="))?.split("=")[1] ?? 1400);

const RASTER = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

async function main() {
  const files = (await walk(PUBLIC_DIR)).filter((f) => RASTER.has(extname(f).toLowerCase()));

  if (files.length === 0) {
    console.log("No JPEG or PNG files left in public/ — nothing to do.");
    return;
  }

  console.log(
    `${DRY ? "[dry run] " : ""}Optimising ${files.length} images (quality ${QUALITY}, max edge ${MAX_EDGE}px)\n`
  );

  let before = 0;
  let after = 0;
  const renames = new Map();

  for (const file of files) {
    const original = await stat(file);
    before += original.size;

    const target = file.replace(/\.(jpe?g|png)$/i, ".webp");
    const image = sharp(file);
    const meta = await image.metadata();

    const needsResize = Math.max(meta.width ?? 0, meta.height ?? 0) > MAX_EDGE;

    const pipeline = image
      .rotate() // honour EXIF orientation before stripping metadata
      .resize(
        needsResize
          ? { width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true }
          : undefined
      )
      .webp({ quality: QUALITY, effort: 6 });

    const output = await pipeline.toBuffer();

    // Keep the original if converting made it bigger — rare, but possible for
    // flat graphics already well compressed as PNG.
    if (output.length >= original.size) {
      console.log(
        `  keep   ${relative(ROOT, file)} — webp was larger (${kb(output.length)} vs ${kb(original.size)})`
      );
      after += original.size;
      continue;
    }

    const saved = (((original.size - output.length) / original.size) * 100).toFixed(0);
    console.log(
      `  ${DRY ? "would " : ""}write ${relative(ROOT, target)} — ${kb(original.size)} → ${kb(output.length)} (-${saved}%)`
    );

    after += output.length;
    renames.set(
      "/" + relative(PUBLIC_DIR, file).split("\\").join("/"),
      "/" + relative(PUBLIC_DIR, target).split("\\").join("/")
    );

    if (!DRY) {
      await writeFile(target, output);
      await unlink(file);
    }
  }

  // Rewrite every reference so the site keeps working after the rename.
  if (renames.size > 0) {
    const sources = (await walk(SRC_DIR)).filter((f) =>
      [".ts", ".tsx", ".css", ".mjs", ".js"].includes(extname(f))
    );

    let touched = 0;
    for (const source of sources) {
      const text = await readFile(source, "utf8");
      let next = text;
      for (const [from, to] of renames) next = next.split(from).join(to);
      if (next !== text) {
        touched++;
        if (!DRY) await writeFile(source, next);
      }
    }
    console.log(`\n  ${DRY ? "would update" : "updated"} ${touched} source file(s) with new paths`);
  }

  const pct = before > 0 ? (((before - after) / before) * 100).toFixed(1) : "0";
  console.log(`\nTotal: ${kb(before)} → ${kb(after)} (-${pct}%)`);
  if (DRY) console.log("Dry run — nothing was written.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
