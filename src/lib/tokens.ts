/**
 * Seer Varisai Thattu Design Tokens
 * Source of truth: docs/color-system.md, docs/typography-fonts.md, docs/design-system.md
 */

export const COLOR_TOKENS = {
  deepMaroon: "#6B1F2A",
  antiqueGold: "#B08D57",
  warmIvory: "#FAF7F0",
  sandBeige: "#E8DCC8",
  darkBrown: "#2B2118",
  softWhite: "#FFFDF8",

  // Semantic
  background: "#FAF7F0",
  foreground: "#2B2118",
  primary: "#6B1F2A",
  primaryHover: "#551821",
  secondary: "#E8DCC8",
  secondaryHover: "#DBCBB4",
  accent: "#B08D57",
  accentHover: "#9A7947",
  card: "#FFFDF8",
  muted: "#E8DCC8",
  mutedForeground: "#6F6257",
  border: "#D8CBB7",
  success: "#55745A",
  warning: "#A87832",
  error: "#9B3D3D",
} as const;

export const COLOR_USAGE_RATIOS = [
  { name: "Warm Ivory", hex: "#FAF7F0", ratio: "60–70%", role: "Main Page & Section Background" },
  { name: "Dark Brown", hex: "#2B2118", ratio: "10–15%", role: "Headings, Body & UI Text" },
  { name: "Deep Maroon", hex: "#6B1F2A", ratio: "10–15%", role: "Primary Brand CTAs & Accents" },
  { name: "Sand Beige", hex: "#E8DCC8", ratio: "5–10%", role: "Secondary Backgrounds & Cards" },
  { name: "Antique Gold", hex: "#B08D57", ratio: "2–5%", role: "Borders, Icons & Subtle Accents" },
] as const;

export const TYPOGRAPHY_TOKENS = {
  display: {
    font: "Cormorant Garamond",
    desktop: "72–96px",
    tablet: "56–72px",
    mobile: "44–56px",
    weight: "500–600",
  },
  h1: {
    font: "Cormorant Garamond",
    desktop: "56–72px",
    tablet: "48–56px",
    mobile: "40–48px",
    weight: "500–600",
  },
  h2: {
    font: "Cormorant Garamond",
    desktop: "44–56px",
    tablet: "40–48px",
    mobile: "34–40px",
    weight: "500",
  },
  h3: {
    font: "Cormorant Garamond",
    desktop: "32–40px",
    tablet: "30–36px",
    mobile: "28–32px",
    weight: "500",
  },
  h4: {
    font: "Cormorant Garamond",
    desktop: "26–32px",
    tablet: "24–28px",
    mobile: "22–26px",
    weight: "500",
  },
  bodyLarge: {
    font: "Manrope",
    size: "18–20px",
    weight: "400",
  },
  body: {
    font: "Manrope",
    size: "16px",
    weight: "400",
  },
  bodySmall: {
    font: "Manrope",
    size: "14px",
    weight: "400",
  },
  caption: {
    font: "Manrope",
    size: "12–13px",
    weight: "400",
  },
  button: {
    font: "Manrope",
    size: "14–16px",
    weight: "600",
  },
  eyebrow: {
    font: "Manrope",
    size: "13px",
    weight: "600",
    letterSpacing: "0.12em",
  },
} as const;

export const SPACING_SCALE = [
  { token: "xs", px: 4 },
  { token: "sm", px: 8 },
  { token: "md", px: 12 },
  { token: "base", px: 16 },
  { token: "lg", px: 24 },
  { token: "xl", px: 32 },
  { token: "2xl", px: 48 },
  { token: "3xl", px: 64 },
  { token: "4xl", px: 80 },
  { token: "5xl", px: 96 },
  { token: "6xl", px: 128 },
] as const;

export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;
