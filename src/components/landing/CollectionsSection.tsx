"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { CollectionCard } from "@/components/ui/CollectionCard";
import { Badge } from "@/components/ui/Badge";
import { GSAPTextReveal, GSAPScrollReveal } from "@/components/animations";
import { motion, AnimatePresence } from "motion/react";
import { fadeUp } from "@/lib/animations";

interface CollectionItem {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  itemCount: string;
  imageUrl: string;
  imageAlt: string;
  description: string;
}

const COLLECTIONS_DATA: CollectionItem[] = [
  {
    id: "col-1",
    category: "wedding",
    title: "Royal Wedding Seer Varisai Sets",
    subtitle: "Ceremonial Wedding",
    itemCount: "11–21 Trays Set",
    imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Wedding Seer Varisai Trays",
    description: "Complete traditional set with fruit pyramids, dry fruits, ghee sweets, decorated coconuts, silk towels, and brass lamps."
  },
  {
    id: "col-2",
    category: "engagement",
    title: "Engagement Thamboolam Collection",
    subtitle: "Nitchayathartham",
    itemCount: "7–11 Trays Set",
    imageUrl: "https://images.unsplash.com/photo-1545232979-fbf592320755?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Engagement Thamboolam Arrangements",
    description: "Betel leaves, supari, ring exchange platters, fresh jasmine garlands, and handcrafted gift hampers."
  },
  {
    id: "col-3",
    category: "seemantham",
    title: "Seemantham & Valaikappu Special",
    subtitle: "Traditional Baby Shower",
    itemCount: "5–9 Trays Set",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Seemantham Gift Trays",
    description: "7 varieties of traditional sweets, glass bangles tray arrangement, lotus decor, and sari presentation platter."
  },
  {
    id: "col-4",
    category: "housewarming",
    title: "Grahapravesam Auspicious Trays",
    subtitle: "Housewarming Ceremony",
    itemCount: "5–7 Trays Set",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Grahapravesam Trays",
    description: "Traditional Kamatchi Amman lamp tray, vilakku set, coconut thamboolam, and seasonal fruit baskets."
  },
  {
    id: "col-5",
    category: "custom",
    title: "Custom Designer Theme Sets",
    subtitle: "Bespoke Arrangements",
    itemCount: "Tailored Trays",
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Custom Designer Trays",
    description: "Tailored to your specific color theme, flower preference, imported chocolates, or custom brass artifacts."
  },
  {
    id: "col-6",
    category: "wedding",
    title: "Heritage Silk & Saree Presentation",
    subtitle: "Kanchipuram Silk Special",
    itemCount: "3–5 Trays Set",
    imageUrl: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Silk Saree Presentation",
    description: "Elegant silk saree folding, dhoti set display, gold embroidered coconuts, and lotus floral borders."
  }
];

interface CollectionsSectionProps {
  onSelectCollection?: (collection: CollectionItem) => void;
}

export function CollectionsSection({ onSelectCollection }: CollectionsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredCollections = activeCategory === "all"
    ? COLLECTIONS_DATA
    : COLLECTIONS_DATA.filter((col) => col.category === activeCategory);

  return (
    <Section theme="sand" padding="lg">
      <Container size="xl">
        <GSAPTextReveal as="div">
          <Heading
            eyebrow="Curated Portfolio"
            title="Our Seer Varisai Collections"
            subtitle="Browse curated tray arrangements designed for every sacred South Indian occasion."
            align="center"
            hasDivider
          />
        </GSAPTextReveal>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mt-8 mb-10">
          {[
            { id: "all", label: "All Collections" },
            { id: "wedding", label: "Wedding Seer" },
            { id: "engagement", label: "Engagement" },
            { id: "seemantham", label: "Seemantham" },
            { id: "housewarming", label: "Housewarming" },
            { id: "custom", label: "Custom Theme" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? "bg-primary text-primary-foreground shadow-warm-sm"
                  : "bg-card text-foreground/80 border border-border hover:bg-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Collections Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCollections.map((col) => (
              <motion.div
                key={col.id}
                layout
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.3 }}
              >
                <CollectionCard
                  title={col.title}
                  subtitle={col.subtitle}
                  itemCount={col.itemCount}
                  imageUrl={col.imageUrl}
                  imageAlt={col.imageAlt}
                  onClick={() => onSelectCollection?.(col)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}
