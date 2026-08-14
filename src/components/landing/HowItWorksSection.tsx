"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { GSAPTextReveal, GSAPHorizontalScroll } from "@/components/animations";
import { CheckCircle2, Flower, Sparkles } from "lucide-react";

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
    tag: "Traditional Recipes",
    desc: "Pure ghee Mysore Pak, Laddus, Badusha & premium dry fruit assortments in decorative brass bowls.",
    detail: "Sourced from reputed heritage sweet makers."
  },
  {
    step: "03",
    title: "Exotic Fruit Baskets",
    tag: "Auspicious Fruits",
    desc: "Artfully arranged pomegranates, apples, green grapes, pineapples & auspicious bananas in stacked pyramids.",
    detail: "Washed, polished & individually wrapped for protection."
  },
  {
    step: "04",
    title: "Silk & Saree Folding",
    tag: "Ceremonial Attire",
    desc: "Kanchipuram silk towel, blouse pieces & embroidered coconuts presented with gold thread borders.",
    detail: "Folded neatly into velvet & brass presentation trays."
  },
  {
    step: "05",
    title: "Brass Platter Assembly",
    tag: "Final Venue Setup",
    desc: "Polished brass lamps, silver kumkum chimizh & mirror-finished presentation platters delivered directly to venue.",
    detail: "White-glove stage setup by our master artisans before guests arrive."
  }
];

export function HowItWorksSection() {
  return (
    <Section theme="sand" padding="md" className="overflow-hidden border-y border-border/50">
      <Container size="xl">
        <GSAPTextReveal as="div" className="text-center pt-6">
          <span className="text-eyebrow">Interactive Process</span>
          <h2 className="text-h2 font-serif font-medium text-foreground">
            How We Craft Your Seer Varisai Set
          </h2>
          <p className="text-body text-muted-foreground max-w-lg mx-auto mt-2">
            Scroll down to translate through the 5 traditional steps that go into every custom tray order.
          </p>
        </GSAPTextReveal>

        <GSAPHorizontalScroll className="my-6">
          {PROCESS_STEPS.map((card, i) => (
            <div
              key={i}
              className="w-80 sm:w-96 p-8 rounded-2xl bg-card border border-border shadow-warm-md flex flex-col justify-between gap-6 shrink-0 relative overflow-hidden group hover:border-accent/60 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <span className="text-display font-serif font-bold text-accent/40 group-hover:text-accent transition-colors">
                  {card.step}
                </span>
                <Badge variant="gold" size="sm">
                  {card.tag}
                </Badge>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-h3 font-serif font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="text-body-sm text-muted-foreground leading-relaxed font-sans">
                  {card.desc}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-primary pt-3 border-t border-border/40">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                <span className="text-foreground/90 font-sans">{card.detail}</span>
              </div>
            </div>
          ))}
        </GSAPHorizontalScroll>
      </Container>
    </Section>
  );
}
