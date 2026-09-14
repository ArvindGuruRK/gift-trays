"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { CollectionCard } from "@/components/ui/CollectionCard";
import { FilterTabs, type FilterTab } from "@/components/ui/FilterTabs";
import { GSAPTextReveal, GSAPImageReveal, GSAPPageEmerge } from "@/components/animations";
import { motion, AnimatePresence } from "motion/react";
import { fadeUp } from "@/lib/animations";

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  /**
   * What the photograph actually shows. This used to hold invented venue names
   * ("Imperial Mandapam Shrine", "Destination Wedding Resort") attached to real
   * photos — the same misrepresentation as the fake reviews, in miniature.
   * Keep these factual: describe the arrangement, don't name a venue.
   */
  location: string;
  imageUrl: string;
  imageAlt: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    category: "wedding",
    title: "15-Tray Fruit & Sweet Arrangement",
    location: "Fruit and sweet trays, gold mandala setting",
    imageUrl: "/gallery/photos/gold-tray-flower-mandala-closeup-1.webp",
    imageAlt: "15-Tray Fruit & Sweet Arrangement"
  },
  {
    id: "g2",
    category: "engagement",
    title: "Nitchayathartham Betel & Jasmine Set",
    location: "Betel leaf and floral tray arrangement",
    imageUrl: "/gallery/photos/gold-tray-flower-mandala-closeup-2.webp",
    imageAlt: "Nitchayathartham Betel & Jasmine Set"
  },
  {
    id: "g3",
    category: "seemantham",
    title: "Seemantham Bangles & Lotus Tray",
    location: "Bangles and lotus tray arrangement",
    imageUrl: "/gallery/photos/gold-tray-flower-mandala-closeup-3.webp",
    imageAlt: "Seemantham Bangles & Lotus Tray"
  },
  {
    id: "g4",
    category: "wedding",
    title: "Brass Kuthuvilakku Lamp Platter",
    location: "Brass lamp and platter arrangement",
    imageUrl: "/gallery/photos/gold-tray-flower-mandala-closeup-4.webp",
    imageAlt: "Brass Kuthuvilakku Lamp Platter"
  },
  {
    id: "g5",
    category: "housewarming",
    title: "Grahapravesam Banana Flower Thamboolam",
    location: "Banana flower and thamboolam set",
    imageUrl: "/gallery/photos/pink-ribbon-daisy-mandala-spread-2.webp",
    imageAlt: "Grahapravesam Banana Flower Thamboolam"
  },
  {
    id: "g6",
    category: "custom",
    title: "Lotus & Dry Fruit Pyramid Basket",
    location: "Lotus and dry fruit tray arrangement",
    imageUrl: "/gallery/photos/daisy-mandala-grand-spread-2.webp",
    imageAlt: "Lotus & Dry Fruit Pyramid Basket"
  },
  {
    id: "g7",
    category: "wedding",
    title: "Assorted Fruit & Snack Tray Set",
    location: "Assorted fruit and snack trays",
    imageUrl: "/gallery/photos/assorted-fruit-snack-trays.webp",
    imageAlt: "Assorted Fruit & Snack Tray Set"
  },
  {
    id: "g8",
    category: "custom",
    title: "Eleven-Tray Fruit & Nut Assortment",
    location: "Eleven-tray fruit and nut set",
    imageUrl: "/gallery/photos/eleven-tray-fruit-nut-closeup.webp",
    imageAlt: "Eleven-Tray Fruit & Nut Assortment"
  },
  {
    id: "g9",
    category: "engagement",
    title: "Fruit & Sweets Tray Grid",
    location: "Fruit and sweets tray grid",
    imageUrl: "/gallery/photos/eleven-tray-fruit-sweets-grid-1.webp",
    imageAlt: "Fruit & Sweets Tray Grid"
  },
  {
    id: "g10",
    category: "seemantham",
    title: "Fruit & Sweets Tray Grid",
    location: "Fruit and sweets tray grid",
    imageUrl: "/gallery/photos/eleven-tray-fruit-sweets-grid-2.webp",
    imageAlt: "Fruit & Sweets Tray Grid"
  },
  {
    id: "g11",
    category: "housewarming",
    title: "Fruit & Sweets Tray Grid",
    location: "Fruit and sweets tray grid",
    imageUrl: "/gallery/photos/eleven-tray-fruit-sweets-grid-3.webp",
    imageAlt: "Fruit & Sweets Tray Grid"
  },
  {
    id: "g12",
    category: "wedding",
    title: "Grand Mandala Fruit Arrangement",
    location: "Trays laid out during preparation",
    imageUrl: "/gallery/photos/grand-mandala-arrangement.webp",
    imageAlt: "Grand Mandala Fruit Arrangement"
  },
  {
    id: "g13",
    category: "custom",
    title: "Grand Assorted Tray Collection",
    location: "Full set laid out before packing",
    imageUrl: "/gallery/photos/grand-tray-collection-mall-floor-1.webp",
    imageAlt: "Grand Assorted Tray Collection"
  },
  {
    id: "g14",
    category: "wedding",
    title: "Grand Assorted Tray Collection",
    location: "Full set laid out before packing",
    imageUrl: "/gallery/photos/grand-tray-collection-mall-floor-2.webp",
    imageAlt: "Grand Assorted Tray Collection"
  },
  {
    id: "g15",
    category: "seemantham",
    title: "Green & Gold Dry Fruit Trays",
    location: "Green and gold dry fruit trays",
    imageUrl: "/gallery/photos/green-gold-dry-fruit-trays.webp",
    imageAlt: "Green & Gold Dry Fruit Trays"
  },
  {
    id: "g16",
    category: "engagement",
    title: "Heart-Pattern Eight Tray Set",
    location: "Heart-pattern eight-tray set",
    imageUrl: "/gallery/photos/heart-pattern-eight-tray-set-1.webp",
    imageAlt: "Heart-Pattern Eight Tray Set"
  },
  {
    id: "g17",
    category: "wedding",
    title: "Heart-Pattern Eight Tray Set",
    location: "Heart-pattern eight-tray set",
    imageUrl: "/gallery/photos/heart-pattern-eight-tray-set-2.webp",
    imageAlt: "Heart-Pattern Eight Tray Set"
  },
  {
    id: "g18",
    category: "housewarming",
    title: "Kitchen Floor Tray Spread",
    location: "Trays laid out during preparation",
    imageUrl: "/gallery/photos/kitchen-floor-eleven-tray-spread.webp",
    imageAlt: "Kitchen Floor Tray Spread"
  },
  {
    id: "g19",
    category: "seemantham",
    title: "Laddu, Grape & Pistachio Tray Set",
    location: "Laddu, grape and pistachio tray set",
    imageUrl: "/gallery/photos/laddu-grape-pistachio-tray-set.webp",
    imageAlt: "Laddu, Grape & Pistachio Tray Set"
  },
  {
    id: "g20",
    category: "wedding",
    title: "Grand Tray Spread",
    location: "Full set laid out before packing",
    imageUrl: "/gallery/photos/market-floor-grand-tray-spread-1.webp",
    imageAlt: "Grand Tray Spread"
  },
  {
    id: "g21",
    category: "custom",
    title: "Grand Tray Spread",
    location: "Full set laid out before packing",
    imageUrl: "/gallery/photos/market-floor-grand-tray-spread-2.webp",
    imageAlt: "Grand Tray Spread"
  }
];

