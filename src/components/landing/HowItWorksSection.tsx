"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { useGSAPHorizontalScroll } from "@/lib/gsap/hooks";
import { CheckCircle2, Sparkles } from "lucide-react";

/*
 * These steps describe the process, not outcomes we cannot promise. The earlier
 * copy asserted "Guarantees fragrant garlands", "zero damage during transit",
 * "Sourced from reputed heritage sweet makers", "edible gold leaf" and
 * "Sustainably hand-polished brass" — sourcing and outcome claims that would
 * each need evidence behind them.
 */
const PROCESS_STEPS = [
  {
    step: "01",
    title: "Choosing the Flowers",
    tag: "Close to Your Date",
    desc: "Jasmine, roses, lotus and marigold, bought close to your event date rather than held in stock.",
    detail: "Chosen to match the colours you have picked."
  },
  {
    step: "02",
    title: "Sweets & Dry Fruit",
    tag: "Traditional Sweets",
    desc: "Mysore Pak, laddu, badusha and dry fruit assortments, arranged in decorative bowls.",
    detail: "Tell us your preferences and we will source to them."
  },
  {
    step: "03",
    title: "Fruit Arrangements",
    tag: "Stacked Trays",
    desc: "Pomegranates, apples, grapes, pineapple and bananas, washed and arranged in stacked tray settings.",
    detail: "Wrapped where needed to keep them clean in transit."
  },
  {
    step: "04",
    title: "Silk & Ceremonial Cloth",
    tag: "Cloth Presentation",
    desc: "Silk towels, blouse pieces and decorated coconuts, folded and presented on the tray.",
    detail: "Folded and set into the presentation trays."
  },
  {
    step: "05",
    title: "Paruppu Thengai Cones",
    tag: "Traditional Item",
    desc: "Sugar or jaggery and lentil ceremonial cones, decorated to suit the rest of the set.",
    detail: "A traditional centrepiece of Tamil wedding Seer Varisai."
  },
  {
    step: "06",
    title: "Brass & Lamp Items",
    tag: "Polished Finish",
    desc: "Brass lamps, kumkum chimizh and presentation platters, cleaned and polished before the event.",
    detail: "Checked over before they leave for the venue."
  },
  {
    step: "07",
    title: "Dry Fruit Boxes",
    tag: "Gift Boxes",
    desc: "Almonds, cashews, figs and pistachios presented in decorative boxes as part of the set.",
    detail: "Sealed so they stay fresh until the ceremony."
  },
  {
    step: "08",
    title: "Floral Mandala Styling",
    tag: "Stage Framing",
    desc: "Circular floral mandalas layered beneath the trays for the stage display.",
    detail: "Designed to sit well with your stage décor."
  },
  {
    step: "09",
    title: "Packing for Transit",
    tag: "Safe Transport",
    desc: "Trays are covered and packed into transport frames so they move as little as possible on the way.",
    detail: "Packed to protect the arrangement in transit."
  },
  {
    step: "10",
    title: "Setting Up at the Venue",
    tag: "Venue Setup",
    desc: "We deliver to your hall or venue and lay the trays out there, at a time agreed with you.",
    detail: "Arranged and ready before the ceremony begins."
  }
];

export function HowItWorksSection() {
  const sectionRef = useGSAPHorizontalScroll({
    pin: true,
    start: "top top",
    speed: 1.1,
    holdRatio: 0.1,
  });

  return (
    <section
      ref={sectionRef}
      // Fixed height, not min-h: a pinned section taller than the viewport would
      // stay clipped for the whole pinned range. svh rather than vh so the mobile
      // URL bar doesn't push the bottom of the cards out of sight.
      className="ui-htrack-section relative w-full h-svh flex flex-col py-8 sm:py-12 bg-sand border-y border-border/50 overflow-hidden"
    >
      {/* Pinned Section Header */}
      <Container size="xl" className="shrink-0 pt-2 sm:pt-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent-text mb-2">
          <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Our Process</span>
        </div>
        <h2 className="text-h2 font-serif font-medium text-foreground tracking-tight">
          How We Put Your Seer Varisai Set Together
        </h2>
        <p className="text-body text-muted-foreground max-w-xl mx-auto mt-2 text-sm sm:text-base">
          The ten steps between your enquiry and the trays being set out at your venue.
        </p>
      </Container>

      {/* Horizontal Cards Track Container — takes every pixel the header leaves
          behind so the cards are never clipped by the pinned viewport height. */}
      {/*
        Under prefers-reduced-motion the GSAP horizontal scroll bails out (see
        isReducedMotion in lib/gsap/config.ts). Without a fallback the track
        stayed a single w-max row inside an overflow-hidden box, so nine of the
        ten cards were simply unreachable for those users. ui-htrack-viewport
        turns the row into a wrapping grid in that case — see globals.css.
      */}
      <div className="ui-htrack-viewport w-full flex-1 min-h-0 flex items-center overflow-hidden py-6">
        <div
          data-horizontal-track
          className="flex items-stretch gap-6 sm:gap-8 w-max px-6 sm:px-16 will-change-transform"
        >
          {PROCESS_STEPS.map((card, i) => (
            <div
              key={i}
              className="w-[85vw] sm:w-[380px] md:w-[420px] p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-warm-md flex flex-col justify-between gap-6 shrink-0 relative overflow-hidden group hover:border-accent/60 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                {/* The step number is content, not decoration, so it needs real
                    contrast — accent/40 on card was under 2:1. */}
                <span className="text-display font-serif font-bold text-accent-text/70 group-hover:text-accent-text transition-colors">
                  {card.step}
                </span>
                <Badge variant="gold" size="sm">
                  {card.tag}
                </Badge>
              </div>

              <div className="flex flex-col gap-2.5">
                <h3 className="text-h3 font-serif font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="text-body-sm text-muted-foreground leading-relaxed font-sans">
                  {card.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-primary pt-4 border-t border-border/40">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                <span className="text-foreground/90 font-sans">{card.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


