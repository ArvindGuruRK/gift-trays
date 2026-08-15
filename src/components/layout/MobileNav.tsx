"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { drawerVariants, staggerContainer, staggerItem } from "@/lib/animations";
import { DiyaLogo } from "@/components/ui/DiyaLogo";
import { Button } from "@/components/ui/Button";
import { X, Sparkles, Phone, MessageCircle } from "lucide-react";
import { useLenis } from "lenis/react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{ name: string; href: string }>;
  currentPath: string;
}

export function MobileNav({ isOpen, onClose, links, currentPath }: MobileNavProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "unset";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "unset";
    };
  }, [isOpen, lenis]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark-brown/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            data-lenis-prevent
            className="relative w-full max-w-xs sm:max-w-sm h-full bg-card border-l border-border shadow-warm-lg z-10 p-6 flex flex-col justify-between overflow-y-auto"
          >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                    <DiyaLogo size={66} className="absolute pointer-events-none" />
                  </div>
                  <span className="font-serif text-lg font-semibold text-foreground">
                    Seer Varisai Thattu
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-secondary/50 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <motion.nav
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-2 py-6"
              >
                {links.map((link) => {
                  const isActive = currentPath === link.href;
                  return (
                    <motion.div key={link.href} variants={staggerItem}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className={`block px-4 py-3 rounded-lg text-base font-sans font-semibold transition-colors ${
                          isActive
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

            {/* Drawer Footer Actions */}
            <div className="pt-6 border-t border-border/50 flex flex-col gap-3">
              <Link href="/customize" onClick={onClose} className="w-full">
                <Button
                  variant="primary"
                  fullWidth
                  rightIcon={<Sparkles className="w-4 h-4 text-accent" />}
                >
                  Request Custom Tray Set
                </Button>
              </Link>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="whatsapp"
                    size="sm"
                    fullWidth
                    leftIcon={<MessageCircle className="w-4 h-4" />}
                  >
                    WhatsApp
                  </Button>
                </a>
                <a href="tel:+919876543210" className="flex-1">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    leftIcon={<Phone className="w-4 h-4" />}
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
