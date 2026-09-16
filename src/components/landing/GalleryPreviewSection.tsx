"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { CollectionCard } from "@/components/ui/CollectionCard";
import { FilterTabs, type FilterTab } from "@/components/ui/FilterTabs";
import { Button } from "@/components/ui/Button";
import { GSAPTextReveal, GSAPImageReveal, GSAPPageEmerge } from "@/components/animations";
import { motion, AnimatePresence } from "motion/react";
import { fadeUp } from "@/lib/animations";
import {
  FEATURED_GALLERY_ITEMS,
  GALLERY_ITEMS,
  OCCASION_LABELS,
  type GalleryItem,
} from "@/lib/gallery";
import { ArrowRight } from "lucide-react";

/*
 * Tabs and photo data now come from `@/lib/gallery`, shared with the /gallery
 * page so the two grids cannot describe the same photograph differently.
 *
 * This section shows the featured subset, not the whole library — it is a
 * preview, and /gallery is where all of them live.
 */
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
    ? FEATURED_GALLERY_ITEMS
    : FEATURED_GALLERY_ITEMS.filter((g) => g.category === activeTab);

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

          {/*
            Without this the preview is a dead end: the nav entry for Gallery
            points at /gallery, so someone who arrives here by scrolling would
            otherwise never learn the rest of the photographs exist.
          */}
          <div className="mt-12 flex flex-col items-center gap-3">
            <p className="text-sm text-muted-foreground font-sans text-center">
              Showing {FEATURED_GALLERY_ITEMS.length} of {GALLERY_ITEMS.length} photographs.
            </p>
            <Link href="/gallery">
              <Button
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View the full gallery
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </GSAPPageEmerge>
  );
}
