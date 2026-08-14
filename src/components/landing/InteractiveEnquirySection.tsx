"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { NumberSelector } from "@/components/ui/NumberSelector";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GSAPTextReveal } from "@/components/animations";
import { Send, ShieldCheck, Sparkles, Phone, MessageCircle } from "lucide-react";

interface InteractiveEnquirySectionProps {
  onSubmitEnquiry?: (formData: {
    fullName: string;
    phone: string;
    location: string;
    eventDate: string;
    trayCount: number;
    occasion: string;
    notes: string;
    whatsappPreferred: boolean;
  }) => void;
}

export function InteractiveEnquirySection({ onSubmitEnquiry }: InteractiveEnquirySectionProps) {
  const [fullName, setFullName] = useState<string>("Smt. Sundar");
  const [phone, setPhone] = useState<string>("+91 98765 43210");
  const [location, setLocation] = useState<string>("mandapam");
  const [eventDate, setEventDate] = useState<string>("2026-11-20");
  const [trayCount, setTrayCount] = useState<number>(11);
  const [occasion, setOccasion] = useState<string>("wedding");
  const [notes, setNotes] = useState<string>("");
  const [whatsappPreferred, setWhatsappPreferred] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitEnquiry?.({
      fullName,
      phone,
      location,
      eventDate,
      trayCount,
      occasion,
      notes,
      whatsappPreferred,
    });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Seer Varisai Thattu! I would like to enquire about ${trayCount} trays for ${occasion} on ${eventDate} at ${location}. Contact: ${fullName} (${phone}). ${notes}`
  );

  return (
    <Section id="enquiry-form" theme="ivory" padding="lg">
      <Container size="xl">
        <GSAPTextReveal as="div">
          <Heading
            eyebrow="Conversion Infrastructure"
            title="Book Your Custom Seer Varisai Consultation"
            subtitle="Fill out your event details below or chat directly with our master plating concierge on WhatsApp."
            align="left"
            hasDivider
          />
        </GSAPTextReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
          {/* Main Enquiry Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 bg-card p-8 rounded-2xl border border-border shadow-warm-md flex flex-col gap-6">
            <h3 className="text-h3 font-serif font-medium text-foreground border-b border-border/50 pb-3">
              Event Details &amp; Contact Form
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name *"
                placeholder="e.g. Ramesh Sundaram"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <Input
                label="Phone Number (WhatsApp) *"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Event Venue Type"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                options={[
                  { value: "mandapam", label: "Wedding Hall / Kalyana Mandapam" },
                  { value: "resort", label: "Hotel / Resort Event Space" },
                  { value: "residence", label: "Private Residence" },
                  { value: "other", label: "Other Ceremonial Venue" },
                ]}
              />
              <Input
                label="Event Date"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>

            {/* Tray Count Selector */}
            <NumberSelector
              label="Required Number of Trays (Standard 5, 7, 9, 11, 15, 21)"
              value={trayCount}
              onChange={setTrayCount}
              min={3}
              max={31}
              step={2}
            />

            {/* Occasion Selection */}
            <RadioGroup
              name="enquiryOccasion"
              label="Select Occasion Type"
              selectedValue={occasion}
              onChange={setOccasion}
              options={[
                { value: "wedding", label: "Wedding Seer Varisai", description: "11-21 Trays traditional set", badge: "Popular" },
                { value: "engagement", label: "Engagement (Nitchayathartham)", description: "7-11 Trays betel & floral" },
                { value: "seemantham", label: "Seemantham / Valaikappu", description: "5-9 Trays sweets & bangles" },
                { value: "grahapravesam", label: "Grahapravesam", description: "5-7 Trays lamps & fruits" },
              ]}
            />

            <Textarea
              label="Customization Requirements or Flower Preferences"
              placeholder="Specify preferred fruits, flower color theme, specific items needed, or budget constraints..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            <Checkbox
              variant="primary"
              checked={whatsappPreferred}
              onChange={(e) => setWhatsappPreferred(e.target.checked)}
              label="I prefer to receive photos and package pricing via WhatsApp"
              description="Our master artisan will send real photography examples and packed tray plating concepts within 2 hours."
            />

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                rightIcon={<Sparkles className="w-4 h-4 text-accent" />}
              >
                Submit Custom Tray Enquiry
              </Button>

              <a
                href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  type="button"
                  variant="whatsapp"
                  size="lg"
                  leftIcon={<MessageCircle className="w-5 h-5" />}
                >
                  Instant WhatsApp Message
                </Button>
              </a>
            </div>
          </form>

          {/* Side Trust Banner & Quick Contact Details */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-card p-6 rounded-2xl border border-border shadow-warm-sm flex flex-col gap-4">
              <h4 className="text-h4 font-medium text-foreground border-b border-border/50 pb-2">
                Direct Concierge Desk
              </h4>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                Prefer to speak directly with our master plating specialists? Call or message us on WhatsApp anytime.
              </p>

              <div className="flex flex-col gap-3 pt-2">
                <a href="tel:+919876543210" className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40 hover:bg-secondary border border-border transition-colors">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex flex-col text-xs font-sans">
                    <span className="font-bold text-foreground">+91 98765 43210</span>
                    <span className="text-muted-foreground">Direct Phone Call</span>
                  </div>
                </a>

                <a href={`https://wa.me/919876543210?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 transition-colors">
                  <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0" />
                  <div className="flex flex-col text-xs font-sans">
                    <span className="font-bold text-foreground">WhatsApp Chat</span>
                    <span className="text-muted-foreground">Quick photos &amp; quotes</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-secondary/40 p-6 rounded-2xl border border-border flex flex-col gap-3">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <ShieldCheck className="w-5 h-5 text-accent" />
                <span>Privacy &amp; Customization Guarantee</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                Every enquiry is handled personally by our lead plating designers. We strictly safeguard customer privacy and event details.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
