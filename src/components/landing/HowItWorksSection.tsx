"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { useGSAPHorizontalScroll } from "@/lib/gsap/hooks";
import { CheckCircle2, Sparkles } from "lucide-react";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Fresh Floral Selection",
    tag: "Morning Bazaar",
    desc: "Fresh jasmine, crimson roses, pink lotus & marigolds handpicked on event morning from fresh flower bourses.",
    detail: "Guarantees fragrant garlands & crisp blossom borders."
  },
  {
    step: "02",
    title: "Authentic Ghee Sweets",
    tag: "Heritage Recipes",
    desc: "Pure ghee Mysore Pak, Laddus, Badusha & premium dry fruit assortments in decorative brass bowls.",
    detail: "Sourced from reputed heritage sweet makers."
  },
  {
    step: "03",
    title: "Exotic Fruit Baskets",
    tag: "Auspicious Pyramids",
    desc: "Artfully arranged pomegranates, apples, green grapes, pineapples & auspicious bananas in stacked pyramids.",
    detail: "Washed, polished & individually wrapped for protection."
  },
  {
    step: "04",
    title: "Silk & Ceremonial Attire",
    tag: "Kanchipuram Silks",
    desc: "Kanchipuram silk towel, blouse pieces & embroidered coconuts presented with gold thread borders.",
    detail: "Folded neatly into velvet & brass presentation trays."
  },
  {
    step: "05",
    title: "Paruppu Thengai Cones",
    tag: "Sugar & Ghee Art",
    desc: "Handcrafted sugar/jaggery and lentil ceremonial cones embellished with edible gold leaf & pearl beads.",
    detail: "Traditional centerpiece of Tamil wedding Seer Varisai."
  },
  {
    step: "06",
    title: "Heirloom Brass Platter Assembly",
    tag: "Master Craftsmanship",
    desc: "Polished brass lamps, silver kumkum chimizh & mirror-finished presentation platters delivered in pristine condition.",
    detail: "Sustainably hand-polished brass heirloom pieces."
  },
  {
    step: "07",
    title: "Royal Dry Fruit Casket",
    tag: "Exquisite Imports",
    desc: "Saffron-infused almonds, jumbo cashews, Afghan figs & pistachios presented in brass-inlaid teakwood boxes.",
    detail: "Sealed for maximum freshness and royal aroma."
  },
  {
    step: "08",
    title: "Custom Floral Mandala Styling",
    tag: "Artistic Framing",
    desc: "Intricate circular floral mandalas meticulously layered beneath each tray for stage display.",
    detail: "Designed to harmonize with your wedding stage décor."
  },
  {
    step: "09",
    title: "Transit Velvet Protection",
    tag: "Safe Transport",
    desc: "Dust-free custom velvet protective shrouds and shock-resistant transport frames for zero movement during transit.",
    detail: "Ensures zero damage during transit to venue."
  },
  {
    step: "10",
    title: "White-Glove Stage Setup",
    tag: "Venue Concierge",
    desc: "Direct-to-venue delivery with stage setup managed by our master plating artisans before guests arrive.",
    detail: "Flawless arrangement ready for ceremonial stage photos."
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
      className="relative w-full h-svh flex flex-col py-8 sm:py-12 bg-sand border-y border-border/50 overflow-hidden"
    >
      {/* Pinned Section Header */}
      <Container size="xl" className="shrink-0 pt-2 sm:pt-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-semibold text-accent mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Artisanal Plating Journey</span>
        </div>
        <h2 className="text-h2 font-serif font-medium text-foreground tracking-tight">
          How We Craft Your Seer Varisai Set
        </h2>
        <p className="text-body text-muted-foreground max-w-xl mx-auto mt-2 text-sm sm:text-base">
          Discover the 10 traditional ceremonial steps handcrafted by our master plating artisans for your special celebration.
        </p>
      </Container>

      {/* Horizontal Cards Track Container — takes every pixel the header leaves
          behind so the cards are never clipped by the pinned viewport height. */}
      <div className="w-full flex-1 min-h-0 flex items-center overflow-hidden py-6">
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
                <span className="text-display font-serif font-bold text-accent/40 group-hover:text-accent transition-colors">
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
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span className="text-foreground/90 font-sans">{card.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


