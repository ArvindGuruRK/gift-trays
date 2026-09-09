"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

interface OccasionsSectionProps {
  onSelectOccasion?: (occasionName: string) => void;
}

const OCCASIONS_LIST = [
  {
    title: "Wedding Ceremonies (Kalyanam)",
    eyebrow: "The Grand Celebration",
    trays: "11 to 21 Trays Set",
    image: "/gallery/photos/daisy-mandala-tray-spread.webp",
    desc: "The centerpiece of sacred wedding traditions. Exchanged between the bride and groom's families at the Kalyana Mandapam with ceremonial gestures of reverence.",
    highlights: ["Exotic fruit pyramids & dry fruit platters", "Pure ghee Mysore Pak & Laddus", "Silk saree & dhoti towel folding", "Decorated coconuts & brass lamps"]
  },
  {
    title: "Engagement (Nitchayathartham)",
    eyebrow: "The Promise of Union",
    trays: "7 to 11 Trays Set",
    image: "/gallery/photos/pink-ribbon-daisy-mandala-spread-1.webp",
    desc: "Elegant Thamboolam arrangements celebrating the official engagement and sacred marital betrothal.",
    highlights: ["Special ring exchange platter", "Fresh betel leaves & decorated betel nuts", "Jasmine & lotus garlands", "Customized sweet gift boxes"]
  },
  {
    title: "Seemantham & Valaikappu",
    eyebrow: "Motherhood Blessings",
    trays: "5 to 9 Trays Set",
    image: "/gallery/photos/white-chrysanthemum-leaf-mandala-closeup.webp",
    desc: "Warm ceremonial trays honoring expectant mothers with auspicious bangles, traditional sweets, and floral decor.",
    highlights: ["7 varieties of traditional sweets", "Glass bangles tray arrangement", "Lotus flower borders", "Silk sari presentation"]
  },
  {
    title: "Grahapravesam (Housewarming)",
    eyebrow: "Auspicious New Beginning",
    trays: "5 to 7 Trays Set",
    image: "/gallery/photos/marigold-money-leaf-centerpiece-spread.webp",
    desc: "Sacred tray arrangements welcoming prosperity into your new home with kuthuvilakku lamps and fruit baskets.",
    highlights: ["Polished Kamatchi Amman lamp tray", "Banana flower & thamboolam set", "Fresh coconut arrangement", "Assorted fruit basket"]
  }
];

export function OccasionsSection({ onSelectOccasion }: OccasionsSectionProps = {}) {
  return (
    <Section id="occasions" theme="sand" padding="lg">
      <Container size="xl">
        {/* Motion Variant 1: Fade Up Entrance */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
        >
          <Heading
            eyebrow="Occasions We Serve"
            title="Ceremonial Trays for Every Milestone"
            subtitle="Understand recommended tray counts and traditional packed plating contents tailored for every sacred ceremony."
            align="center"
            hasDivider
          />
        </motion.div>

        {/* Motion Variant 2: Staggered Grid Reveal */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
        >
          {OCCASIONS_LIST.map((occ, idx) => (
            <motion.div key={idx} variants={staggerItem}>
              {/*
                A real <button>, not a clickable <div>. As a div this card was
                unreachable by keyboard and invisible to screen readers, even
                though clicking it is the main way into the enquiry form.
              */}
              <button
                type="button"
                onClick={() => onSelectOccasion?.(occ.title)}
                aria-label={`Enquire about ${occ.title} — ${occ.trays}`}
                className="ui-card-button h-full p-8 rounded-2xl bg-card border border-border shadow-warm-md flex flex-col justify-between gap-6 hover:border-accent/40 transition-all group"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase text-accent-text font-sans tracking-wider">
                      {occ.eyebrow}
                    </span>
                    <Badge variant="gold" size="sm">
                      {occ.trays}
                    </Badge>
                  </div>

                  <h3 className="text-h3 font-serif font-medium text-foreground group-hover:text-primary transition-colors">
                    {occ.title}
                  </h3>

                  <p className="text-body-sm text-muted-foreground font-sans leading-relaxed">
                    {occ.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {occ.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs font-sans text-foreground/90">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50 flex items-center justify-between gap-3">
                  <span className="text-xs text-muted-foreground font-mono">
                    Items &amp; colours can be changed
                  </span>
                  <span className="text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform shrink-0">
                    Enquire →
                  </span>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

