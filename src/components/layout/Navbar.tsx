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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <div className="relative flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group z-10">
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                <DiyaLogo size={84} className="absolute pointer-events-none transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                  Seer Varisai Thattu
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-accent font-semibold">
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
