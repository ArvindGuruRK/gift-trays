"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import {
  gsap,
  ScrollTrigger,
  GSAP_EASE,
  GSAP_TIMING,
  isReducedMotion,
  readCssLengthPx,
} from "./config";

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

      // NOTE: deliberately no ScrollTrigger.refresh() here. It re-measures every
      // trigger on the page from inside one component's hook, and re-fires on the
      // isSplashActive dependency below — so it landed twice, mid-splash-fade,
      // fighting the provider's own refresh. Refreshing is the provider's job
      // (SmoothScrollProvider) plus one call when the splash completes.

      const tl = gsap.timeline({
        delay,
        onComplete,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
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
    end,
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
          end,
          toggleActions: scrub ? undefined : once ? "play none none none" : "play reverse play reverse",
          scrub,
          // Self-destruct after firing. `toggleActions: "play none none none"`
          // alone left every one of these ~20 triggers registered for the life of
          // the page, re-measuring on every refresh for an animation that can
          // never run again.
          once: scrub ? undefined : once,
          // Don't leave a reveal stranded half-played when the user flicks past
          // it faster than the trigger's own resolution.
          fastScrollEnd: true,
          invalidateOnRefresh: true,
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
          willChange: "clip-path, transform",
          onComplete: () => gsap.set(targets, { willChange: "auto" }),
          scrollTrigger: {
            trigger: textRef.current,
            start,
            toggleActions: "play none none none",
            once: true,
            fastScrollEnd: true,
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
      const clipEnd = "inset(0% 0% 0% 0%)";

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
              once: true,
            },
          }
        );
      } else {
        // Curtain reveal via clip-path only.
        //
        // This used to also tween `scale` on the inner <img> across the same
        // window. Scaling a large image forces the browser to re-raster it every
        // frame, and doing that *while* its clip region is also changing is the
        // most expensive combination available here — on the hero, over a
        // full-bleed photo. The clip alone reads virtually identically.
        gsap.fromTo(
          mask,
          { clipPath: clipStart },
          {
            clipPath: clipEnd,
            duration,
            ease: GSAP_EASE.luxury,
            // Hint the compositor for the duration only — a permanent
            // will-change would hold the layer alive for the whole page.
            willChange: "clip-path",
            onComplete: () => gsap.set(mask, { willChange: "auto" }),
            scrollTrigger: {
              trigger: mask,
              start,
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
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
            // A little smoothing rather than binding rigidly to raw scroll
            // deltas — with Lenis driving updates, `scrub: true` reads as
            // twitchy on trackpads.
            scrub: 0.5,
            invalidateOnRefresh: true,
            // Promote only while this element is actually within its scrub
            // window, then release the layer again.
            onToggle: (self) =>
              gsap.set(elementRef.current, {
                willChange: self.isActive ? "transform" : "auto",
              }),
          },
        }
      );
    },
    { scope: elementRef }
  );

  return elementRef;
}

/**
 * Hook 6: Horizontal Scroll Section (true scroll-jacking)
 *
 * Pins the section in the viewport and converts vertical scroll input into
 * horizontal translation of the card track — the page itself stops advancing
 * while the cards travel left-to-right, then releases back to normal vertical
 * scroll the instant the track finishes. Only engages on wider (≥768px)
 * viewports; below that, the caller renders a native `overflow-x-auto` swipe
 * track instead, since pinned scroll-jacking is a poor fit for touch.
 */
export function useGSAPHorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || isReducedMotion()) return;

      const section = sectionRef.current;
      const track = section.querySelector("[data-horizontal-track]") as HTMLElement;
      if (!track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Distance the track needs to travel so its last card lands flush
        // with the right edge of the viewport.
        const getDistance = () => {
          const trackWidth = track.scrollWidth;
          const viewportWidth = section.clientWidth;
          return Math.max(trackWidth - viewportWidth, 0);
        };

        // Keep the pinned track clear of the sticky navbar instead of sliding
        // underneath it.
        //
        // Read from a CSS variable rather than measuring the live <header>:
        // the header used to change height as you scrolled, so measuring it
        // meant the pin's start position depended on a moving target and only
        // re-derived on refresh.
        const getNavOffset = () => readCssLengthPx("--nav-height");

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: () => `top top+=${getNavOffset()}`,
            // 1:1 pixel mapping — the horizontal travel takes exactly as
            // long, in scroll distance, as the cards need to fully pass.
            end: () => `+=${getDistance()}`,
            pin: true,
            pinSpacing: true,
            // A touch of smoothing so the handoff feels buttery rather than
            // rigidly locked to raw wheel deltas, without adding so much lag
            // it feels disconnected from the input.
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      // Late-loading images inside the track change its scrollWidth, which the
      // pin distance depends on. Coalesce every such load into ONE refresh on
      // the next frame — the previous version fired a full global refresh per
      // image, and those listeners outlived gsap.context().revert().
      const images = Array.from(track.querySelectorAll("img")).filter((img) => !img.complete);
      if (images.length === 0) return;

      let frame = 0;
      const onImageLoad = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => ScrollTrigger.refresh());
      };

      images.forEach((img) => {
        img.addEventListener("load", onImageLoad);
        img.addEventListener("error", onImageLoad);
      });

      return () => {
        cancelAnimationFrame(frame);
        images.forEach((img) => {
          img.removeEventListener("load", onImageLoad);
          img.removeEventListener("error", onImageLoad);
        });
      };
    },
    { scope: sectionRef }
  );

  return sectionRef;
}
