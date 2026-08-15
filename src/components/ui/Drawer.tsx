"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { drawerVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useLenis } from "lenis/react";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  position?: "left" | "right";
  size?: "sm" | "md" | "lg";
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
  size = "md",
}: DrawerProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => {
      lenis?.start();
    };
  }, [isOpen, lenis]);

  const sizeClasses = {
    sm: "max-w-xs",
    md: "max-w-sm sm:max-w-md",
    lg: "max-w-lg sm:max-w-xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex",
            position === "right" ? "justify-end" : "justify-start"
          )}
        >
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
            className={cn(
              "relative w-full h-full bg-card border-l border-border shadow-warm-lg z-10 p-6 flex flex-col justify-between overflow-y-auto",
              sizeClasses[size]
            )}
          >
            <div>
              {title && (
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/50">
                  <span className="font-serif text-lg font-semibold text-foreground">
                    {title}
                  </span>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                    aria-label="Close drawer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
