"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { WhatsAppLogo } from "@/components/ui/WhatsAppLogo";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { KolamCornerFlourish } from "@/components/ui/Motifs";
import { BUSINESS, whatsappHref } from "@/lib/business";
import {
  GALLERY_FILTERS,
  GALLERY_ITEMS,
  OCCASION_LABELS,
  countFor,
} from "@/lib/gallery";
import { ArrowLeft, ArrowRight, Camera, Eye, ChevronRight } from "lucide-react";

/**
 * /gallery — the full photo library.
 *
 * The tile design here is deliberately the earlier one (photograph, hover
 * overlay with a view affordance, caption panel beneath) rather than the
 * `CollectionCard` the homepage section moved to. On the homepage the gallery
 * sits directly below Collections and the two grids reading alike is the point;
 * on a page that is nothing but photographs, the caption-under-photo layout
 * gives each image more room and a plainer frame.
 */
/** Beyond this many tiles the entrance delay stops growing. */
const STAGGER_CAP = 8;

export function GalleryPageClient() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  // Honoured explicitly: unlike the GSAP hooks, motion variants do not opt out
  // of animating on their own.
  const reduceMotion = useReducedMotion();

  const filteredItems = useMemo(
    () =>
      activeFilter === "all"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === activeFilter),
    [activeFilter]
  );

  // Index within the *filtered* list, so paging through the lightbox follows
  // what is on screen rather than wandering into photos the filter excludes.
  const lightboxIndex = lightboxId
    ? filteredItems.findIndex((item) => item.id === lightboxId)
    : -1;
  const activeItem = lightboxIndex >= 0 ? filteredItems[lightboxIndex] : null;

  const showRelative = useCallback(
    (step: number) => {
      if (lightboxIndex < 0 || filteredItems.length === 0) return;
      const next = (lightboxIndex + step + filteredItems.length) % filteredItems.length;
      setLightboxId(filteredItems[next].id);
    },
    [lightboxIndex, filteredItems]
  );

  // Arrow keys page through the photographs. Modal already handles Escape and
  // the focus trap, so this only adds what a gallery needs on top.
  useEffect(() => {
    if (!activeItem) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showRelative(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        showRelative(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeItem, showRelative]);

  const closeLightbox = useCallback(() => setLightboxId(null), []);

  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Page header                                                      */}
      {/* ---------------------------------------------------------------- */}
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
          {/*
            A visible breadcrumb, matching the BreadcrumbList structured data
            the page emits — the machine-readable trail and the human one should
            not disagree.
          */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-xs font-sans text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li className="text-foreground font-semibold" aria-current="page">
                Gallery
              </li>
            </ol>
          </nav>

          <Heading
            as="h1"
            variant="h1"
            eyebrow="From Real Celebrations"
            title="Gallery of Completed Arrangements"
            subtitle={`Every photograph on this page is a tray set we actually arranged — no stock imagery, no staged studio shots. ${GALLERY_ITEMS.length} photographs across weddings, engagements, seemantham and housewarming ceremonies.`}
            align="center"
            hasDivider
          />
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Filters + photo grid                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section theme="ivory" padding="lg">
        <Container size="xl">
          {/*
            The filter pills carry their own counts. On a 31-photo page an empty
            or near-empty filter is otherwise only discovered by clicking it.
          */}
          <div
            className="flex items-center justify-center gap-2 flex-wrap mb-4"
            role="group"
            aria-label="Filter photographs by occasion"
          >
            {GALLERY_FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              const count = countFor(GALLERY_ITEMS, filter.id);
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={isActive}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer inline-flex items-center gap-2 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-warm-sm"
                      : "bg-card text-foreground/80 border border-border hover:bg-secondary"
                  }`}
                >
                  {filter.label}
                  <span
                    aria-hidden="true"
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono leading-none ${
                      isActive ? "bg-primary-foreground/20" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <p aria-live="polite" className="text-center text-sm text-muted-foreground font-sans mb-10">
            Showing {filteredItems.length} photograph
            {filteredItems.length === 1 ? "" : "s"}
            {activeFilter === "all" ? "" : ` in ${OCCASION_LABELS[filteredItems[0]?.category ?? "wedding"]}`}.
          </p>

          {/*
            The restored tile: photograph, hover overlay with a view affordance,
            caption panel underneath. Keyed on the filter so the whole grid
            re-runs its stagger when the filter changes, which reads as a
            deliberate re-deal rather than items silently swapping in place.
          */}
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                  // Capped. A flat 0.12s stagger over 31 photographs meant the
                  // last tile did not appear for nearly four seconds, and an
                  // accessibility scan measured half the captions mid-fade.
                  delay: Math.min(index, STAGGER_CAP) * 0.04,
                }}
                className="h-full"
              >
                {/*
                  A real <button>. As clickable <div>s these gallery tiles were
                  unreachable by keyboard and announced nothing to a screen reader.
                */}
                <button
                  type="button"
                  aria-label={`${item.title} — ${item.location}. View larger photograph.`}
                  className="ui-card-button group flex h-full w-full flex-col rounded-xl overflow-hidden border border-border bg-card shadow-warm-sm hover:shadow-warm-lg transition-all"
                  onClick={() => setLightboxId(item.id)}
                >
                  <div className="relative overflow-hidden">
                    <ImageFrame
                      src={item.imageUrl}
                      alt=""
                      aspectRatio="4/3"
                      // The first row is above the fold on most screens.
                      priority={index < 3}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Which ceremony this belongs to, readable without hovering. */}
                    <span
                      aria-hidden="true"
                      className="absolute top-3 left-3 rounded-full bg-card/90 backdrop-blur-sm border border-accent/40 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.14em] text-accent-text shadow-warm-sm"
                    >
                      {OCCASION_LABELS[item.category]}
                    </span>

                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <div className="w-10 h-10 rounded-full bg-card/90 text-primary flex items-center justify-center shadow-warm-md">
                        <Eye className="w-5 h-5 text-accent" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-1 p-4 text-left">
                    <span className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </span>
                    <span className="text-xs text-muted-foreground font-sans">
                      {item.location}
                    </span>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Closing call to action                                           */}
      {/* ---------------------------------------------------------------- */}
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
            <Camera className="w-8 h-8 text-accent" aria-hidden="true" />
            <Heading
              theme="dark"
              variant="h2"
              title="Seen an arrangement you like?"
              subtitle="Send us the photograph and we will put together a quote for the same set, adjusted to your tray count, colour theme and ceremony date."
              align="center"
            />
            <OrnamentalDivider className="opacity-60" />
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={whatsappHref(
                  `Hello ${BUSINESS.displayName}, I was looking at your gallery and would like a quote.`
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
                {/*
                  ! prefix: .ui-btn-outline hard-sets its colour, so an
                  unprefixed text-white loses and the label renders near-black
                  on maroon — 1.39:1, the same trap the final CTA documents.
                */}
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

      {/* ---------------------------------------------------------------- */}
      {/* Lightbox                                                         */}
      {/* ---------------------------------------------------------------- */}
      <Modal
        isOpen={activeItem !== null}
        onClose={closeLightbox}
        size="xl"
        title={activeItem?.title}
        description={activeItem?.location}
        footer={
          activeItem ? (
            <div className="flex w-full flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showRelative(-1)}
                  aria-label="Previous photograph"
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => showRelative(1)}
                  aria-label="Next photograph"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Next
                </Button>
              </div>

              <a
                href={whatsappHref(
                  `Hello ${BUSINESS.displayName}, I am interested in an arrangement like "${activeItem.title}".`
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask about ${activeItem.title} on WhatsApp (opens in a new tab)`}
              >
                <Button variant="secondary" size="sm" leftIcon={<WhatsAppLogo size={18} />}>
                  Ask about this
                </Button>
              </a>
            </div>
          ) : null
        }
      >
        {activeItem && (
          <div className="flex flex-col gap-4">
            {/*
              A plain next/image rather than ImageFrame: this is the detail view,
              so the photograph is shown whole (object-contain) instead of being
              cropped to a fixed 4:3 the way the grid thumbnails are.
            */}
            <div className="relative w-full h-[min(55vh,460px)] rounded-lg overflow-hidden bg-secondary/40">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeItem.imageUrl}
                    alt={activeItem.imageAlt}
                    fill
                    sizes="(max-width: 896px) 100vw, 896px"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-accent-text">
                {OCCASION_LABELS[activeItem.category]}
              </span>
              <span className="text-xs text-muted-foreground font-sans">
                Photograph {lightboxIndex + 1} of {filteredItems.length}
                <span className="hidden sm:inline"> — use the arrow keys to browse</span>
              </span>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