/** Eyebrow shown on each card, matching the filter it belongs to. */
const OCCASION_LABELS: Record<string, string> = {
  wedding: "Wedding",
  engagement: "Engagement",
  seemantham: "Seemantham",
  housewarming: "Housewarming",
  custom: "Custom Theme",
};

const GALLERY_TABS: FilterTab[] = [
  { id: "all", label: "All Photos" },
  { id: "wedding", label: "Weddings" },
  { id: "engagement", label: "Engagements" },
  { id: "seemantham", label: "Seemantham" },
  { id: "housewarming", label: "Housewarming" },
  // Without this tab the custom-theme photos could only be reached via "All".
  { id: "custom", label: "Custom Theme" },
];

interface GalleryPreviewSectionProps {
  onImageClick?: (item: GalleryItem) => void;
}

export function GalleryPreviewSection({ onImageClick }: GalleryPreviewSectionProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredItems = activeTab === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((g) => g.category === activeTab);

  return (
    // Whole section — background included — rises and fades in as one panel
    // as it enters view, right after the "How We Craft" horizontal track
    // releases its pin, rather than just the text/photos floating in over a
    // static backdrop.
    <GSAPPageEmerge>
      <Section id="gallery" theme="ivory" padding="lg">
        <Container size="xl">
          <GSAPTextReveal as="div">
            <Heading
              eyebrow="From Real Celebrations"
              title="Gallery of Completed Arrangements"
              subtitle="Explore real-world photographs showcasing magnificent packed tray plating and authentic wedding ceremony arrangements."
              align="center"
              hasDivider
            />
          </GSAPTextReveal>

          <FilterTabs
            tabs={GALLERY_TABS}
            activeId={activeTab}
            onChange={setActiveTab}
            ariaLabel="Filter photographs by occasion"
          />

          <p aria-live="polite" className="sr-only">
            Showing {filteredItems.length} photograph
            {filteredItems.length === 1 ? "" : "s"}.
          </p>

          {/*
            Same card, curtain-mask reveal and animated filtering as the
            Collections section, so the two photo grids read as one design.
          */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.3 }}
                >
                  <GSAPImageReveal direction="up" start="top 85%">
                    <CollectionCard
                      title={item.title}
                      subtitle={OCCASION_LABELS[item.category]}
                      imageUrl={item.imageUrl}
                      ariaLabel={`${item.title} — ${item.location}. Enquire about this arrangement.`}
                      onClick={() => onImageClick?.(item)}
                    />
                  </GSAPImageReveal>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </Section>
    </GSAPPageEmerge>
  );
}
