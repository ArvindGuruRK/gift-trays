import { test } from "@playwright/test";

for (const width of [1440, 1280, 1024, 900, 768, 640]) {
  test(`card geometry at ${width}`, async ({ browser }) => {
    const ctx = await browser.newContext({ viewport: { width, height: 1000 } });
    const page = await ctx.newPage();
    await page.goto("/gallery", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1200);

    const r = await page.evaluate(() => {
      // Stat strip
      const dl = document.querySelector("main dl");
      const stats = dl ? [...dl.children].map((c) => {
        const b = c.getBoundingClientRect();
        return `${Math.round(b.x)},${Math.round(b.y)} ${Math.round(b.width)}x${Math.round(b.height)}`;
      }) : [];

      // Photo tiles: wrapper (grid cell) vs the button inside it
      const cells = [...document.querySelectorAll("main .grid > div")].slice(0, 6);
      const tiles = cells.map((cell) => {
        const btn = cell.querySelector("button")!;
        const cb = cell.getBoundingClientRect();
        const bb = btn.getBoundingClientRect();
        return {
          cell: `${Math.round(cb.height)}`,
          btn: `${Math.round(bb.height)}`,
          gap: Math.round(cb.height - bb.height),
          title: (btn.querySelector(".font-serif")?.textContent || "").slice(0, 26),
        };
      });
      return { stats, tiles };
    });

    console.log(`\n### ${width}px`);
    console.log("stat cards:", JSON.stringify(r.stats));
    for (const t of r.tiles) {
      console.log(`  cell=${t.cell} btn=${t.btn} GAP=${t.gap}  "${t.title}"`);
    }
    await ctx.close();
  });
}
