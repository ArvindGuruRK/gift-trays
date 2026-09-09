"use client";

import React, { useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { GSAPTextReveal } from "@/components/animations";
import { Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import { BUSINESS, whatsappHref } from "@/lib/business";

export interface EnquiryFormData {
  fullName: string;
  phone: string;
  venueType: string;
  eventDate: string;
  trayCount: number;
  occasion: string;
  notes: string;
}

interface InteractiveEnquirySectionProps {
  onSubmitEnquiry?: (formData: EnquiryFormData) => void;
}

const VENUE_OPTIONS = [
  { value: "mandapam", label: "Wedding Hall / Kalyana Mandapam" },
  { value: "resort", label: "Hotel / Resort Event Space" },
  { value: "residence", label: "Private Residence" },
  { value: "other", label: "Other Ceremonial Venue" },
];

const OCCASION_OPTIONS = [
  { value: "wedding", label: "Wedding Seer Varisai", description: "Usually 11-21 trays" },
  { value: "engagement", label: "Engagement (Nitchayathartham)", description: "Usually 7-11 trays" },
  { value: "seemantham", label: "Seemantham / Valaikappu", description: "Usually 5-9 trays" },
  { value: "grahapravesam", label: "Grahapravesam", description: "Usually 5-7 trays" },
];

const VENUE_LABELS = Object.fromEntries(VENUE_OPTIONS.map((o) => [o.value, o.label]));
const OCCASION_LABELS = Object.fromEntries(OCCASION_OPTIONS.map((o) => [o.value, o.label]));

/**
 * Enquiry form.
 *
 * Nothing here is transmitted to a server. Submitting composes a WhatsApp
 * message and opens it in the visitor's own WhatsApp — they choose whether to
 * send it. That is deliberate: no enquiry data is stored or processed by us,
 * which keeps obligations under the DPDP Act to a minimum, and it is what the
 * privacy policy says happens.
 *
 * The previous version showed a toast reading "your enquiry was received" while
 * doing nothing at all with the data. That message was simply untrue.
 */
export function InteractiveEnquirySection({ onSubmitEnquiry }: InteractiveEnquirySectionProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [venueType, setVenueType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [trayCount, setTrayCount] = useState(11);
  const [occasion, setOccasion] = useState("wedding");
  const [notes, setNotes] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const successRef = useRef<HTMLDivElement>(null);
  const consentId = useId();
  const consentErrorId = `${consentId}-error`;

  const buildMessage = () => {
    const lines = [
      `Hello ${BUSINESS.displayName}, I would like to enquire about Seer Varisai trays.`,
      "",
      `Name: ${fullName}`,
      `Phone: ${phone}`,
      `Occasion: ${OCCASION_LABELS[occasion] ?? occasion}`,
      `Number of trays: ${trayCount}`,
    ];
    if (eventDate) lines.push(`Event date: ${eventDate}`);
    if (venueType) lines.push(`Venue: ${VENUE_LABELS[venueType] ?? venueType}`);
    if (notes) lines.push(`Requirements: ${notes}`);
    return lines.join("\n");
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!fullName.trim()) next.fullName = "Please enter your name so we know who to reply to.";
    // Indian mobile numbers are 10 digits; allow an optional +91 or 0 prefix.
    const digits = phone.replace(/[\s-]/g, "");
    if (!digits) next.phone = "Please enter a phone number we can reach you on.";
    else if (!/^(\+91|0)?[6-9]\d{9}$/.test(digits))
      next.phone = "Please enter a valid 10-digit Indian mobile number.";
    if (!consentGiven)
      next.consent = "Please confirm you are happy for us to contact you about this enquiry.";
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Send focus to the first field with a problem rather than leaving the
      // user to hunt for it.
      const firstKey = Object.keys(found)[0];
      document.getElementById(`enquiry-${firstKey}`)?.focus();
      return;
    }

    const data: EnquiryFormData = {
      fullName,
      phone,
      venueType,
      eventDate,
      trayCount,
      occasion,
      notes,
    };

    // Open WhatsApp with the enquiry prefilled. Nothing leaves the browser
    // until the visitor presses send inside WhatsApp itself.
    window.open(whatsappHref(buildMessage()), "_blank", "noopener,noreferrer");

    setIsSubmitted(true);
    onSubmitEnquiry?.(data);

    // Move focus to the confirmation so screen-reader users land on it.
    window.setTimeout(() => successRef.current?.focus(), 100);
  };

  return (
    <Section id="enquiry-form" theme="ivory" padding="lg">
      <Container size="xl">
        <GSAPTextReveal as="div">
          <Heading
            eyebrow="Get in Touch"
            title="Tell Us About Your Occasion"
            subtitle="Fill in your event details and we will continue the conversation on WhatsApp, or message us directly."
            align="center"
            hasDivider
          />
        </GSAPTextReveal>

        <div className="max-w-4xl mx-auto mt-10">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-card p-6 sm:p-10 rounded-2xl border border-border shadow-warm-md flex flex-col gap-6"
          >
            <h3 className="text-h3 font-serif font-medium text-foreground border-b border-border/50 pb-3">
              Event Details &amp; Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="enquiry-fullName"
                label="Full Name"
                required
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={errors.fullName}
                autoComplete="name"
              />
              <Input
                id="enquiry-phone"
                label="Phone Number (WhatsApp)"
                required
                type="tel"
                inputMode="tel"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={errors.phone}
                autoComplete="tel"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                id="enquiry-venueType"
                label="Event Venue Type"
                placeholder="Select your event venue type"
                value={venueType}
                onChange={(e) => setVenueType(e.target.value)}
                options={VENUE_OPTIONS}
                hint="Optional"
              />
              <Input
                id="enquiry-eventDate"
                label="Event Date"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                hint="Optional"
              />
            </div>

            <NumberSelector
              label="Number of trays"
              hint="Traditionally an odd number — 5, 7, 9, 11, 15 or 21."
              value={trayCount}
              onChange={setTrayCount}
              min={3}
              max={31}
              step={2}
            />

            <RadioGroup
              name="enquiryOccasion"
              label="Occasion"
              selectedValue={occasion}
              onChange={setOccasion}
              options={OCCASION_OPTIONS}
            />

            <Textarea
              id="enquiry-notes"
              label="Requirements or flower preferences"
              placeholder="Colours, flowers, specific items, budget range..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              hint="Optional"
            />

            {/*
              Explicit consent, with the privacy policy one click away. Required
              because this is the point at which the visitor hands over a name
              and phone number.
            */}
            <div className="flex flex-col gap-1.5">
              <Checkbox
                id="enquiry-consent"
                variant="primary"
                checked={consentGiven}
                onChange={(e) => {
                  setConsentGiven(e.target.checked);
                  if (e.target.checked) setErrors((prev) => ({ ...prev, consent: "" }));
                }}
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={errors.consent ? consentErrorId : undefined}
                label="I agree to be contacted about this enquiry"
                description="Your details are used only to reply to this enquiry. See our Privacy Policy."
              />
              {errors.consent && (
                <span id={consentErrorId} className="text-xs text-error font-medium pl-8">
                  {errors.consent}
                </span>
              )}
              <p className="text-xs text-muted-foreground pl-8">
                Read our{" "}
                <Link href="/privacy-policy" className="text-primary underline underline-offset-2">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/refund-policy" className="text-primary underline underline-offset-2">
                  Cancellation &amp; Refund Policy
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                rightIcon={<Sparkles className="w-4 h-4" aria-hidden="true" />}
              >
                Send Enquiry via WhatsApp
              </Button>

              <a
                href={whatsappHref(
                  `Hello ${BUSINESS.displayName}, I would like to enquire about Seer Varisai trays.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message us on WhatsApp without filling the form (opens in a new tab)"
              >
                <Button
                  type="button"
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
                  Message Us Directly
                </Button>
              </a>
            </div>

            {/*
              An inline confirmation that stays on the page. A 4-second toast is
              a poor confirmation for screen-reader and low-vision users, and it
              is the only feedback the form used to give.
            */}
            {isSubmitted && (
              <div
                ref={successRef}
                role="status"
                aria-live="polite"
                tabIndex={-1}
                className="bg-success/10 border border-success/40 rounded-xl p-4 sm:p-5 flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-foreground">
                    WhatsApp opened with your enquiry
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                    Your details have been written into a WhatsApp message. Press
                    send in WhatsApp to reach us — nothing has been sent yet. If
                    WhatsApp did not open, call us on{" "}
                    <a href={`tel:${BUSINESS.phoneE164}`} className="text-primary underline">
                      {BUSINESS.phoneDisplay}
                    </a>
                    .
                  </p>
                </div>
              </div>
            )}

            {/*
              Describes what actually happens. The previous text claimed "we
              strictly safeguard customer privacy" while performing no
              processing at all — the accurate version is a stronger promise.
            */}
            <div className="mt-2 bg-secondary/40 p-4 sm:p-5 rounded-xl border border-border flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-primary">
                  Your details stay on your device
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  This form does not send anything to a server or store your
                  details on this website. It opens WhatsApp with your enquiry
                  written out, and you decide whether to send it.
                </p>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </Section>
  );
}
