import { Variants } from "motion/react";

/**
 * Seer Varisai Thattu Motion & Animation System
 * Source of truth: docs/animation-ui.md
 */

// Timing Constants (ms)
export const TIMING = {
  instant: 0.1,
  fast: 0.18,
  normal: 0.3,
  medium: 0.45,
  slow: 0.65,
  cinematic: 1.1,
} as const;

// Easing Functions
export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;
export const SMOOTH_EASE = [0.25, 0.1, 0.25, 1] as const;

// Motion Variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: TIMING.slow, ease: LUXURY_EASE },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: TIMING.slow, ease: LUXURY_EASE },
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: TIMING.normal, ease: LUXURY_EASE },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: TIMING.medium, ease: LUXURY_EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: TIMING.medium, ease: LUXURY_EASE },
  },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: TIMING.cinematic, ease: LUXURY_EASE },
  },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: TIMING.medium, ease: LUXURY_EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 10,
    transition: { duration: TIMING.fast, ease: "easeIn" },
  },
};

export const drawerVariants: Variants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: TIMING.medium, ease: LUXURY_EASE },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { duration: TIMING.normal, ease: "easeIn" },
  },
};

export const buttonHover = {
  scale: 1.02,
  transition: { duration: TIMING.fast, ease: LUXURY_EASE },
};

export const buttonTap = {
  scale: 0.98,
  transition: { duration: TIMING.fast },
};

export const cardHover = {
  y: -4,
  transition: { duration: TIMING.normal, ease: LUXURY_EASE },
};

// ─── Typography Showcase Scroll Animations ──────────────────────────────────

/**
 * Per-row scroll-triggered variant.
 * Pass `custom={rowIndex}` to motion.div so the first visible rows get a
 * tiny cascade delay (0.08s × index, capped at 0.32s). Rows further down
 * the page will each animate independently when they cross the viewport.
 */
export const typographyRow: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.slow,
      ease: LUXURY_EASE,
      delay: Math.min(i * 0.08, 0.32),
    },
  }),
};

/** Eyebrow label slides in from the left */
export const eyebrowReveal: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: TIMING.medium, ease: LUXURY_EASE },
  },
};

/** Metadata / mono caption fades in gently after the heading */
export const metaFade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: TIMING.medium, ease: SMOOTH_EASE, delay: 0.25 },
  },
};

// kept for backward compat — other sections that still import these
export const typographyContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
export const typographyItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: TIMING.slow, ease: LUXURY_EASE },
  },
};
