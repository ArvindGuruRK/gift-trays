"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { NumberSelector } from "@/components/ui/NumberSelector";
import { Checkbox } from "@/components/ui/Checkbox";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { GSAPTextReveal, GSAPScrollReveal } from "@/components/animations";
import { Sparkles, Check, Send, Sliders } from "lucide-react";

interface CustomizationSectionProps {
  onProceedToEnquiry?: (details: {
    trayCount: number;
    flowerTheme: string;
    includeSweets: boolean;
    includeFruits: boolean;
    includeSilk: boolean;
    budgetTier: string;
    estimatedTotal: number;
  }) => void;
}

export function CustomizationSection({ onProceedToEnquiry }: CustomizationSectionProps) {
  const [trayCount, setTrayCount] = useState<number>(11);
  const [flowerTheme, setFlowerTheme] = useState<string>("jasmine-rose");
  const [includeSweets, setIncludeSweets] = useState<boolean>(true);
  const [includeFruits, setIncludeFruits] = useState<boolean>(true);
  const [includeSilk, setIncludeSilk] = useState<boolean>(true);
  const [budgetTier, setBudgetTier] = useState<string>("signature");

  // Dynamic estimate calculation logic based on design system rules
  const basePricePerTray = budgetTier === "classic" ? 1800 : budgetTier === "signature" ? 2400 : 3200;
  const estimatedTotal = trayCount * basePricePerTray;

  const handleProceed = () => {
    onProceedToEnquiry?.({
      trayCount,
      flowerTheme,
      includeSweets,
      includeFruits,
      includeSilk,
      budgetTier,
      estimatedTotal,
    });
  };

  return (
    <Section theme="ivory" padding="lg">
      <Container size="xl">
        <GSAPTextReveal as="div">
          <Heading
            eyebrow="Interactive Builder"
            title="Tailor Your Custom Seer Varisai Tray Set"
            subtitle="Experiment with tray counts, floral themes, and budget options to build your ideal ceremonial arrangement."
            align="center"
            hasDivider
          />
        </GSAPTextReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-10">
          {/* Customization Controls Panel */}
          <div className="lg:col-span-7 bg-card p-8 rounded-2xl border border-border shadow-warm-md flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border/50 pb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-accent" />
                <h3 className="font-serif text-xl font-medium text-foreground">
                  Customization Parameters
                </h3>
              </div>
              <Badge variant="gold" size="sm">
                Live Calculator
              </Badge>
            </div>

            {/* 1. Number of Trays */}
            <NumberSelector
              label="Select Required Tray Count (Traditional Odd Numbers)"
              value={trayCount}
              onChange={setTrayCount}
              min={3}
              max={31}
              step={2}
            />

            {/* 2. Floral Palette Theme */}
            <RadioGroup
              name="flowerTheme"
              label="Choose Fresh Floral Palette Theme"
              selectedValue={flowerTheme}
              onChange={setFlowerTheme}
              options={[
                { value: "jasmine-rose", label: "Classic Jasmine & Crimson Red Rose", description: "Traditional white jasmine with auspicious red roses.", badge: "Popular" },
                { value: "lotus-marigold", label: "Royal Pink Lotus & Yellow Marigold", description: "Sacred pink lotus blossoms and golden marigolds." },
                { value: "pastel-contemporary", label: "Contemporary Pastel Carnations & Baby's Breath", description: "Modern soft pastel tone decor for contemporary venues." }
              ]}
            />

            {/* 3. Included Item Categories */}
            <div className="flex flex-col gap-3 pt-2 border-t border-border/40">
              <span className="text-sm font-semibold font-sans text-foreground">
                Select Included Item Categories
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Checkbox
                  variant="primary"
                  checked={includeSweets}
                  onChange={(e) => setIncludeSweets(e.target.checked)}
                  label="Pure Ghee Sweets"
                />
                <Checkbox
                  variant="primary"
                  checked={includeFruits}
                  onChange={(e) => setIncludeFruits(e.target.checked)}
                  label="Exotic Fruit Baskets"
                />
                <Checkbox
                  variant="primary"
                  checked={includeSilk}
                  onChange={(e) => setIncludeSilk(e.target.checked)}
                  label="Silk & Sari Platters"
                />
              </div>
            </div>

            {/* 4. Quality & Finishing Tier */}
            <RadioGroup
              name="budgetTier"
              label="Select Finishes & Craftsmanship Tier"
              selectedValue={budgetTier}
              onChange={setBudgetTier}
              layout="horizontal"
              options={[
                { value: "classic", label: "Classic", description: "₹1,800 / tray" },
                { value: "signature", label: "Signature Gold", description: "₹2,400 / tray" },
                { value: "imperial", label: "Imperial Brass", description: "₹3,200 / tray" }
              ]}
            />
          </div>

          {/* Dynamic Estimate Summary Box */}
          <div className="lg:col-span-5 bg-card p-8 rounded-2xl border border-accent/40 shadow-warm-lg flex flex-col gap-6 sticky top-24">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <span className="text-eyebrow">Estimated Summary</span>
              <Badge variant="maroon" size="sm">
                {trayCount} Trays Set
              </Badge>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground font-sans">
                Approximate Package Estimate
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-primary">
                  ₹{estimatedTotal.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-muted-foreground font-sans">
                  * (Includes delivery &amp; setup)
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 py-4 border-y border-border/50 text-xs font-sans">
              <div className="flex justify-between items-center text-foreground font-medium">
                <span>Selected Tray Count:</span>
                <strong className="text-accent">{trayCount} Handcrafted Trays</strong>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Floral Theme:</span>
                <span className="capitalize text-foreground">{flowerTheme.replace("-", " & ")}</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Craftsmanship Tier:</span>
                <span className="capitalize text-foreground">{budgetTier} Tier</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleProceed}
              rightIcon={<Sparkles className="w-4 h-4 text-accent" />}
            >
              Lock Selection &amp; Send Enquiry
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
