"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, GSAP_EASE, GSAP_TIMING, isReducedMotion } from "./config";

/**
 * Hook 1: Hero Animation Sequence
 * Orchestrates a multi-stage cinematic entrance timeline for hero sections.
 */
export interface UseGSAPHeroOptions {
  delay?: number;
  onComplete?: () => void;
  isSplashActive?: boolean;
}

export function useGSAPHeroSequence(options: UseGSAPHeroOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { delay = 0.1, onComplete, isSplashActive = false } = options;

  useGSAP(
    () => {
      if (!containerRef.current || isReducedMotion() || isSplashActive) return;

      const logo = containerRef.current.querySelector("[data-hero-logo]");
      const eyebrow = containerRef.current.querySelector("[data-hero-eyebrow]");
      const heading = containerRef.current.querySelector("[data-hero-heading]");
      const description = containerRef.current.querySelector("[data-hero-description]");
      const ctas = containerRef.current.querySelectorAll("[data-hero-cta]");
      const bg = containerRef.current.querySelector("[data-hero-bg]");
      const motif = containerRef.current.querySelector("[data-hero-motif]");

      // Refresh ScrollTrigger calculations cleanly
      ScrollTrigger.refresh();

      const tl = gsap.timeline({
        delay,
        onComplete,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Background fade & subtle scale down
      if (bg) {
        tl.fromTo(
          bg,
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: GSAP_TIMING.hero, ease: GSAP_EASE.luxury },
          0
        );
      }

      // Logo entrance
      if (logo) {
        tl.fromTo(
          logo,
          { opacity: 0, y: -20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: GSAP_TIMING.slow, ease: GSAP_EASE.luxury },
          0.15
        );
      }

      // Eyebrow entrance
      if (eyebrow) {
        tl.fromTo(
          eyebrow,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: GSAP_TIMING.medium, ease: GSAP_EASE.luxury },
          0.3
        );
      }

      // Main Heading entrance
      if (heading) {
        tl.fromTo(
          heading,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: GSAP_TIMING.slow, ease: GSAP_EASE.luxury },
          0.45
        );
      }

      // Description text
      if (description) {
        tl.fromTo(
          description,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: GSAP_TIMING.medium, ease: GSAP_EASE.smooth },
          0.65
        );
      }

      // CTAs staggered entrance
      if (ctas.length > 0) {
        tl.fromTo(
          ctas,
          { opacity: 0, y: 20, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: GSAP_TIMING.medium,
            stagger: 0.12,
            ease: GSAP_EASE.luxury,
          },
          0.8
        );
      }

      // Cultural Motif floating reveal
      if (motif) {
        tl.fromTo(
          motif,
          { opacity: 0, scale: 0.8, rotate: -10 },
          { opacity: 1, scale: 1, rotate: 0, duration: GSAP_TIMING.cinematic, ease: GSAP_EASE.luxury },
          0.9
        );
      }
    },
    { scope: containerRef, dependencies: [isSplashActive] }
  );

  return containerRef;
}

/**
 * Hook 2: Scroll Trigger Entrance Reveal
 * Triggers entrance animation as target element scrolls into view.
 */
export interface UseGSAPScrollRevealOptions {
  type?: "fadeUp" | "fadeIn" | "scaleIn" | "slideRight" | "slideLeft";
  start?: string;
  end?: string;
  duration?: number;
  delay?: number;
  stagger?: number;
  scrub?: boolean | number;
  once?: boolean;
}

export function useGSAPScrollReveal(options: UseGSAPScrollRevealOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    type = "fadeUp",
    start = "top 78%",
    duration = GSAP_TIMING.slow,
    delay = 0,
    stagger = 0,
    scrub = false,
    once = true,
  } = options;

  useGSAP(
    () => {
      if (!containerRef.current || isReducedMotion()) return;

      const children = containerRef.current.hasAttribute("data-gsap-target")
        ? [containerRef.current]
        : containerRef.current.querySelectorAll("[data-gsap-item]");

      const targets = children.length > 0 ? children : [containerRef.current];

      let initialProps: gsap.TweenVars = { opacity: 0, y: 40 };
      let animateProps: gsap.TweenVars = { opacity: 1, y: 0 };

      if (type === "fadeIn") {
        initialProps = { opacity: 0 };
        animateProps = { opacity: 1 };
      } else if (type === "scaleIn") {
        initialProps = { opacity: 0, scale: 0.92, y: 20 };
        animateProps = { opacity: 1, scale: 1, y: 0 };
      } else if (type === "slideRight") {
        initialProps = { opacity: 0, x: -50 };
        animateProps = { opacity: 1, x: 0 };
      } else if (type === "slideLeft") {
        initialProps = { opacity: 0, x: 50 };
        animateProps = { opacity: 1, x: 0 };
      }

      gsap.fromTo(targets, initialProps, {
        ...animateProps,
        duration,
        delay,
        stagger: stagger > 0 ? stagger : undefined,
        ease: GSAP_EASE.luxury,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          toggleActions: scrub ? undefined : once ? "play none none none" : "play reverse play reverse",
          scrub,
        },
      });
    },
    { scope: containerRef }
  );

  return containerRef;
}

/**
 * Hook 3: Text Mask & Line Reveal
 * Creates smooth line/word reveal for headings and titles.
 */
export interface UseGSAPTextRevealOptions {
  stagger?: number;
  duration?: number;
  start?: string;
}

