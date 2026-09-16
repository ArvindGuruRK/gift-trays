/**
 * Collection catalogue for the /collections page.
 *
 * This used to live inside the homepage's CollectionsSection. It moved here,
 * and off the homepage entirely, because /gallery already gives visitors a
 * way to browse real photographs — keeping a second, overlapping grid on the
 * homepage added length without adding information. The catalogue itself is
 * still useful on its own page, grouped by occasion with what's actually on
 * each tray set, so it lives at /collections instead.
 */

export type CollectionCategory =
  | "wedding"
  | "engagement"
  | "seemantham"
  | "housewarming"
  | "custom";

export interface CollectionItem {
  id: string;
  category: CollectionCategory;
  title: string;
  subtitle: string;
  itemCount: string;
  imageUrl: string;
  imageAlt: string;
  description: string;
}

export const COLLECTIONS_DATA: CollectionItem[] = [
  {
    id: "col-1",
    category: "wedding",
    title: "Royal Wedding Seer Varisai Sets",
    subtitle: "Ceremonial Wedding",
    itemCount: "11–21 Trays Set",
    imageUrl: "/gallery/photos/wedding-seer-varisai-stage.webp",
    imageAlt: "Wedding Seer Varisai Trays",
    description:
      "Complete traditional set with fruit pyramids, dry fruits, ghee sweets, decorated coconuts, silk towels, and brass lamps.",
  },
  {
    id: "col-2",
    category: "engagement",
    title: "Engagement Thamboolam Collection",
    subtitle: "Nitchayathartham",
    itemCount: "7–11 Trays Set",
    imageUrl: "/gallery/photos/betel-leaf-peacock-rose-gift.webp",
    imageAlt: "Engagement Thamboolam Arrangements",
    description:
      "Betel leaves, supari, ring exchange platters, fresh jasmine garlands, and handcrafted gift hampers.",
  },
  {
    id: "col-3",
    category: "seemantham",
    title: "Seemantham & Valaikappu Special",
    subtitle: "Traditional Baby Shower",
    itemCount: "5–9 Trays Set",
    imageUrl: "/gallery/photos/white-chrysanthemum-leaf-mandala-hero.webp",
    imageAlt: "Seemantham Gift Trays",
    description:
      "7 varieties of traditional sweets, glass bangles tray arrangement, lotus decor, and sari presentation platter.",
  },
  {
    id: "col-4",
    category: "housewarming",
    title: "Grahapravesam Auspicious Trays",
    subtitle: "Housewarming Ceremony",
    itemCount: "5–7 Trays Set",
    imageUrl: "/gallery/photos/gold-tray-halwa-mandala-spread.webp",
    imageAlt: "Grahapravesam Trays",
    description:
      "Traditional Kamatchi Amman lamp tray, vilakku set, coconut thamboolam, and seasonal fruit baskets.",
  },
  {
    id: "col-5",
    category: "custom",
    title: "Custom Designer Theme Sets",
    subtitle: "Bespoke Arrangements",
    itemCount: "Tailored Trays",
    imageUrl: "/gallery/photos/rose-mandala-pineapple-tray-spread-1.webp",
    imageAlt: "Custom Designer Trays",
    description:
      "Tailored to your specific colour theme, flower preference, imported chocolates, or custom brass artifacts.",
  },
  {
    id: "col-6",
    category: "wedding",
    title: "Heritage Silk & Saree Presentation",
    subtitle: "Kanchipuram Silk Special",
    itemCount: "3–5 Trays Set",
    imageUrl: "/gallery/photos/wedding-mandapam-full-stage-spread.webp",
    imageAlt: "Silk Saree Presentation",
    description:
      "Elegant silk saree folding, dhoti set display, gold embroidered coconuts, and lotus floral borders.",
  },
];

export interface CollectionFilter {
  id: string;
  label: string;
}

export const COLLECTION_FILTERS: CollectionFilter[] = [
  { id: "all", label: "All Collections" },
  { id: "wedding", label: "Wedding Seer" },
  { id: "engagement", label: "Engagement" },
  { id: "seemantham", label: "Seemantham" },
  { id: "housewarming", label: "Housewarming" },
  { id: "custom", label: "Custom Theme" },
];
