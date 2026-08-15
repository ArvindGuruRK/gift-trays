"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GSAPTextReveal, GSAPPageEmerge } from "@/components/animations";
import { Eye, Sparkles } from "lucide-react";

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  location: string;
  imageUrl: string;
  imageAlt: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    category: "wedding",
    title: "15-Tray Fruit & Sweet Arrangement",
    location: "Grand Kalyana Mandapam, Royal Stage",
    imageUrl: "/gallery/photos/gold-tray-flower-mandala-closeup-1.jpeg",
    imageAlt: "15-Tray Fruit & Sweet Arrangement"
  },
  {
    id: "g2",
    category: "engagement",
    title: "Nitchayathartham Betel & Jasmine Set",
    location: "Heritage Betrothal Pavilion",
    imageUrl: "/gallery/photos/gold-tray-flower-mandala-closeup-2.jpeg",
    imageAlt: "Nitchayathartham Betel & Jasmine Set"
  },
  {
    id: "g3",
    category: "seemantham",
    title: "Seemantham Bangles & Lotus Tray",
    location: "Ceremonial Reception Stage",
    imageUrl: "/gallery/photos/gold-tray-flower-mandala-closeup-3.jpeg",
    imageAlt: "Seemantham Bangles & Lotus Tray"
  },
  {
    id: "g4",
    category: "wedding",
    title: "Imperial Brass Kuthuvilakku Lamp Platter",
    location: "Imperial Mandapam Shrine",
    imageUrl: "/gallery/photos/gold-tray-flower-mandala-closeup-4.jpeg",
    imageAlt: "Imperial Brass Kuthuvilakku Lamp Platter"
  },
  {
    id: "g5",
    category: "housewarming",
    title: "Grahapravesam Banana Flower Thamboolam",
    location: "Auspicious Sacred Stage",
    imageUrl: "/gallery/photos/pink-ribbon-daisy-mandala-spread-2.jpeg",
    imageAlt: "Grahapravesam Banana Flower Thamboolam"
  },
  {
    id: "g6",
    category: "custom",
    title: "Lotus & Dry Fruit Pyramid Basket",
    location: "Destination Wedding Resort",
    imageUrl: "/gallery/photos/daisy-mandala-grand-spread-2.jpeg",
    imageAlt: "Lotus & Dry Fruit Pyramid Basket"
  },
  {
    id: "g7",
    category: "wedding",
    title: "Assorted Fruit & Snack Tray Set",
    location: "Ceremonial Prep Table",
    imageUrl: "/gallery/photos/assorted-fruit-snack-trays.jpeg",
    imageAlt: "Assorted Fruit & Snack Tray Set"
  },
  {
    id: "g8",
    category: "custom",
    title: "Eleven-Tray Fruit & Nut Assortment",
    location: "Custom Theme Setup",
    imageUrl: "/gallery/photos/eleven-tray-fruit-nut-closeup.jpeg",
    imageAlt: "Eleven-Tray Fruit & Nut Assortment"
  },
  {
    id: "g9",
    category: "engagement",
    title: "Fruit & Sweets Tray Grid",
    location: "Engagement Ceremony Table",
    imageUrl: "/gallery/photos/eleven-tray-fruit-sweets-grid-1.jpeg",
    imageAlt: "Fruit & Sweets Tray Grid"
  },
  {
    id: "g10",
    category: "seemantham",
    title: "Fruit & Sweets Tray Grid",
    location: "Seemantham Ceremony Table",
    imageUrl: "/gallery/photos/eleven-tray-fruit-sweets-grid-2.jpeg",
    imageAlt: "Fruit & Sweets Tray Grid"
  },
  {
    id: "g11",
    category: "housewarming",
    title: "Fruit & Sweets Tray Grid",
    location: "Grahapravesam Table Setup",
    imageUrl: "/gallery/photos/eleven-tray-fruit-sweets-grid-3.jpeg",
    imageAlt: "Fruit & Sweets Tray Grid"
  },
  {
    id: "g12",
    category: "wedding",
    title: "Grand Mandala Fruit Arrangement",
    location: "Prep Kitchen Floor",
    imageUrl: "/gallery/photos/grand-mandala-arrangement.jpeg",
    imageAlt: "Grand Mandala Fruit Arrangement"
  },
  {
    id: "g13",
    category: "custom",
    title: "Grand Assorted Tray Collection",
    location: "Staging Floor Layout",
    imageUrl: "/gallery/photos/grand-tray-collection-mall-floor-1.jpeg",
    imageAlt: "Grand Assorted Tray Collection"
  },
  {
    id: "g14",
    category: "wedding",
    title: "Grand Assorted Tray Collection",
    location: "Staging Floor Layout",
    imageUrl: "/gallery/photos/grand-tray-collection-mall-floor-2.jpeg",
    imageAlt: "Grand Assorted Tray Collection"
  },
  {
    id: "g15",
    category: "seemantham",
    title: "Green & Gold Dry Fruit Trays",
    location: "Ceremonial Tray Set",
    imageUrl: "/gallery/photos/green-gold-dry-fruit-trays.jpeg",
    imageAlt: "Green & Gold Dry Fruit Trays"
  },
  {
    id: "g16",
    category: "engagement",
    title: "Heart-Pattern Eight Tray Set",
    location: "Engagement Tray Display",
    imageUrl: "/gallery/photos/heart-pattern-eight-tray-set-1.jpeg",
    imageAlt: "Heart-Pattern Eight Tray Set"
  },
  {
    id: "g17",
    category: "wedding",
    title: "Heart-Pattern Eight Tray Set",
    location: "Wedding Tray Display",
    imageUrl: "/gallery/photos/heart-pattern-eight-tray-set-2.jpeg",
    imageAlt: "Heart-Pattern Eight Tray Set"
  },
  {
    id: "g18",
    category: "housewarming",
    title: "Kitchen Floor Tray Spread",
    location: "Prep Kitchen Floor",
    imageUrl: "/gallery/photos/kitchen-floor-eleven-tray-spread.jpeg",
    imageAlt: "Kitchen Floor Tray Spread"
  },
  {
    id: "g19",
    category: "seemantham",
    title: "Laddu, Grape & Pistachio Tray Set",
    location: "Ceremonial Sweets Table",
    imageUrl: "/gallery/photos/laddu-grape-pistachio-tray-set.jpeg",
    imageAlt: "Laddu, Grape & Pistachio Tray Set"
  },
  {
    id: "g20",
    category: "wedding",
    title: "Grand Tray Spread",
    location: "Staging Floor Layout",
    imageUrl: "/gallery/photos/market-floor-grand-tray-spread-1.jpeg",
    imageAlt: "Grand Tray Spread"
  },
  {
    id: "g21",
    category: "custom",
    title: "Grand Tray Spread",
    location: "Staging Floor Layout",
    imageUrl: "/gallery/photos/market-floor-grand-tray-spread-2.jpeg",
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
      <Section theme="ivory" padding="lg">
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
          <div className="flex items-center justify-center gap-2 flex-wrap mt-8 mb-10">
            {[
              { id: "all", label: "All Photos" },
              { id: "wedding", label: "Weddings" },
              { id: "engagement", label: "Engagements" },
              { id: "seemantham", label: "Seemantham" },
              { id: "housewarming", label: "Housewarming" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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

          {/* Photo Grid */}
          <div data-emerge-deep className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer rounded-xl overflow-hidden border border-border bg-card shadow-warm-sm hover:shadow-warm-lg transition-all"
                onClick={() => onImageClick?.(item)}
              >
                <div className="relative overflow-hidden">
                  <ImageFrame
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    aspectRatio="4/3"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-card/90 text-primary flex items-center justify-center shadow-warm-md">
                      <Eye className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-1">
                  <span className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </span>
                  <span className="text-xs text-muted-foreground font-sans">
                    {item.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </GSAPPageEmerge>
  );
}
