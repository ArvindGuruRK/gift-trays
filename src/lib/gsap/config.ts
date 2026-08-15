"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Standardized GSAP Timing Constants (seconds)
 * Source of truth: docs/animation-ui.md
 */
export const GSAP_TIMING = {
  instant: 0.1,
  fast: 0.18,
  normal: 0.3,
  medium: 0.45,
  slow: 0.65,
  cinematic: 1.1,
  hero: 1.3,
} as const;

/**
 * Curated GSAP Easing Functions
 * Pure, smooth luxury easings tuned for Tamil cultural heritage aesthetic.
 */
export const GSAP_EASE = {
  luxury: "power3.out",
  smooth: "power2.out",
  cinematic: "power4.out",
  expo: "expo.out",
  soft: "sine.out",
} as const;

/**
 * Check whether the user has requested reduced motion.
 */
export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Read a root-level CSS custom property as a pixel length.
 *
 * `getComputedStyle().getPropertyValue()` returns custom properties as their
 * *specified* token — `"4.5rem"`, not `"72px"` — so a bare `parseFloat` on one
 * silently yields 4.5. Resolve rem/em against the root font size instead.
 */
export function readCssLengthPx(property: string): number {
  if (typeof window === "undefined") return 0;

  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(property)
    .trim();
  if (!raw) return 0;

  const value = Number.parseFloat(raw);
  if (Number.isNaN(value)) return 0;

  if (raw.endsWith("rem") || raw.endsWith("em")) {
    const rootSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return value * rootSize;
  }

  return value;
}

/**
 * Force a ScrollTrigger update & refresh safely.
 */
export function refreshScrollTrigger(): void {
  if (typeof window !== "undefined" && ScrollTrigger) {
    ScrollTrigger.refresh();
  }
}

export { gsap, ScrollTrigger };
