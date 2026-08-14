"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { KolamCornerFlourish, LotusMotif } from "@/components/ui/Motifs";
import { GSAPScrollReveal } from "@/components/animations";
import { Sparkles, MessageCircle, Phone } from "lucide-react";

interface FinalCTASectionProps {
  onEnquireClick?: () => void;
}

export function FinalCTASection({ onEnquireClick }: FinalCTASectionProps) {
  return (
    <Section theme="maroon" padding="xl" className="relative overflow-hidden">
      {/* Background Kolam Corner Flourishes */}
      <KolamCornerFlourish size={180} className="absolute top-0 right-0 opacity-40 pointer-events-none scale-x-[-1]" />
      <KolamCornerFlourish size={180} className="absolute bottom-0 left-0 opacity-40 pointer-events-none scale-y-[-1]" />

      <Container size="xl" className="relative z-10 text-center py-6 sm:py-10">
        <GSAPScrollReveal type="scaleIn" start="top 85%">
          <div className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
            <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent">
              <LotusMotif size={32} />
            </div>

            <Badge variant="gold" size="md">
              Master Packed Plating • On-Time Venue Delivery
            </Badge>

            <Heading
              as="h2"
              variant="h1"
              theme="dark"
              title="Elevate Your Wedding Ceremony &amp; Sacred Rituals"
              subtitle="Contact our master plating team today to reserve your customized Seer Varisai Thattu arrangement for your upcoming celebration."
              align="center"
              hasDivider
            />

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                variant="accent"
                size="lg"
                onClick={onEnquireClick}
                rightIcon={<Sparkles className="w-4 h-4 text-foreground" />}
              >
                Book Custom Tray Set
              </Button>

              <a
                href="https://wa.me/919876543210?text=Hello!%20I%20would%20like%20to%20reserve%20Seer%20Varisai%20Thattu%20trays."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="whatsapp"
                  size="lg"
                  leftIcon={<MessageCircle className="w-5 h-5" />}
                >
                  WhatsApp Consultation
                </Button>
              </a>

              <a href="tel:+919876543210">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white/40 hover:bg-white/10"
                  leftIcon={<Phone className="w-4 h-4" />}
                >
                  Call +91 98765 43210
                </Button>
              </a>
            </div>
          </div>
        </GSAPScrollReveal>
      </Container>
    </Section>
  );
}
