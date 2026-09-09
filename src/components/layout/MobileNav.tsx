"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { drawerVariants, staggerContainer, staggerItem } from "@/lib/animations";
import { DiyaLogo } from "@/components/ui/DiyaLogo";
import { Button } from "@/components/ui/Button";
import { X, Sparkles, Phone, MessageCircle } from "lucide-react";
import { useLenis } from "lenis/react";
import { BUSINESS, telHref, whatsappHref } from "@/lib/business";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ name: string; href: string }>;
  currentPath: string;
}

export function MobileNav({ isOpen, onClose, links, currentPath }: MobileNavProps) {
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // Where focus came from, so it can be handed back on close.
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      // Move focus into the drawer, otherwise the keyboard stays behind it.
      closeButtonRef.current?.focus();
    } else {
      lenis?.start();
      document.body.style.overflow = "unset";
      previouslyFocused.current?.focus?.();
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "unset";
    };
  }, [isOpen, lenis]);

  // Escape to close, and keep Tab inside the drawer while it is open.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  // Whole-page links only — see the note in Navbar.tsx.
  const isActive = (href: string) => !href.includes("#") && currentPath === href;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-dark-brown/60 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            data-lenis-prevent
            className="relative w-full max-w-xs sm:max-w-sm h-full bg-card border-l border-border shadow-warm-lg z-10 p-6 flex flex-col justify-between overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between gap-3 pb-6 border-b border-border/50">
                {/* Logo links home here too — it was inert markup before. */}
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center gap-3 min-w-0 group"
                  aria-label={`${BUSINESS.displayName} — home`}
                >
                  <span className="relative w-8 h-8 flex items-center justify-center shrink-0">
                    <DiyaLogo size={66} className="absolute pointer-events-none" />
                  </span>
                  <span className="font-serif text-lg font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {BUSINESS.displayName}
                  </span>
                </Link>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  className="w-11 h-11 rounded-full bg-secondary/50 flex items-center justify-center text-foreground hover:bg-secondary transition-colors shrink-0"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <motion.nav
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                aria-label="Main"
                className="flex flex-col gap-2 py-6"
              >
                {links.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div key={link.href} variants={staggerItem}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={`block px-4 py-3 rounded-lg text-base font-sans font-semibold transition-colors ${
                          active
                            ? "bg-primary text-primary-foreground font-bold shadow-warm-sm"
                            : "text-foreground hover:bg-secondary/60"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>
            </div>

            <div className="pt-6 border-t border-border/50 flex flex-col gap-3">
              {/* Pointed at /customize before, which 404'd. */}
              <Link href="/#enquiry-form" onClick={onClose} className="w-full">
                <Button
                  variant="primary"
                  fullWidth
                  rightIcon={<Sparkles className="w-4 h-4" aria-hidden="true" />}
                >
                  Request a Custom Tray Set
                </Button>
              </Link>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={whatsappHref(
                    `Hello ${BUSINESS.displayName}, I would like to enquire about Seer Varisai tray arrangements.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                  aria-label="Message us on WhatsApp (opens in a new tab)"
                >
                  <Button
                    variant="whatsapp"
                    size="sm"
                    fullWidth
                    leftIcon={<MessageCircle className="w-4 h-4" aria-hidden="true" />}
                  >
                    WhatsApp
                  </Button>
                </a>
                <a
                  href={telHref}
                  className="flex-1"
                  aria-label={`Call ${BUSINESS.phoneDisplay}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    leftIcon={<Phone className="w-4 h-4" aria-hidden="true" />}
                  >
                    Call Us
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