export function useGSAPTextReveal(options: UseGSAPTextRevealOptions = {}) {
  const textRef = useRef<HTMLHeadingElement | HTMLParagraphElement | HTMLDivElement>(null);
  const { stagger = 0.08, duration = GSAP_TIMING.slow, start = "top 80%" } = options;

  useGSAP(
    () => {
      if (!textRef.current || isReducedMotion()) return;

      const lines = textRef.current.querySelectorAll("[data-text-line]");
      const targets = lines.length > 0 ? lines : [textRef.current];

      gsap.fromTo(
        targets,
        { opacity: 0, y: 30, clipPath: "inset(0% 0% 100% 0%)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration,
          stagger,
          ease: GSAP_EASE.luxury,
          scrollTrigger: {
            trigger: textRef.current,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: textRef }
  );

  return textRef;
}

/**
 * Hook 4: Image Reveal & Mask Animation
 * Creates luxury curtain mask reveal or scale reveal for editorial images.
 */
export interface UseGSAPImageRevealOptions {
  direction?: "up" | "down" | "left" | "right" | "scale";
  duration?: number;
  start?: string;
  isSplashActive?: boolean;
}

export function useGSAPImageReveal(options: UseGSAPImageRevealOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { direction = "up", duration = GSAP_TIMING.cinematic, start = "top 80%", isSplashActive = false } = options;

  useGSAP(
    () => {
      if (!containerRef.current || isReducedMotion() || isSplashActive) return;

      const img = containerRef.current.querySelector("img, svg, canvas") || containerRef.current;
      const mask = containerRef.current;

      let clipStart = "inset(100% 0% 0% 0%)";
      let clipEnd = "inset(0% 0% 0% 0%)";

      if (direction === "down") {
        clipStart = "inset(0% 0% 100% 0%)";
      } else if (direction === "left") {
        clipStart = "inset(0% 0% 0% 100%)";
      } else if (direction === "right") {
        clipStart = "inset(0% 100% 0% 0%)";
      }

      if (direction === "scale") {
        gsap.fromTo(
          img,
          { scale: 1.15, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration,
            ease: GSAP_EASE.luxury,
            scrollTrigger: {
              trigger: mask,
              start,
              toggleActions: "play none none none",
            },
          }
        );
      } else {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mask,
            start,
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          mask,
          { clipPath: clipStart },
          { clipPath: clipEnd, duration, ease: GSAP_EASE.luxury }
        );

        if (img !== mask) {
          tl.fromTo(
            img,
            { scale: 1.1 },
            { scale: 1, duration: duration * 1.1, ease: GSAP_EASE.luxury },
            0
          );
        }
      }
    },
    { scope: containerRef, dependencies: [isSplashActive] }
  );

  return containerRef;
}

/**
 * Hook 5: Parallax Scroll Effect
 * Controls vertical movement of background or visual elements tied to scroll position.
 */
export interface UseGSAPParallaxOptions {
  speed?: number; // negative moves up faster, positive moves down
  start?: string;
  end?: string;
}

export function useGSAPParallax(options: UseGSAPParallaxOptions = {}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { speed = -0.2, start = "top bottom", end = "bottom top" } = options;

  useGSAP(
    () => {
      if (!elementRef.current || isReducedMotion()) return;

      const triggerElement = elementRef.current.parentElement || elementRef.current;
      const yShift = speed * 120;

      gsap.fromTo(
        elementRef.current,
        { y: -yShift },
        {
          y: yShift,
          ease: "none",
          scrollTrigger: {
            trigger: triggerElement,
            start,
            end,
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: elementRef }
  );

  return elementRef;
}

/**
 * Hook 6: Horizontal Scroll Section
 * Converts vertical scrolling into horizontal translation for collections and galleries.
 * Uses smooth viewport scrub without forcing destructive DOM pin spacers inside cards.
 */
export function useGSAPHorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || isReducedMotion()) return;

      const track = sectionRef.current.querySelector("[data-horizontal-track]") as HTMLElement;
      if (!track) return;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const containerWidth = sectionRef.current?.clientWidth || window.innerWidth;
        const amount = trackWidth - containerWidth;
        return amount > 0 ? -amount : 0;
      };

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Ensure proper width calculations after images load
      const images = track.querySelectorAll("img");
      images.forEach((img) => {
        if (!img.complete) {
          img.addEventListener("load", () => ScrollTrigger.refresh());
        }
      });
    },
    { scope: sectionRef }
  );

  return sectionRef;
}

/**
 * Hook 7: Pinned Storytelling Section
 * Pins container and steps through storytelling cards during vertical scroll.
 */
export interface PinnedStoryStep {
  id: string;
  title: string;
}

export function useGSAPPinnedStory(stepCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeStepRef = useRef<number>(0);

  useGSAP(
    () => {
      if (!containerRef.current || isReducedMotion()) return;

      const cards = containerRef.current.querySelectorAll("[data-story-step]");
      if (cards.length === 0) return;

      cards.forEach((card, index) => {
        if (index === 0) return; // First step is visible initially

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: () => `top+=${index * 400} top`,
          end: () => `top+=${(index + 1) * 400} top`,
          onEnter: () => {
            activeStepRef.current = index;
            gsap.to(card, { opacity: 1, y: 0, duration: 0.5, ease: GSAP_EASE.luxury });
          },
          onLeaveBack: () => {
            activeStepRef.current = index - 1;
            gsap.to(card, { opacity: 0, y: 30, duration: 0.4, ease: GSAP_EASE.smooth });
          },
        });
      });

      // Pin main container for full duration of steps
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${stepCount * 400}`,
        pin: true,
        pinSpacing: true,
      });
    },
    { scope: containerRef }
  );

  return containerRef;
}
