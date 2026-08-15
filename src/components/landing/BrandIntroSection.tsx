"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Heart, ShieldCheck, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

export function BrandIntroSection() {
  const pillarCards = [
    {
      step: "01",
      icon: <Sparkles className="w-5 h-5 text-accent" />,
      iconBg: "bg-accent/15 text-accent",
      title: "Tailored Aesthetics",
      description:
        "Custom color palettes, silk towel embroidery, and brass platter arrangements matched to your wedding attire and stage theme.",
    },
    {
      step: "02",
      icon: <Heart className="w-5 h-5 text-primary" />,
      iconBg: "bg-primary/15 text-primary",
      title: "Freshness Guarantee",
      description:
        "Fresh morning jasmine garlands, lotus blossoms, and Grade-A fruits handpicked on event day for vibrant visual presentation.",
    },
    {
      step: "03",
      icon: <ShieldCheck className="w-5 h-5 text-accent" />,
      iconBg: "bg-accent/15 text-accent",
      title: "Budget Flexibility",
      description:
        "From intimate 5-tray engagement sets to grand 21-tray wedding packages, customized according to your ceremonial budget.",
    },
    {
      step: "04",
      icon: <Star className="w-5 h-5 text-primary" />,
      iconBg: "bg-primary/15 text-primary",
      title: "On-Time Delivery",
      description:
        "Direct safe transport and white-glove setup at wedding halls (Kalyana Mandapams) and ceremonial venues prior to rituals.",
    },
  ];

  return (
    <Section theme="ivory" padding="lg">
      <Container size="xl">
        {/* Motion Variant 1: Fade Up Entrance */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
        >
          <Heading
            eyebrow="Our Story &amp; Heritage"
            title="Artisanal Ceremonial Plating &amp; Presentation"
            subtitle="Mastering the fine art of packed Seer Varisai Thattu plating, sacred wedding gestures, and opulent traditional gift presentation for grand wedding ceremonies."
            align="center"
            hasDivider
          />
        </motion.div>

        {/* Narrative & Pillar Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mt-10">
          {/* Left Family Philosophy Narrative Card - Motion Variant 1: Fade Up Entrance */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
            className="lg:col-span-5 flex flex-col h-full"
          >
            <div className="p-6 sm:p-7 rounded-2xl bg-card border border-border shadow-warm-sm hover:shadow-warm-md hover:border-accent/40 flex flex-col justify-center h-full relative overflow-hidden gap-4 transition-shadow transition-colors duration-300">
              <h3 className="text-h3 font-serif font-medium text-foreground leading-snug">
                Preserving Sacred Traditions with Modern Luxury Elegance
              </h3>

              <p className="text-body-sm text-muted-foreground font-sans leading-relaxed">
                In sacred wedding ceremonies and milestone celebrations, <strong>Seer Varisai Thattu</strong> represents honor, deep reverence, and auspicious blessings exchanged between joining families.
              </p>

              <p className="text-body-sm text-muted-foreground font-sans leading-relaxed">
                We handle every arrangement with extreme precision—handpicking fresh morning jasmine, lotus, and roses, pairing rich traditional ghee sweets and exotic fruits in flawless stacked pyramids, and decorating brass platters with regal color themes to match your ceremonial mandapam.
              </p>
            </div>
          </motion.div>

          {/* Right 4 Pillar Cards - Motion Variant 2: Staggered Grid Reveal */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-6 h-full"
          >
            {pillarCards.map((card, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="p-6 sm:p-7 rounded-2xl bg-card border border-border shadow-warm-sm hover:shadow-warm-md hover:border-accent/40 transition-shadow transition-colors duration-300 flex flex-col justify-between h-full relative overflow-hidden group"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center shrink-0`}>
                      {card.icon}
                    </div>
                    <span className="text-xs font-mono font-semibold text-accent/70 tracking-wider">
                      {card.step}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {card.title}
                  </h4>

                  <p className="text-body-sm text-muted-foreground font-sans leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}



