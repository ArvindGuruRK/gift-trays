"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

/** Appears once the visitor has scrolled this many viewport heights. */
const SHOW_AFTER_VIEWPORTS = 0.8;

/** Same pace as the other in-page Lenis scrolls (e.g. "Enquire Now"). */
const SCROLL_DURATION = 1.2;

/**
 * Floating "back to top" button, bottom-right on every page.
 *
 * The ring around it fills with scroll progress. The ring and the visibility
 * check are driven from a rAF-throttled scroll listener that writes the ring
 * straight to the DOM; React state only changes when the button shows or hides,
 * never on every scroll frame.
 */
export function BackToTop() {
  const lenis = useLenis();
  const [isVisible, setIsVisible] = useState(false);
  const progressRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, y / maxScroll) : 0;

      setIsVisible(y > window.innerHeight * SHOW_AFTER_VIEWPORTS);
      // pathLength is 100, so the offset is simply the unfilled percentage.
      progressRef.current?.setAttribute("stroke-dashoffset", String(100 - progress * 100));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const scrollToTop = (event: React.MouseEvent<HTMLButtonElement>) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (lenis) {
      lenis.scrollTo(0, reduceMotion ? { immediate: true } : { duration: SCROLL_DURATION });
    } else {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    }

    // Keyboard activation (a click with no pointer, detail 0): move focus to
    // the start of the page too. Otherwise the next Tab would continue from
    // this button at the very end of the document, not from the top.
    if (event.detail === 0) {
      document
        .querySelector<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
        ?.focus({ preventScroll: true });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      // Hidden with visibility, not just opacity, so an invisible button can't
      // be tabbed to or announced. z-30 keeps it under modals, drawers and the
      // mobile menu (z-50).
      className={cn(
        "group fixed z-30 print:hidden",
        "bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] sm:bottom-6 sm:right-6",
        "w-12 h-12 rounded-full flex items-center justify-center",
        "bg-primary text-primary-foreground shadow-warm-lg hover:bg-primary-hover",
        "transition-[opacity,transform,visibility,background-color] duration-300 ease-luxury",
        isVisible ? "visible opacity-100 translate-y-0" : "invisible opacity-0 translate-y-3"
      )}
    >
      {/* Scroll-progress ring, drawn just inside the button's edge. */}
      <svg aria-hidden="true" viewBox="0 0 48 48" className="absolute inset-0 w-full h-full -rotate-90">
        <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeOpacity={0.18} strokeWidth={2} />
        <circle
          ref={progressRef}
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="var(--accent-on-dark)"
          strokeWidth={2}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset="100"
        />
      </svg>
      <ArrowUp
        aria-hidden="true"
        className="relative w-5 h-5 transition-transform duration-300 ease-luxury group-hover:-translate-y-0.5"
      />
    </button>
  );
}
