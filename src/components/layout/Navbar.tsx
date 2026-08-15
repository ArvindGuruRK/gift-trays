"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThattuIcon } from "@/components/ui/Motifs";
import { MobileNav } from "@/components/layout/MobileNav";
import { Sparkles, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Collections", href: "/collections" },
  { name: "Occasions", href: "/occasions" },
  { name: "Gallery", href: "/gallery" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    // Lenis emits scroll events every frame, so this runs ~60x/sec. Reading
    // scrollY is a layout-inducing read, and calling setState unconditionally
    // re-rendered the whole header each time. Batch into one rAF and bail out
    // unless the boolean actually flipped.
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const scrolled = window.scrollY > 20;
        setIsScrolled((prev) => (prev === scrolled ? prev : scrolled));
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          // Height is deliberately CONSTANT across scroll states. This used to
          // toggle py-5 -> py-3 and add a border under `transition-all`, i.e. a
          // 300ms layout animation on a sticky element — which also shifted the
          // pin offset that the horizontal-scroll section measures against.
          // Only colours and shadow change now, none of which trigger layout.
          // Height is pinned to the --nav-height custom property so the GSAP
          // horizontal-scroll pin can read the same value without measuring a
          // live element (see useGSAPHorizontalScroll).
          "sticky top-0 z-40 w-full h-(--nav-height) border-b",
          "transition-[background-color,border-color,box-shadow] duration-300",
          isScrolled
            ? "bg-card/90 backdrop-blur-md border-border shadow-warm-sm"
            : "bg-background/80 backdrop-blur-sm border-transparent"
        )}
      >
        <Container size="xl" className="h-full">
          <div className="relative flex items-center justify-between h-full">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group z-10">
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-accent/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <ThattuIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  Seer Varisai Thattu
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-accent font-semibold -mt-1">
                  Traditional Ceremonial Trays
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links - Centered */}
            <nav className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative text-sm font-sans font-semibold tracking-wide transition-colors py-1",
                      isActive
                        ? "text-primary font-bold"
                        : "text-foreground/80 hover:text-primary"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action CTA & Mobile Toggle */}
            <div className="flex items-center gap-3 z-10">
              <Link href="/design-system" className="hidden sm:inline-flex">
                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={<Sparkles className="w-3.5 h-3.5 text-accent" />}
                >
                  Enquire Now
                </Button>
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden w-10 h-10 rounded-md border border-border bg-card flex items-center justify-center text-foreground hover:bg-secondary/60 transition-colors"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Animated Navigation Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={NAV_LINKS}
        currentPath={pathname}
      />
    </>
  );
}
