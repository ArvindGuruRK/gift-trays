/**
 * The photo library, shared by the homepage gallery section and the /gallery
 * page so the two can never drift apart.
 *
 * Ten photographs that ship in `public/gallery/photos` were previously absent
 * from this list — they were only ever referenced by the Collections and
 * Occasions sections, so the gallery grid silently showed 21 of the 31 photos
 * the site actually has.
 */

export type GalleryCategory =
  | "wedding"
  | "engagement"
  | "seemantham"
  | "housewarming"
  | "custom";

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  title: string;
  /**
   * What the photograph actually shows. This used to hold invented venue names
   * ("Imperial Mandapam Shrine", "Destination Wedding Resort") attached to real
   * photos — the same misrepresentation as the fake reviews, in miniature.
   * Keep these factual: describe the arrangement, do not name a venue.
   */
  location: string;
  imageUrl: string;
  imageAlt: string;
  /**
   * Shown in the homepage preview grid. The homepage deliberately carries a
   * subset; /gallery is where the full set lives, so the landing page does not
   * grow by a third and the dedicated page has a reason to exist.
   */
  featured?: boolean;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    category: "wedding",
    title: "15-Tray Fruit & Sweet Arrangement",
    location: "Fruit and sweet trays, gold mandala setting",
    imageUrl: "/gallery/photos/gold-tray-flower-mandala-closeup-1.webp",
    imageAlt: "Fifteen trays of fruit and sweets laid out in a gold mandala pattern",
    featured: true,
  },
  {
    id: "g2",
    category: "engagement",
    title: "Nitchayathartham Betel & Jasmine Set",
    location: "Betel leaf and floral tray arrangement",
    imageUrl: "/gallery/photos/gold-tray-flower-mandala-closeup-2.webp",
    imageAlt: "Betel leaves and jasmine arranged across engagement trays",
    featured: true,
  },
  {
    id: "g3",
    category: "seemantham",
    title: "Seemantham Bangles & Lotus Tray",
    location: "Bangles and lotus tray arrangement",
    imageUrl: "/gallery/photos/gold-tray-flower-mandala-closeup-3.webp",
    imageAlt: "Glass bangles and lotus flowers arranged on a ceremonial tray",
    featured: true,
  },
  {
    id: "g4",
    category: "wedding",
    title: "Brass Kuthuvilakku Lamp Platter",
    location: "Brass lamp and platter arrangement",
    imageUrl: "/gallery/photos/gold-tray-flower-mandala-closeup-4.webp",
    imageAlt: "Brass kuthuvilakku lamp set on a decorated platter",
    featured: true,
  },
  {
    id: "g5",
    category: "housewarming",
    title: "Grahapravesam Banana Flower Thamboolam",
    location: "Banana flower and thamboolam set",
    imageUrl: "/gallery/photos/pink-ribbon-daisy-mandala-spread-2.webp",
    imageAlt: "Banana flower and thamboolam trays with pink ribbon detailing",
    featured: true,
  },
  {
    id: "g6",
    category: "custom",
    title: "Lotus & Dry Fruit Pyramid Basket",
    location: "Lotus and dry fruit tray arrangement",
    imageUrl: "/gallery/photos/daisy-mandala-grand-spread-2.webp",
    imageAlt: "Dry fruit pyramids and lotus flowers across a daisy mandala spread",
    featured: true,
  },
  {
    id: "g7",
    category: "wedding",
    title: "Assorted Fruit & Snack Tray Set",
    location: "Assorted fruit and snack trays",
    imageUrl: "/gallery/photos/assorted-fruit-snack-trays.webp",
    imageAlt: "Assorted fruit and snack trays arranged side by side",
    featured: true,
  },
  {
    id: "g8",
    category: "custom",
    title: "Eleven-Tray Fruit & Nut Assortment",
    location: "Eleven-tray fruit and nut set",
    imageUrl: "/gallery/photos/eleven-tray-fruit-nut-closeup.webp",
    imageAlt: "Close view of an eleven-tray fruit and nut assortment",
    featured: true,
  },
  {
    id: "g9",
    category: "engagement",
    title: "Fruit & Sweets Tray Grid",
    location: "Fruit and sweets tray grid",
    imageUrl: "/gallery/photos/eleven-tray-fruit-sweets-grid-1.webp",
    imageAlt: "Fruit and sweets arranged in an even grid of trays",
    featured: true,
  },
  {
    id: "g10",
    category: "seemantham",
    title: "Fruit & Sweets Tray Grid",
    location: "Fruit and sweets tray grid",
    imageUrl: "/gallery/photos/eleven-tray-fruit-sweets-grid-2.webp",
    imageAlt: "Fruit and sweets arranged in an even grid of trays",
    featured: true,
  },
  {
    id: "g11",
    category: "housewarming",
    title: "Fruit & Sweets Tray Grid",
    location: "Fruit and sweets tray grid",
    imageUrl: "/gallery/photos/eleven-tray-fruit-sweets-grid-3.webp",
    imageAlt: "Fruit and sweets arranged in an even grid of trays",
    featured: true,
  },
  {
    id: "g12",
    category: "wedding",
    title: "Grand Mandala Fruit Arrangement",
    location: "Trays laid out during preparation",
    imageUrl: "/gallery/photos/grand-mandala-arrangement.webp",
    imageAlt: "Large mandala fruit arrangement laid out during preparation",
    featured: true,
  },
  {
    id: "g13",
    category: "custom",
    title: "Grand Assorted Tray Collection",
    location: "Full set laid out before packing",
    imageUrl: "/gallery/photos/grand-tray-collection-mall-floor-1.webp",
    imageAlt: "A full assorted tray collection laid out before packing",
    featured: true,
  },
  {
    id: "g14",
    category: "wedding",
    title: "Grand Assorted Tray Collection",
    location: "Full set laid out before packing",
    imageUrl: "/gallery/photos/grand-tray-collection-mall-floor-2.webp",
    imageAlt: "A full assorted tray collection laid out before packing",
    featured: true,
  },
  {
    id: "g15",
    category: "seemantham",
    title: "Green & Gold Dry Fruit Trays",
    location: "Green and gold dry fruit trays",
    imageUrl: "/gallery/photos/green-gold-dry-fruit-trays.webp",
    imageAlt: "Dry fruit trays in a green and gold colour scheme",
    featured: true,
  },
  {
    id: "g16",
    category: "engagement",
    title: "Heart-Pattern Eight Tray Set",
    location: "Heart-pattern eight-tray set",
    imageUrl: "/gallery/photos/heart-pattern-eight-tray-set-1.webp",
    imageAlt: "Eight trays arranged in a heart pattern",
    featured: true,
  },
  {
    id: "g17",
    category: "wedding",
    title: "Heart-Pattern Eight Tray Set",
    location: "Heart-pattern eight-tray set",
    imageUrl: "/gallery/photos/heart-pattern-eight-tray-set-2.webp",
    imageAlt: "Eight trays arranged in a heart pattern",
    featured: true,
  },
  {
    id: "g18",
    category: "housewarming",
    title: "Kitchen Floor Tray Spread",
    location: "Trays laid out during preparation",
    imageUrl: "/gallery/photos/kitchen-floor-eleven-tray-spread.webp",
    imageAlt: "Eleven trays spread out on the floor during preparation",
    featured: true,
  },
  {
    id: "g19",
    category: "seemantham",
    title: "Laddu, Grape & Pistachio Tray Set",
    location: "Laddu, grape and pistachio tray set",
    imageUrl: "/gallery/photos/laddu-grape-pistachio-tray-set.webp",
    imageAlt: "Trays of laddu, grapes and pistachios",
    featured: true,
  },
  {
    id: "g20",
    category: "wedding",
    title: "Grand Tray Spread",
    location: "Full set laid out before packing",
    imageUrl: "/gallery/photos/market-floor-grand-tray-spread-1.webp",
    imageAlt: "A grand tray spread laid out before packing",
    featured: true,
  },
  {
    id: "g21",
    category: "custom",
    title: "Grand Tray Spread",
    location: "Full set laid out before packing",
    imageUrl: "/gallery/photos/market-floor-grand-tray-spread-2.webp",
    imageAlt: "A grand tray spread laid out before packing",
    featured: true,
  },

  /*
   * Photographs that ship with the site but were missing from the grid. Their
   * descriptions are drawn from how the Collections and Occasions sections
   * already describe the same images, so the site says one thing about a photo.
   */
  {
    id: "g22",
    category: "wedding",
    title: "Wedding Seer Varisai Stage Set",
    location: "Complete seer varisai set arranged on the ceremony stage",
    imageUrl: "/gallery/photos/wedding-seer-varisai-stage.webp",
    imageAlt: "Seer varisai trays arranged on a wedding ceremony stage",
  },
  {
    id: "g23",
    category: "wedding",
    title: "Mandapam Full Stage Spread",
    location: "Silk, coconuts and floral borders across the mandapam stage",
    imageUrl: "/gallery/photos/wedding-mandapam-full-stage-spread.webp",
    imageAlt: "A full tray spread arranged across a wedding mandapam stage",
  },
  {
    id: "g24",
    category: "wedding",
    title: "Daisy Mandala Tray Spread",
    location: "Daisy mandala layout across a full tray spread",
    imageUrl: "/gallery/photos/daisy-mandala-tray-spread.webp",
    imageAlt: "Trays laid out in a daisy mandala pattern",
  },
  {
    id: "g25",
    category: "engagement",
    title: "Betel Leaf & Peacock Rose Gift Set",
    location: "Betel leaves, peacock-folded roses and gift hampers",
    imageUrl: "/gallery/photos/betel-leaf-peacock-rose-gift.webp",
    imageAlt: "Betel leaves with peacock-folded roses and gift hampers",
  },
  {
    id: "g26",
    category: "engagement",
    title: "Pink Ribbon Daisy Mandala Spread",
    location: "Pink ribbon detailing over a daisy mandala arrangement",
    imageUrl: "/gallery/photos/pink-ribbon-daisy-mandala-spread-1.webp",
    imageAlt: "Daisy mandala tray arrangement finished with pink ribbon",
  },
  {
    id: "g27",
    category: "seemantham",
    title: "White Chrysanthemum Mandala Arrangement",
    location: "Chrysanthemum and leaf mandala across the full arrangement",
    imageUrl: "/gallery/photos/white-chrysanthemum-leaf-mandala-hero.webp",
    imageAlt: "White chrysanthemum and leaf mandala across a tray arrangement",
  },
  {
    id: "g28",
    category: "seemantham",
    title: "Chrysanthemum Leaf Mandala, Close Detail",
    location: "Close detail of the chrysanthemum and leaf border",
    imageUrl: "/gallery/photos/white-chrysanthemum-leaf-mandala-closeup.webp",
    imageAlt: "Close view of a white chrysanthemum and leaf mandala border",
  },
  {
    id: "g29",
    category: "housewarming",
    title: "Gold Tray Halwa Mandala Spread",
    location: "Halwa and sweets set in a gold mandala",
    imageUrl: "/gallery/photos/gold-tray-halwa-mandala-spread.webp",
    imageAlt: "Halwa and sweets arranged in a gold mandala across trays",
  },
  {
    id: "g30",
    category: "housewarming",
    title: "Marigold & Money Leaf Centrepiece",
    location: "Marigold and money-leaf centrepiece with surrounding trays",
    imageUrl: "/gallery/photos/marigold-money-leaf-centerpiece-spread.webp",
    imageAlt: "Marigold and money leaf centrepiece surrounded by trays",
  },
  {
    id: "g31",
    category: "custom",
    title: "Rose Mandala & Pineapple Tray Spread",
    location: "Rose mandala with pineapple and fresh fruit trays",
    imageUrl: "/gallery/photos/rose-mandala-pineapple-tray-spread-1.webp",
    imageAlt: "Rose mandala arrangement with pineapple and fruit trays",
  },
];

/** The subset the homepage preview grid renders. */
export const FEATURED_GALLERY_ITEMS = GALLERY_ITEMS.filter((item) => item.featured);

/** Human-readable name for each category, used on cards and in the lightbox. */
export const OCCASION_LABELS: Record<GalleryCategory, string> = {
  wedding: "Wedding",
  engagement: "Engagement",
  seemantham: "Seemantham",
  housewarming: "Housewarming",
  custom: "Custom Theme",
};

export interface GalleryFilter {
  id: string;
  label: string;
}

/** Filters, in the order they appear. "all" is not a category. */
export const GALLERY_FILTERS: GalleryFilter[] = [
  { id: "all", label: "All Photos" },
  { id: "wedding", label: "Weddings" },
  { id: "engagement", label: "Engagements" },
  { id: "seemantham", label: "Seemantham" },
  { id: "housewarming", label: "Housewarming" },
  { id: "custom", label: "Custom Theme" },
];

/** How many photographs a given filter will show. */
export function countFor(items: GalleryItem[], filterId: string): number {
  return filterId === "all"
    ? items.length
    : items.filter((item) => item.category === filterId).length;
}
