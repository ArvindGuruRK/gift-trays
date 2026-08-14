import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ThattuIcon, LotusMotif } from "@/components/ui/Motifs";
import { Phone, Mail, MapPin, MessageCircle, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-secondary/40 text-foreground border-t border-border pt-16 pb-12">
      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand Story Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-accent/40 flex items-center justify-center">
                <ThattuIcon className="w-5 h-5 text-primary" />
              </div>
              <span className="font-serif text-2xl font-semibold tracking-tight text-foreground">
                Seer Varisai Thattu
              </span>
            </div>

            <p className="text-sm text-muted-foreground font-sans leading-relaxed max-w-md">
              Artisanal studio crafting exquisite packed Seer Varisai ceremonial gift trays for weddings, engagements, seemantham, baby showers, and sacred occasions. Handcrafted with gold-standard plating, deep ceremonial reverence, and visual perfection.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="tel:+919876543210"
                className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
                aria-label="Phone Call"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-eyebrow text-accent uppercase font-semibold text-xs tracking-widest">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2 text-sm font-sans text-foreground/80">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/design-system" className="hover:text-primary transition-colors">
                  Design System
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-primary transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-primary transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/customize" className="hover:text-primary transition-colors">
                  Custom Order Request
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Our Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Occasions Served Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-eyebrow text-accent uppercase font-semibold text-xs tracking-widest">
              Occasions
            </h4>
            <ul className="flex flex-col gap-2 text-sm font-sans text-foreground/80">
              <li>Wedding Seer Varisai</li>
              <li>Engagement Trays</li>
              <li>Seemantham & Valaikappu</li>
              <li>Housewarming (Grihapravesham)</li>
              <li>Baby Shower Trays</li>
              <li>Custom Festive Gifts</li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="flex flex-col gap-3">
            <h4 className="text-eyebrow text-accent uppercase font-semibold text-xs tracking-widest">
              Visit & Contact
            </h4>
            <ul className="flex flex-col gap-3 text-sm font-sans text-foreground/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Artisanal Studio &amp; Venue Service</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span>enquiry@seervarisai.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/40 text-xs text-muted-foreground font-sans text-center sm:text-left">
          <p>© {new Date().getFullYear()} Seer Varisai Thattu. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 text-primary fill-primary inline" />
            <span>for Sacred Wedding Ceremonies</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
