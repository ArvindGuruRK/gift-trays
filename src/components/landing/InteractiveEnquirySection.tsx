"use client";

import React, { useState } from "react";
import Image from "next/image";
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
import { Sparkles, ShieldCheck } from "lucide-react";

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
  const [fullName, setFullName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
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

  const detailsArray: string[] = [];
  if (trayCount) detailsArray.push(`${trayCount} trays`);
  if (occasion) detailsArray.push(`for ${occasion}`);
  if (eventDate) detailsArray.push(`on ${eventDate}`);
  if (location) detailsArray.push(`at ${location}`);

  const detailsStr = detailsArray.length > 0 ? detailsArray.join(" ") : "Seer Varisai Thattu arrangements";
  const contactStr = fullName || phone ? ` Contact: ${fullName}${phone ? ` (${phone})` : ""}.` : "";
  const notesStr = notes ? ` Notes: ${notes}` : "";

  const whatsappMessage = encodeURIComponent(
    `Hello Seer Varisai Thattu! I would like to enquire about ${detailsStr}.${contactStr}${notesStr}`
  );

  return (
    <Section id="enquiry-form" theme="ivory" padding="lg">
      <Container size="xl">
        <GSAPTextReveal as="div">
          <Heading
            eyebrow="Conversion Infrastructure"
            title="Book Your Custom Seer Varisai Consultation"
            subtitle="Fill out your event details below or chat directly with our master plating concierge on WhatsApp."
            align="center"
            hasDivider
          />
        </GSAPTextReveal>

        <div className="max-w-4xl mx-auto mt-10">
          {/* Main Enquiry Form */}
          <form onSubmit={handleSubmit} className="bg-card p-6 sm:p-10 rounded-2xl border border-border shadow-warm-md flex flex-col gap-6">
            <h3 className="text-h3 font-serif font-medium text-foreground border-b border-border/50 pb-3">
              Event Details &amp; Contact Form
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name *"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <Input
                label="Phone Number (WhatsApp) *"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Event Venue Type"
                placeholder="Select your event venue type"
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
              placeholder="Enter your customization requirements, flower preferences, or budget guidelines..."
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

            <div className="flex flex-wrap items-center sm:justify-start gap-4 pt-2">
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
                  Instant WhatsApp Message
                </Button>
              </a>
            </div>

            {/* Privacy & Customization Guarantee */}
            <div className="mt-4 bg-secondary/40 p-4 sm:p-5 rounded-xl border border-border flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-primary">Privacy &amp; Customization Guarantee</span>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  Every enquiry is handled personally by our lead plating designers. We strictly safeguard customer privacy and event details.
                </p>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </Section>
  );
}

