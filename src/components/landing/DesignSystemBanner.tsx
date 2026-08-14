"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LotusMotif } from "@/components/ui/Motifs";
import { GSAPScrollReveal } from "@/components/animations";
import { ArrowRight, Layers, Palette, Type, Sparkles } from "lucide-react";

export function DesignSystemBanner() {
  return (
    <Section theme="sand" padding="md" className="border-b border-border/60">
      <Container size="xl">
        <GSAPScrollReveal type="scaleIn" start="top 90%">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-warm-md relative overflow-hidden">
            <div className="flex items-start sm:items-center gap-4 flex-1">
              <div className="w-14 h-14 rounded-2xl bg-accent/15 border border-accent/40 flex items-center justify-center shrink-0 text-accent">
                <LotusMotif size={32} />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-serif text-xl sm:text-2xl font-semibold text-foreground">
                    Interactive Production Design System
                  </span>
                  <Badge variant="gold" size="sm">
                    Token Architecture
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed max-w-2xl">
                  Explore color ratios (Warm Ivory, Deep Maroon, Antique Gold), typography scales (Cormorant Garamond + Manrope), form controls, motifs, and GSAP animation primitives.
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-semibold text-primary">
                  <span className="flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-accent" /> 6 Core Color Tokens
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-accent" /> Cormorant &amp; Manrope
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-accent" /> 24+ UI Primitives
                  </span>
                </div>
              </div>
            </div>

            <Link href="/design-system" className="shrink-0 w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                rightIcon={<ArrowRight className="w-4 h-4 text-accent" />}
              >
                Explore Design System (/design-system)
              </Button>
            </Link>
          </div>
        </GSAPScrollReveal>
      </Container>
    </Section>
  );
}
