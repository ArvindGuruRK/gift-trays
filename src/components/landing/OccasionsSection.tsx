"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { GSAPTextReveal, GSAPScrollReveal } from "@/components/animations";
import { CheckCircle2 } from "lucide-react";

interface OccasionsSectionProps {
  onSelectOccasion?: (occasionName: string) => void;
}

const OCCASIONS_LIST = [
  {
    title: "Wedding Ceremonies (Kalyanam)",
    eyebrow: "The Grand Celebration",
    trays: "11 to 21 Trays Set",
    desc: "The centerpiece of sacred wedding traditions. Exchanged between the bride and groom's families at the Kalyana Mandapam with ceremonial gestures of reverence.",
    highlights: ["Exotic fruit pyramids & dry fruit platters", "Pure ghee Mysore Pak & Laddus", "Silk saree & dhoti towel folding", "Decorated coconuts & brass lamps"]
  },
  {
    title: "Engagement (Nitchayathartham)",
    eyebrow: "The Promise of Union",
    trays: "7 to 11 Trays Set",
    desc: "Elegant Thamboolam arrangements celebrating the official engagement and sacred marital betrothal.",
    highlights: ["Special ring exchange platter", "Fresh betel leaves & decorated betel nuts", "Jasmine & lotus garlands", "Customized sweet gift boxes"]
  },
  {
    title: "Seemantham & Valaikappu",
    eyebrow: "Motherhood Blessings",
    trays: "5 to 9 Trays Set",
    desc: "Warm ceremonial trays honoring expectant mothers with auspicious bangles, traditional sweets, and floral decor.",
    highlights: ["7 varieties of traditional sweets", "Glass bangles tray arrangement", "Lotus flower borders", "Silk sari presentation"]
  },
  {
    title: "Grahapravesam (Housewarming)",
    eyebrow: "Auspicious New Beginning",
    trays: "5 to 7 Trays Set",
    desc: "Sacred tray arrangements welcoming prosperity into your new home with kuthuvilakku lamps and fruit baskets.",
    highlights: ["Polished Kamatchi Amman lamp tray", "Banana flower & thamboolam set", "Fresh coconut arrangement", "Assorted fruit basket"]
  }
];

export function OccasionsSection({ onSelectOccasion }: OccasionsSectionProps = {}) {
  return (
    <Section theme="sand" padding="lg">
      <Container size="xl">
        <GSAPTextReveal as="div">
          <Heading
            eyebrow="Occasions We Serve"
            title="Ceremonial Trays for Every Milestone"
            subtitle="Understand recommended tray counts and traditional packed plating contents tailored for every sacred ceremony."
            align="center"
            hasDivider
          />
        </GSAPTextReveal>

        <GSAPScrollReveal type="fadeUp" stagger={0.15} start="top 85%" className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {OCCASIONS_LIST.map((occ, idx) => (
            <div data-gsap-item key={idx} className="p-8 rounded-2xl bg-card border border-border shadow-warm-md flex flex-col justify-between gap-6 hover:border-accent/40 transition-all">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-accent font-sans tracking-wider">
                    {occ.eyebrow}
                  </span>
                  <Badge variant="gold" size="sm">
                    {occ.trays}
                  </Badge>
                </div>

                <h3 className="text-h3 font-serif font-medium text-foreground">
                  {occ.title}
                </h3>

                <p className="text-body-sm text-muted-foreground font-sans leading-relaxed">
                  {occ.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {occ.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs font-sans text-foreground/90">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-mono">
                  Customizable Items &amp; Colors
                </span>
              </div>
            </div>
          ))}
        </GSAPScrollReveal>
      </Container>
    </Section>
  );
}
