# Color System — Seer Varisai Thattu

Create the color system for a premium family-run **Seer Varisai Thattu and traditional ceremonial gift arrangement brand**.

The color palette should communicate **South Indian tradition, celebration, warmth, elegance, trust, and premium craftsmanship** while still feeling modern enough for a high-end contemporary website.

## Primary Color Palette

Use the following core brand colors:

### 1. Deep Maroon — Primary

**HEX:** `#6B1F2A`

Use for:

* Primary buttons
* Important CTAs
* Brand elements
* Navigation accents
* Selected states
* Important headings
* Dark hero sections
* Active navigation states

Deep maroon should be the main brand color and represent tradition, celebration, richness, and warmth.

---

### 2. Antique Gold — Accent

**HEX:** `#B08D57`

Use sparingly for:

* Decorative borders
* Dividers
* Small icons
* Highlights
* Premium accents
* Hover details
* Traditional ornamental elements
* Small typography accents

Gold should be subtle and sophisticated.

**Do not use gold as the primary background color or for large areas of the interface.**

Avoid bright metallic yellow.

---

### 3. Warm Ivory — Main Background

**HEX:** `#FAF7F0`

Use as the primary website background.

This should occupy the majority of the interface and create a warm, elegant, editorial feeling.

Use it for:

* Main page backgrounds
* Hero backgrounds
* Large content sections
* Product browsing areas

---

### 4. Sand Beige — Secondary Background

**HEX:** `#E8DCC8`

Use for:

* Alternate sections
* Collection backgrounds
* Supporting content areas
* Subtle visual separation
* Secondary cards
* Decorative areas

This color should provide contrast without becoming visually heavy.

---

### 5. Dark Brown — Primary Text

**HEX:** `#2B2118`

Use instead of pure black for most text.

Use for:

* Headings
* Body text
* Navigation
* Product information
* Descriptions
* Form labels

Avoid using pure `#000000` unless absolutely necessary.

---

### 6. Soft White — Surface

**HEX:** `#FFFDF8`

Use for:

* Cards
* Modals
* Forms
* Dropdowns
* Navigation surfaces
* Elevated UI elements

This should feel warmer than pure white.

---

# Semantic Color Tokens

Create semantic design tokens so the colors can be reused consistently throughout the application.

```text
--background: #FAF7F0
--foreground: #2B2118

--primary: #6B1F2A
--primary-foreground: #FFFDF8

--secondary: #E8DCC8
--secondary-foreground: #2B2118

--accent: #B08D57
--accent-foreground: #2B2118

--card: #FFFDF8
--card-foreground: #2B2118

--muted: #E8DCC8
--muted-foreground: #6F6257

--border: #D8CBB7

--success: #55745A
--warning: #A87832
--error: #9B3D3D
```

These semantic tokens should be used throughout the component system rather than hardcoding colors inside individual components.

---

# Color Usage Ratio

Maintain approximately this visual balance:

```text
Warm Ivory       60–70%
Dark Brown       10–15%
Deep Maroon      10–15%
Sand Beige        5–10%
Antique Gold      2–5%
```

The website should feel **light, spacious, warm, and premium**.

Do not allow maroon or gold to dominate the entire interface.

---

# Accessibility

Ensure that text and interactive elements maintain sufficient contrast against their backgrounds.

Do not use Antique Gold `#B08D57` as small body text on the Ivory background when contrast is insufficient.

For important readable content, prioritize:

**Dark Brown + Ivory**

or

**Ivory + Deep Maroon**

---

# Color Behavior

Define consistent states for the brand colors.

### Primary Button

Default:

`#6B1F2A`

Hover:

Use a slightly darker maroon.

Active:

Use an even deeper maroon.

Text:

`#FFFDF8`

### Gold Accent

Gold should become slightly more prominent on hover but should never become bright yellow.

### Links

Use Deep Maroon for normal links and a subtle Antique Gold interaction or underline effect on hover.

### Borders

Use muted beige tones rather than dark borders.

---

# Visual Philosophy

The color system should communicate:

**Traditional Tamil Wedding Culture**

*

**Luxury Boutique Branding**

*

**Modern Editorial Web Design**

*

**Warm Family-Owned Business**

The final result should feel sophisticated and timeless rather than flashy.

Avoid:

* Bright red
* Bright yellow
* Neon colors
* Purple gradients
* Excessive gold
* Pure black backgrounds
* Excessive glassmorphism
* Generic SaaS color palettes
* Rainbow accent colors

The palette should look equally appropriate on the website, printed wedding material, packaging, business cards, social media posts, and future physical branding.

## Final Brand Palette

**Deep Maroon** — `#6B1F2A`
**Antique Gold** — `#B08D57`
**Warm Ivory** — `#FAF7F0`
**Sand Beige** — `#E8DCC8`
**Dark Brown** — `#2B2118`
**Soft White** — `#FFFDF8`

This palette should become the **core color foundation of the entire Seer Varisai Thattu brand and design system**.
