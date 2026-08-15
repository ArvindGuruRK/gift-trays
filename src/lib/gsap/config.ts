"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Mobile browsers fire a resize when the URL bar collapses or expands mid-scroll.
  // Refreshing on that resize recalculates pin start/end while a section is pinned,
  // which snaps the page to a new scroll position. Ignore the vertical-only resize;
  // orientation changes and real width changes still refresh.
  ScrollTrigger.config({ ignoreMobileResize: true });
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
 * Force a ScrollTrigger update & refresh safely.
 */
export function refreshScrollTrigger(): void {
  if (typeof window !== "undefined" && ScrollTrigger) {
    ScrollTrigger.refresh();
  }
}

export { gsap, ScrollTrigger };
