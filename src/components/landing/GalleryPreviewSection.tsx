"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GSAPTextReveal, GSAPScrollReveal } from "@/components/animations";
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
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
    imageAlt: "15-Tray Fruit & Sweet Arrangement"
  },
  {
    id: "g2",
    category: "engagement",
    title: "Nitchayathartham Betel & Jasmine Set",
    location: "Heritage Betrothal Pavilion",
    imageUrl: "https://images.unsplash.com/photo-1545232979-fbf592320755?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Nitchayathartham Betel & Jasmine Set"
  },
  {
    id: "g3",
    category: "seemantham",
    title: "Seemantham Bangles & Lotus Tray",
    location: "Ceremonial Reception Stage",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Seemantham Bangles & Lotus Tray"
  },
  {
    id: "g4",
    category: "wedding",
    title: "Imperial Brass Kuthuvilakku Lamp Platter",
    location: "Imperial Mandapam Shrine",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Imperial Brass Kuthuvilakku Lamp Platter"
  },
  {
    id: "g5",
    category: "housewarming",
    title: "Grahapravesam Banana Flower Thamboolam",
    location: "Auspicious Sacred Stage",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Grahapravesam Banana Flower Thamboolam"
  },
  {
    id: "g6",
    category: "custom",
    title: "Lotus & Dry Fruit Pyramid Basket",
    location: "Destination Wedding Resort",
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Lotus & Dry Fruit Pyramid Basket"
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
    <Section theme="ivory" padding="lg">
      <Container size="xl">
        <GSAPTextReveal as="div">
          <Heading
            eyebrow="Real Event Portfolio"
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
        <GSAPScrollReveal type="fadeUp" stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              data-gsap-item
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
        </GSAPScrollReveal>
      </Container>
    </Section>
  );
}
