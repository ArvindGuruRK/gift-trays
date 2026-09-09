"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Heart, ShieldCheck, Sparkles, Star } from "lucide-react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";

export function BrandIntroSection() {
  // Each card describes what we do, not what we guarantee. The previous copy
  // promised a "Freshness Guarantee", "Grade-A fruits" and "On-Time Delivery"
  // as titled guarantees — absolute claims a new business cannot substantiate,
  // and the kind of thing that makes a listing a misleading advertisement.
  const pillarCards = [
    {
      step: "01",
      icon: <Sparkles className="w-5 h-5 text-accent" aria-hidden="true" />,
      iconBg: "bg-accent/15 text-accent",
      title: "Tailored to Your Occasion",
      description:
        "Colour palette, flowers and tray contents chosen with you, to suit your event, your attire and your stage décor.",
    },
    {
      step: "02",
      icon: <Heart className="w-5 h-5 text-primary" aria-hidden="true" />,
      iconBg: "bg-primary/15 text-primary",
      title: "Fresh Flowers & Fruit",
      description:
        "Flowers and fruit are bought close to your event date rather than held in stock, so the arrangement looks its best on the day.",
    },
    {
      step: "03",
      icon: <ShieldCheck className="w-5 h-5 text-accent" aria-hidden="true" />,
      iconBg: "bg-accent/15 text-accent",
      title: "Built Around Your Budget",
      description:
        "From a 5-tray engagement set to a 21-tray wedding set. Tell us your budget and we will show you what it covers before you commit.",
    },
    {
      step: "04",
      icon: <Star className="w-5 h-5 text-primary" aria-hidden="true" />,
      iconBg: "bg-primary/15 text-primary",
      title: "Delivered & Set Up",
      description:
        "We bring the trays to your hall or venue and arrange them there, at a time agreed with you in advance.",
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
            eyebrow="How We Work"
            title="Ceremonial Trays, Arranged for Your Occasion"
            subtitle="Seer Varisai Thattu arrangements put together around your occasion, your tray count and your budget — and delivered to your venue."
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
                A Tradition Worth Getting Right
              </h3>

              <p className="text-body-sm text-muted-foreground font-sans leading-relaxed">
                In weddings and milestone ceremonies, <strong>Seer Varisai Thattu</strong> carries real meaning — it is how respect and blessings are offered between the two families taking part.
              </p>

              <p className="text-body-sm text-muted-foreground font-sans leading-relaxed">
                That is worth arranging carefully. We work through the tray contents with you, source the flowers, fruit and sweets close to your event date, and set the trays out so they look right on the stage and in your photographs.
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
                    {/* The step number is content, so it needs the readable
                        gold at full opacity — text-accent/70 was 2.07:1. */}
                    <span className="text-xs font-mono font-semibold text-accent-text tracking-wider">
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



