"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DiyaLogo } from "@/components/ui/DiyaLogo";
import { MobileNav } from "@/components/layout/MobileNav";
import { Sparkles, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { BUSINESS } from "@/lib/business";

/**
 * Primary navigation.
 *
 * Every entry resolves. Previously six of these pointed at routes that were
 * never built (/collections, /occasions, /gallery, /about, /contact) and every
 * one returned a 404. The homepage sections they described do exist, so the
 * three that map to sections became in-page anchors, and /about and /contact
 * are now real pages.
 */
export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/#collections" },
  { name: "Occasions", href: "/#occasions" },
  { name: "Gallery", href: "/#gallery" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

/** Where every "Enquire" call to action points. */
export const ENQUIRY_HREF = "/#enquiry-form";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only whole-page links get the active treatment. Comparing just the path
  // would mark Home, Collections, Occasions and Gallery all active at once on
  // the homepage, since they share the "/" path and differ only by anchor.
  const isActive = (href: string) => !href.includes("#") && pathname === href;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-card/90 backdrop-blur-md border-b border-border shadow-warm-sm py-3"
            : "bg-background/80 backdrop-blur-sm py-5"
        )}
      >
        <Container size="xl">
          <div className="relative flex items-center justify-between gap-3">
            {/* Brand logo — links home */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 group z-10 min-w-0"
              aria-label={`${BUSINESS.displayName} — home`}
            >
              <span className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
                <DiyaLogo
                  size={84}
                  className="absolute pointer-events-none transition-transform duration-300 group-hover:scale-110"
                />
              </span>
              <span className="flex flex-col justify-center min-w-0">
                {/* Shrinks at 320px rather than pushing the menu button off-screen. */}
                <span className="font-serif text-base sm:text-xl md:text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight truncate">
                  {BUSINESS.displayName}
                </span>
                <span className="hidden sm:block text-[10px] uppercase tracking-[0.18em] text-accent-text font-semibold truncate">
                  {BUSINESS.tagline}
                </span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <nav
              className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2"
              aria-label="Main"
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative text-sm font-sans font-semibold tracking-wide transition-colors py-1",
                      active
                        ? "text-primary font-bold"
                        : "text-foreground/80 hover:text-primary"
                    )}
                  >
                    {link.name}
                    {active && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3 z-10 shrink-0">
              {/* Went to /design-system before — an internal developer page. */}
              <Link href={ENQUIRY_HREF} className="hidden sm:inline-flex">
                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={<Sparkles className="w-3.5 h-3.5" aria-hidden="true" />}
                >
                  Enquire Now
                </Button>
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                className="lg:hidden w-11 h-11 rounded-md border border-border bg-card flex items-center justify-center text-foreground hover:bg-secondary/60 transition-colors shrink-0"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={NAV_LINKS}
        currentPath={pathname}
      />
    </>
  );
}
