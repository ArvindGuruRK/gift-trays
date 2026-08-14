"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { KolamCornerFlourish, LotusMotif } from "@/components/ui/Motifs";
import {
  GSAPHeroIntro,
  GSAPParallax,
  GSAPImageReveal,
} from "@/components/animations";
import { Sparkles } from "lucide-react";

interface HeroSectionProps {
  onEnquireClick?: () => void;
  isSplashActive?: boolean;
}

export function HeroSection({ onEnquireClick, isSplashActive }: HeroSectionProps) {
  return (
    <Section theme="maroon" padding="xl" className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Top-Right & Bottom-Left Corner Kolam Flourishes */}
      <KolamCornerFlourish
        size={240}
        className="absolute top-0 right-0 pointer-events-none opacity-50 scale-x-[-1] z-0"
      />
      <KolamCornerFlourish
        size={240}
        className="absolute bottom-0 left-0 pointer-events-none opacity-50 scale-y-[-1] z-0"
      />

      <GSAPHeroIntro isSplashActive={isSplashActive} className="w-full relative z-10">
        {/* Background Parallax Patterns */}
        <GSAPParallax speed={-0.25} containerClassName="absolute inset-0 pointer-events-none opacity-15" className="w-full h-full">
          <div data-hero-bg className="w-full h-full bg-kolam-pattern scale-110" />
        </GSAPParallax>

        <Container size="xl" className="relative z-10 py-6 lg:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Editorial Content */}
            <div className="lg:col-span-7 flex flex-col gap-5 text-left">
              {/* 1. Hero Animation Sequence Timeline Step: Heading */}
              <h1 data-hero-heading className="text-display font-serif font-medium text-primary-foreground tracking-tight leading-none">
                Tradition, <br />
                <span className="italic text-accent">Beautifully Arranged.</span>
              </h1>

              {/* 1. Hero Animation Sequence Timeline Step: Description */}
              <p data-hero-description className="text-body-lg text-sand-beige/90 max-w-xl font-sans leading-relaxed">
                Exquisite Seer Varisai Thattu ceremonial gift tray arrangements crafted with magnificent packed plating, vibrant fresh florals, and sacred traditional gestures for grand weddings, engagements, and milestone celebrations.
              </p>

              {/* 1. Hero Animation Sequence Timeline Step: Staggered CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div data-hero-cta>
                  <Button
                    variant="accent"
                    size="lg"
                    onClick={onEnquireClick}
                    rightIcon={<Sparkles className="w-4 h-4 text-foreground" />}
                  >
                    Request Custom Tray Set
                  </Button>
                </div>

                <div data-hero-cta>
                  <a
                    href="https://wa.me/919876543210?text=Hello!%20I%20would%20like%20to%20enquire%20about%20Seer%20Varisai%20Thattu%20arrangements."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="whatsapp"
                      size="lg"
                      leftIcon={
                        <Image
                          src="/icons/whatsapp.svg"
                          alt="WhatsApp Icon"
                          width={20}
                          height={20}
                          className="w-5 h-5 shrink-0"
                        />
                      }
                    >
                      Instant WhatsApp Enquiry
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Hero Image Showcase */}
            <div className="lg:col-span-5 relative flex items-center justify-center py-4 px-2 sm:px-4">
              <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-2xl">
                {/* Hero Image inside GSAP Image Reveal */}
                <GSAPImageReveal
                  isSplashActive={isSplashActive}
                  direction="up"
                  start="top 85%"
                  className="w-full flex items-center justify-center scale-110 sm:scale-120 lg:scale-[1.28] transform-gpu origin-center"
                >
                  <Image
                    src="/gallery/asserts/Ceremonial_trays_round.png"
                    alt="Seer Varisai Thattu Royal Arrangement"
                    width={800}
                    height={800}
                    priority
                    className="w-full h-auto object-contain transition-transform duration-700 ease-luxury hover:scale-105"
                  />
                </GSAPImageReveal>
              </div>
            </div>
          </div>
        </Container>
      </GSAPHeroIntro>
    </Section>
  );
}


