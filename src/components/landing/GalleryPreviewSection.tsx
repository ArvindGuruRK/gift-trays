"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { GSAPTextReveal, GSAPPageEmerge } from "@/components/animations";
import { Eye } from "lucide-react";

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
    // static backdrop. The grid below is marked data-emerge-deep so it
    // settles a beat behind the heading, giving the reveal real parallax depth.
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

          {/* Gallery Filter Buttons */}
          <div
            className="flex items-center justify-center gap-2 flex-wrap mt-8 mb-10"
            role="group"
            aria-label="Filter photographs by occasion"
          >
            {[
              { id: "all", label: "All Photos" },
              { id: "wedding", label: "Weddings" },
              { id: "engagement", label: "Engagements" },
              { id: "seemantham", label: "Seemantham" },
              { id: "housewarming", label: "Housewarming" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                className={`px-4 py-2 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-warm-sm"
                    : "bg-card text-foreground/80 border border-border hover:bg-secondary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <p aria-live="polite" className="sr-only">
            Showing {filteredItems.length} photograph
            {filteredItems.length === 1 ? "" : "s"}.
          </p>

          {/* Photo Grid */}
          <div data-emerge-deep className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              /*
                A real <button>. As clickable <div>s these gallery tiles were
                unreachable by keyboard and announced nothing to a screen reader.
              */
              <button
                key={item.id}
                type="button"
                aria-label={`${item.title} — ${item.location}. Open enquiry.`}
                className="ui-card-button group rounded-xl overflow-hidden border border-border bg-card shadow-warm-sm hover:shadow-warm-lg transition-all"
                onClick={() => onImageClick?.(item)}
              >
                <div className="relative overflow-hidden">
                  <ImageFrame
                    src={item.imageUrl}
                    alt=""
                    aspectRatio="4/3"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-card/90 text-primary flex items-center justify-center shadow-warm-md">
                      <Eye className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-1 text-left">
                  <span className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </span>
                  <span className="text-xs text-muted-foreground font-sans">
                    {item.location}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </Container>
      </Section>
    </GSAPPageEmerge>
  );
}
