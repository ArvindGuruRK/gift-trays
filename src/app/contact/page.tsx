import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/seo";
import {
  BUSINESS,
  telHref,
  mailtoHref,
  whatsappHref,
  mapsHref,
  publicEmail,
} from "@/lib/business";
import { Phone, Mail, MapPin, MessageCircle, ExternalLink } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description: `Contact ${BUSINESS.displayName} in ${BUSINESS.address.city} — phone, WhatsApp, email and address for Seer Varisai Thattu tray enquiries.`,
  path: "/contact",
});

export default function ContactPage() {
  const a = BUSINESS.address;
  const email = publicEmail();

  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageShell>
        <Section theme="sand" padding="md">
          <Container size="lg">
            <Heading
              eyebrow="Contact"
              title="Get in Touch"
              subtitle="The quickest way to reach us is WhatsApp. Phone and email work too."
              align="left"
              hasDivider
            />
          </Container>
        </Section>

        <Section theme="ivory" padding="md">
          <Container size="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* WhatsApp */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-warm-sm flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="w-11 h-11 rounded-xl bg-[#25D366]/15 text-[#14261B] flex items-center justify-center shrink-0"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </span>
                  <h2 className="font-serif text-xl font-semibold text-foreground">WhatsApp</h2>
                </div>
                <p className="text-sm text-muted-foreground font-sans">
                  Send us your occasion, date and roughly how many trays you
                  need, and we will reply with what we can put together.
                </p>
                <a
                  href={whatsappHref(
                    `Hello ${BUSINESS.displayName}, I would like to enquire about Seer Varisai tray arrangements.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto"
                  aria-label="Message us on WhatsApp (opens in a new tab)"
                >
                  <Button
                    variant="whatsapp"
                    fullWidth
                    leftIcon={<MessageCircle className="w-4 h-4" aria-hidden="true" />}
                  >
                    Message on WhatsApp
                  </Button>
                </a>
              </div>

              {/* Phone */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-warm-sm flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0"
                  >
                    <Phone className="w-5 h-5" />
                  </span>
                  <h2 className="font-serif text-xl font-semibold text-foreground">Phone</h2>
                </div>
                <p className="text-sm text-muted-foreground font-sans">
                  Prefer to talk it through? Call us directly.
                </p>
                <a href={telHref} className="mt-auto" aria-label={`Call ${BUSINESS.phoneDisplay}`}>
                  <Button
                    variant="primary"
                    fullWidth
                    leftIcon={<Phone className="w-4 h-4" aria-hidden="true" />}
                  >
                    {BUSINESS.phoneDisplay}
                  </Button>
                </a>
              </div>

              {/* Email — hidden until a real address is configured */}
              {email && (
              <div className="p-6 rounded-2xl bg-card border border-border shadow-warm-sm flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="w-11 h-11 rounded-xl bg-accent/15 text-accent-text flex items-center justify-center shrink-0"
                  >
                    <Mail className="w-5 h-5" />
                  </span>
                  <h2 className="font-serif text-xl font-semibold text-foreground">Email</h2>
                </div>
                <p className="text-sm text-muted-foreground font-sans">
                  Good for longer requirements or if you want a written quote.
                </p>
                <a href={mailtoHref} className="mt-auto" aria-label={`Email ${email}`}>
                  <Button
                    variant="outline"
                    fullWidth
                    leftIcon={<Mail className="w-4 h-4" aria-hidden="true" />}
                  >
                    <span className="[overflow-wrap:anywhere]">{email}</span>
                  </Button>
                </a>
              </div>
              )}

              {/* Address */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-warm-sm flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="w-11 h-11 rounded-xl bg-accent/15 text-accent-text flex items-center justify-center shrink-0"
                  >
                    <MapPin className="w-5 h-5" />
                  </span>
                  <h2 className="font-serif text-xl font-semibold text-foreground">Where We Are</h2>
                </div>
                <address className="not-italic text-sm text-muted-foreground font-sans leading-relaxed">
                  {a.line1}
                  <br />
                  {a.locality}
                  <br />
                  {a.city}, {a.state} {a.postalCode}
                  <br />
                  {a.country}
                  <br />
                  <span className="text-foreground/70">{a.landmark}</span>
                </address>
                {/*
                  A plain link, not an embedded map. An embed would load
                  third-party tracking scripts and cookies, which would give
                  this site a consent obligation it currently does not have.
                */}
                <a
                  href={mapsHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto"
                  aria-label="Open our address in Google Maps (opens in a new tab)"
                >
                  <Button
                    variant="outline"
                    fullWidth
                    rightIcon={<ExternalLink className="w-4 h-4" aria-hidden="true" />}
                  >
                    Open in Maps
                  </Button>
                </a>
              </div>
            </div>

            <div className="mt-10 p-6 rounded-2xl bg-secondary/40 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-semibold text-foreground">
                  Rather fill in a form?
                </h2>
                <p className="text-sm text-muted-foreground font-sans mt-1">
                  The enquiry form collects your details and hands them to
                  WhatsApp for you.
                </p>
              </div>
              <Link href="/#enquiry-form" className="shrink-0">
                <Button variant="primary" size="lg">
                  Go to Enquiry Form
                </Button>
              </Link>
            </div>

            <div className="mt-6">
              <p className="text-sm text-muted-foreground font-sans">
                We serve {BUSINESS.serviceAreas.join(" and ")}. Read our{" "}
                <Link href="/privacy-policy" className="text-primary underline underline-offset-2">
                  Privacy Policy
                </Link>{" "}
                to see how we handle your details.
              </p>
            </div>
          </Container>
        </Section>
      </PageShell>
    </>
  );
}
