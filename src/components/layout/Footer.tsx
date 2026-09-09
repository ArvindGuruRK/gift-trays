import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DiyaLogo } from "@/components/ui/DiyaLogo";
import { CopyrightYear } from "@/components/layout/CopyrightYear";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import {
  BUSINESS,
  telHref,
  mailtoHref,
  whatsappHref,
  mapsHref,
  publicEmail,
  publicName,
} from "@/lib/business";

/**
 * Site footer.
 *
 * Every link here resolves. The previous version pointed at /collections,
 * /gallery, /customize and /about — none of which existed — plus the internal
 * /design-system page. Contact details come from `@/lib/business` rather than
 * being retyped, and the phone and email are actionable rather than inert text.
 */

const QUICK_LINKS = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/#collections" },
  { name: "Occasions", href: "/#occasions" },
  { name: "Gallery", href: "/#gallery" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Cookie Policy", href: "/cookie-policy" },
  { name: "Cancellation & Refunds", href: "/refund-policy" },
];

const OCCASIONS = [
  "Wedding Seer Varisai",
  "Engagement Trays",
  "Seemantham & Valaikappu",
  "Housewarming (Grihapravesham)",
  "Baby Shower Trays",
  "Custom Festive Gifts",
];

export function Footer() {
  const a = BUSINESS.address;
  const email = publicEmail();

  return (
    <footer className="w-full bg-secondary/40 text-foreground border-t border-border pt-16 pb-12">
      <Container size="xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-4 min-w-0">
            {/* The logo links home here too — it was plain markup before. */}
            <Link
              href="/"
              className="flex items-center gap-3 group w-fit"
              aria-label={`${BUSINESS.displayName} — home`}
            >
              <span className="relative w-10 h-10 flex items-center justify-center shrink-0">
                <DiyaLogo size={84} className="absolute pointer-events-none" />
              </span>
              <span className="font-serif text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {BUSINESS.displayName}
              </span>
            </Link>

            <p className="text-sm text-muted-foreground font-sans leading-relaxed max-w-md">
              Custom Seer Varisai ceremonial gift trays for weddings,
              engagements, seemantham, housewarming and other traditional
              occasions. Arranged to your requirements and delivered to your
              venue in {a.city} and across {a.state}.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={whatsappHref(
                  `Hello ${BUSINESS.displayName}, I would like to enquire about Seer Varisai tray arrangements.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-[#25D366] text-[#14261B] flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label={`Message ${BUSINESS.displayName} on WhatsApp (opens in a new tab)`}
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={telHref}
                className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label={`Call ${BUSINESS.phoneDisplay}`}
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav className="flex flex-col gap-3 min-w-0" aria-labelledby="footer-quick-links">
            <h2
              id="footer-quick-links"
              className="text-accent-text uppercase font-semibold text-xs tracking-widest"
            >
              Quick Links
            </h2>
            <ul className="flex flex-col gap-2 text-sm font-sans text-foreground/80">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Occasions — services, not links */}
          <div className="flex flex-col gap-3 min-w-0">
            <h2 className="text-accent-text uppercase font-semibold text-xs tracking-widest">
              Occasions
            </h2>
            <ul className="flex flex-col gap-2 text-sm font-sans text-foreground/80">
              {OCCASIONS.map((occasion) => (
                <li key={occasion}>{occasion}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3 min-w-0">
            <h2 className="text-accent-text uppercase font-semibold text-xs tracking-widest">
              Visit &amp; Contact
            </h2>
            <ul className="flex flex-col gap-2 text-sm font-sans text-foreground/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" aria-hidden="true" />
                <a
                  href={mapsHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <address className="not-italic">
                    {a.line1}
                    <br />
                    {a.locality}, {a.city}
                    <br />
                    {a.state} {a.postalCode}
                    <br />
                    <span className="text-muted-foreground">{a.landmark}</span>
                  </address>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                {/* Actionable, not a bare span as before. */}
                <a href={telHref} className="ui-tap-target hover:text-primary transition-colors">
                  {BUSINESS.phoneDisplay}
                </a>
              </li>
              {email && (
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                  {/*
                    The contact column is narrow, so a long address breaks
                    mid-domain ("gmail.co / m"). A <wbr> after the @ gives the
                    browser a sensible place to wrap instead.
                  */}
                  <a
                    href={mailtoHref}
                    className="ui-tap-target hover:text-primary transition-colors [overflow-wrap:anywhere]"
                  >
                    {email.split("@")[0]}@<wbr />
                    {email.split("@")[1]}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <nav
          className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 border-t border-border/40 text-xs font-sans text-muted-foreground"
          aria-label="Legal"
        >
          {LEGAL_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 text-xs text-muted-foreground font-sans text-center sm:text-left">
          <p>
            © <CopyrightYear />{" "}
            {publicName()}. All rights reserved.
          </p>
          {BUSINESS.gstin && <p>GSTIN: {BUSINESS.gstin}</p>}
        </div>
      </Container>
    </footer>
  );
}
