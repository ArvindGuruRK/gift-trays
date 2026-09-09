/**
 * Asserts the brand colour tokens meet WCAG 2.2 AA contrast.
 *
 * The palette originally used one gold (#B08D57) for both decoration and text,
 * and as text it failed badly — 2.28:1 on sand, 2.89:1 on ivory. The fix was to
 * split the roles: --accent stays decorative, --accent-text and
 * --accent-on-dark carry text. This script exists so a future palette tweak
 * cannot silently undo that.
 *
 *   node scripts/check-contrast.mjs
 */

import { readFile } from "node:fs/promises";

const CSS = "src/app/globals.css";

/** Relative luminance per WCAG 2.x. */
function luminance(hex) {
  const clean = hex.replace("#", "");
  const channels = [0, 2, 4]
    .map((i) => parseInt(clean.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Reads a custom property out of the :root block so this tracks the real CSS. */
function token(css, name) {
  const match = css.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`));
  if (!match) throw new Error(`Token --${name} not found in ${CSS}`);
  return match[1];
}

const AA_NORMAL = 4.5;
const AA_LARGE = 3.0;

const css = await readFile(CSS, "utf8");

const t = {
  background: token(css, "background"),
  foreground: token(css, "foreground"),
  primary: token(css, "primary"),
  primaryForeground: token(css, "primary-foreground"),
  secondary: token(css, "secondary"),
  accentText: token(css, "accent-text"),
  accentOnDark: token(css, "accent-on-dark"),
  accentForeground: token(css, "accent-foreground"),
  accent: token(css, "accent"),
  card: token(css, "card"),
  mutedForeground: token(css, "muted-foreground"),
  success: token(css, "success"),
  error: token(css, "error"),
};

// [label, foreground, background, minimum]
const CHECKS = [
  ["body text on page background", t.foreground, t.background, AA_NORMAL],
  ["body text on card", t.foreground, t.card, AA_NORMAL],
  ["muted text on page background", t.mutedForeground, t.background, AA_NORMAL],
  ["muted text on card", t.mutedForeground, t.card, AA_NORMAL],
  // Sand is a full-section background, so muted text sits on it constantly.
  // This pair was missed on the first pass and axe caught it at 4.35:1.
  ["muted text on sand", t.mutedForeground, t.secondary, AA_NORMAL],
  ["body text on sand", t.foreground, t.secondary, AA_NORMAL],
  ["primary text on page background", t.primary, t.background, AA_NORMAL],
  ["primary text on sand", t.primary, t.secondary, AA_NORMAL],
  ["button label on primary", t.primaryForeground, t.primary, AA_NORMAL],
  ["button label on accent", t.accentForeground, t.accent, AA_NORMAL],

  // The four that used to fail.
  ["gold eyebrow text on page background", t.accentText, t.background, AA_NORMAL],
  ["gold eyebrow text on sand", t.accentText, t.secondary, AA_NORMAL],
  ["gold eyebrow text on card", t.accentText, t.card, AA_NORMAL],
  ["gold text on maroon", t.accentOnDark, t.primary, AA_NORMAL],
  // The gold-on-dark badge tints its own background, so the effective ground is
  // lighter than plain maroon. axe caught this at 4.11:1 with a heavier tint.
  ["gold badge label on its tinted maroon ground", t.accentOnDark, "#752E32", AA_NORMAL],

  ["success text on card", t.success, t.card, AA_NORMAL],
  ["error text on card", t.error, t.card, AA_NORMAL],

  // WhatsApp button: brand green kept, label darkened.
  ["WhatsApp label on brand green", "#14261B", "#25D366", AA_NORMAL],

  // Non-text: the decorative gold only ever needs to be distinguishable.
  ["decorative gold on card (non-text)", t.accent, t.card, AA_LARGE],
];

let failed = 0;
console.log("WCAG 2.2 AA contrast check\n");

for (const [label, fg, bg, min] of CHECKS) {
  const value = ratio(fg, bg);
  const pass = value >= min;
  if (!pass) failed++;
  console.log(
    `  ${pass ? "PASS" : "FAIL"}  ${value.toFixed(2).padStart(5)}:1  (min ${min})  ${label}  ${fg} on ${bg}`
  );
}

console.log("");
if (failed > 0) {
  console.error(`${failed} contrast check(s) failed.`);
  process.exit(1);
}
console.log(`All ${CHECKS.length} contrast checks passed.`);
