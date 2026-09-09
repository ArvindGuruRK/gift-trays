"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  type?: "success" | "warning" | "error" | "info";
  durationMs?: number;
}

export function Toast({
  isOpen,
  onClose,
  title,
  message,
  type = "success",
  durationMs = 4000,
}: ToastProps) {
  useEffect(() => {
    if (isOpen && durationMs > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, durationMs);
      return () => clearTimeout(timer);
    }
  }, [isOpen, durationMs, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-success shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-warning shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-error shrink-0" />,
    info: <Info className="w-5 h-5 text-accent shrink-0" />,
  };

  const borderColors = {
    success: "border-success/40",
    warning: "border-warning/40",
    error: "border-error/40",
    info: "border-accent/40",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // A confirmation nobody is told about is not a confirmation. role
          // "status" with aria-live polite announces it without stealing focus.
          role={type === "error" ? "alert" : "status"}
          aria-live={type === "error" ? "assertive" : "polite"}
          aria-atomic="true"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "fixed bottom-6 right-6 z-50 max-w-sm w-full bg-card border shadow-warm-lg rounded-xl p-4 flex items-start gap-3 select-none",
            borderColors[type]
          )}
        >
          <span aria-hidden="true">{icons[type]}</span>

          <div className="flex flex-col flex-1">
            <span className="font-sans font-semibold text-sm text-foreground">
              {title}
            </span>
            {message && (
              <span className="font-sans text-xs text-muted-foreground mt-0.5">
                {message}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors w-11 h-11 flex items-center justify-center rounded-full hover:bg-secondary/60 shrink-0"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
