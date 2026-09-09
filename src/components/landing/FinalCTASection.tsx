"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { KolamCornerFlourish, LotusMotif } from "@/components/ui/Motifs";
import { GSAPScrollReveal } from "@/components/animations";
import { Sparkles, Phone } from "lucide-react";
import { BUSINESS, telHref, whatsappHref } from "@/lib/business";

interface FinalCTASectionProps {
  onEnquireClick?: () => void;
}

export function FinalCTASection({ onEnquireClick }: FinalCTASectionProps) {
  return (
    <Section theme="maroon" padding="xl" className="relative overflow-hidden">
      {/* Background Kolam Corner Flourishes */}
      <KolamCornerFlourish size={180} aria-hidden="true" className="absolute top-0 right-0 opacity-40 pointer-events-none scale-x-[-1] w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44" />
      <KolamCornerFlourish size={180} aria-hidden="true" className="absolute bottom-0 left-0 opacity-40 pointer-events-none scale-y-[-1] w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44" />

      <Container size="xl" className="relative z-10 text-center py-6 sm:py-10">
        <GSAPScrollReveal type="scaleIn" start="top 85%">
          <div className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
            <div aria-hidden="true" className="w-14 h-14 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
              <LotusMotif size={32} />
            </div>

            <Badge variant="gold-on-dark" size="md">
              Custom Arrangements • Delivered to Your Venue
            </Badge>

            <Heading
              as="h2"
              variant="h1"
              theme="dark"
              title="Planning a Ceremony?"
              subtitle="Tell us your occasion, the number of trays you need and your budget, and we will come back to you with what we can put together."
              align="center"
              hasDivider
            />

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                variant="accent"
                size="lg"
                onClick={onEnquireClick}
                rightIcon={<Sparkles className="w-4 h-4" aria-hidden="true" />}
              >
                Request a Quote
              </Button>

              <a
                href={whatsappHref(
                  `Hello ${BUSINESS.displayName}, I would like to enquire about Seer Varisai Thattu trays.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enquire on WhatsApp (opens in a new tab)"
              >
                <Button
                  variant="whatsapp"
                  size="lg"
                  leftIcon={
                    <Image
                      src="/icons/whatsapp.svg"
                      alt=""
                      aria-hidden="true"
                      width={20}
                      height={20}
                      className="w-5 h-5 shrink-0"
                    />
                  }
                >
                  WhatsApp Consultation
                </Button>
              </a>

              <a href={telHref} aria-label={`Call ${BUSINESS.phoneDisplay}`}>
                <Button
                  variant="outline"
                  size="lg"
                  // ! prefix: .ui-btn-outline hard-sets color, so an
                  // unprefixed text-white loses and the label stayed dark.
                  className="!text-white !border-white/70 hover:!bg-white/10"
                  leftIcon={<Phone className="w-4 h-4" aria-hidden="true" />}
                >
                  Call {BUSINESS.phoneDisplay}
                </Button>
              </a>
            </div>
          </div>
        </GSAPScrollReveal>
      </Container>
    </Section>
  );
}
