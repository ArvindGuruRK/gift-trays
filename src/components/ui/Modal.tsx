"use client";

import React, { useEffect, useId, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { modalVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useLenis } from "lenis/react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * Modal dialog.
 *
 * Previously a plain <div>: no dialog role, no accessible name, no focus trap
 * and no focus restore. A keyboard user could tab straight out of it into the
 * page behind, and a screen reader was never told a dialog had opened.
 */
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}: ModalProps) {
  const lenis = useLenis();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const id = useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      closeButtonRef.current?.focus();
    } else {
      lenis?.start();
      document.body.style.overflow = "unset";
      // Hand focus back to whatever opened the dialog.
      previouslyFocused.current?.focus?.();
    }

    return () => {
      lenis?.start();
      document.body.style.overflow = "unset";
    };
  }, [isOpen, lenis]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
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

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="ui-modal-overlay"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={description ? descriptionId : undefined}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn("ui-modal-container my-8", sizeClasses[size])}
          >
            <div className="flex items-start justify-between gap-3 p-6 pb-4 border-b border-border/50">
              <div className="flex flex-col gap-1 min-w-0">
                {title && (
                  <h2 id={titleId} className="text-h3 font-medium text-foreground tracking-tight">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id={descriptionId} className="text-sm text-muted-foreground font-sans">
                    {description}
                  </p>
                )}
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="w-11 h-11 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors shrink-0"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto" data-lenis-prevent>
              {children}
            </div>

            {footer && (
              <div className="flex flex-wrap items-center justify-end gap-3 p-6 pt-4 border-t border-border/50 bg-secondary/20">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
