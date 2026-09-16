"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { CollectionCard } from "@/components/ui/CollectionCard";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { KolamCornerFlourish } from "@/components/ui/Motifs";
import { WhatsAppLogo } from "@/components/ui/WhatsAppLogo";
import { fadeUp } from "@/lib/animations";
import { BUSINESS, whatsappHref } from "@/lib/business";
import { COLLECTIONS_DATA, COLLECTION_FILTERS, type CollectionItem } from "@/lib/collections";
import { CheckCircle, Sparkles } from "lucide-react";

/**
 * /collections — the full catalogue, moved off the homepage.
 *
 * Structured the same way as /gallery: breadcrumb, page hero, filterable
 * grid, closing CTA. The enquiry modal is the same pattern the homepage used
 * to drive from this section — see it fire on a card click below.
 */
export function CollectionsPageClient() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeItem, setActiveItem] = useState<CollectionItem | null>(null);

  const filteredCollections =
    activeCategory === "all"
      ? COLLECTIONS_DATA
      : COLLECTIONS_DATA.filter((col) => col.category === activeCategory);

  return (
    <>
      {/* ------------------------------------------------------------ */}
      {/* Page header                                                   */}
      {/* ------------------------------------------------------------ */}
      <Section theme="sand" padding="md" className="relative overflow-hidden">
        <KolamCornerFlourish
          size={150}
          className="absolute top-0 right-0 opacity-30 pointer-events-none scale-x-[-1]"
          aria-hidden="true"
        />
        <KolamCornerFlourish
          size={150}
          className="absolute bottom-0 left-0 opacity-30 pointer-events-none scale-y-[-1]"
          aria-hidden="true"
        />

        <Container size="lg">
          <Heading
            as="h1"
            variant="h1"
            eyebrow="Our Work"
            title="Our Seer Varisai Collections"
            subtitle="Tray arrangements for different South Indian occasions. Every set can be adjusted to your requirements — colours, flowers, tray count and contents."
            align="center"
            hasDivider
          />
        </Container>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Filters + grid                                                */}
      {/* ------------------------------------------------------------ */}
      <Section theme="ivory" padding="lg">
        <Container size="xl">
          <FilterTabs
            tabs={COLLECTION_FILTERS}
            activeId={activeCategory}
            onChange={setActiveCategory}
            ariaLabel="Filter collections by occasion"
          />

          <p aria-live="polite" className="sr-only">
            Showing {filteredCollections.length} collection
            {filteredCollections.length === 1 ? "" : "s"}.
          </p>

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
                    onClick={() => setActiveItem(col)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Closing call to action                                        */}
      {/* ------------------------------------------------------------ */}
      <Section theme="maroon" padding="lg" className="relative overflow-hidden">
        <KolamCornerFlourish
          size={160}
          className="absolute top-0 left-0 opacity-40 pointer-events-none"
          aria-hidden="true"
        />
        <KolamCornerFlourish
          size={160}
          className="absolute bottom-0 right-0 opacity-40 pointer-events-none rotate-180"
          aria-hidden="true"
        />

        <Container size="md">
          <div className="flex flex-col items-center text-center gap-6">
            <Sparkles className="w-8 h-8 text-accent" aria-hidden="true" />
            <Heading
              theme="dark"
              variant="h2"
              title="Don't see exactly what you need?"
              subtitle="Every collection here is a starting point. Tell us your occasion, tray count and budget and we will put together something tailored."
              align="center"
            />
            <OrnamentalDivider className="opacity-60" />
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={whatsappHref(
                  `Hello ${BUSINESS.displayName}, I was looking at your collections and would like a quote.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enquire on WhatsApp (opens in a new tab)"
              >
                <Button variant="secondary" size="lg" leftIcon={<WhatsAppLogo size={20} />}>
                  Enquire on WhatsApp
                </Button>
              </a>
              <Link href="/#enquiry-form">
                <Button
                  variant="outline"
                  size="lg"
                  className="!text-white !border-white/70 hover:!bg-white/10"
                >
                  Use the enquiry form
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ */}
      {/* Collection detail modal                                       */}
      {/* ------------------------------------------------------------ */}
      <Modal
        isOpen={activeItem !== null}
        onClose={() => setActiveItem(null)}
        title={activeItem?.title}
        description={activeItem?.subtitle}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setActiveItem(null)}>
              Close
            </Button>
            {activeItem && (
              <a
                href={whatsappHref(
                  `Hello ${BUSINESS.displayName}, I am interested in ${activeItem.title}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ask about this on WhatsApp (opens in a new tab)"
              >
                <Button variant="secondary" size="sm" leftIcon={<WhatsAppLogo size={18} />}>
                  Ask on WhatsApp
                </Button>
              </a>
            )}
          </>
        }
      >
        {activeItem && (
          <div className="flex flex-col gap-4 py-2">
            <div className="p-4 rounded-xl bg-secondary/50 border border-border flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-success shrink-0" aria-hidden="true" />
              <div>
                <span className="text-sm font-semibold text-foreground font-sans block">
                  {activeItem.itemCount}
                </span>
                <span className="text-xs text-muted-foreground font-sans">
                  {activeItem.subtitle}
                </span>
              </div>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed font-sans">
              {activeItem.description}
            </p>

            <p className="text-sm text-foreground/80 leading-relaxed font-sans">
              Every arrangement is put together around your occasion, tray
              count and budget, so pricing depends on what you choose. Message
              us with your requirements and we will come back to you with a
              quote.
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
