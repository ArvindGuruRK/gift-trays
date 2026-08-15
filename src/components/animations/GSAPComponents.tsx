"use client";

import React, { ReactNode } from "react";
import {
  useGSAPHeroSequence,
  useGSAPScrollReveal,
  useGSAPTextReveal,
  useGSAPImageReveal,
  useGSAPParallax,
  useGSAPHorizontalScroll,
  UseGSAPHeroOptions,
  UseGSAPScrollRevealOptions,
  UseGSAPTextRevealOptions,
  UseGSAPImageRevealOptions,
  UseGSAPParallaxOptions,
} from "@/lib/gsap/hooks";

// ─── 1. GSAP HERO INTRO COMPONENT ───────────────────────────────────────────
interface GSAPHeroIntroProps extends UseGSAPHeroOptions {
  children: ReactNode;
  className?: string;
}

export function GSAPHeroIntro({ children, className = "", delay, onComplete, isSplashActive }: GSAPHeroIntroProps) {
  const containerRef = useGSAPHeroSequence({ delay, onComplete, isSplashActive });
  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

// ─── 2. GSAP SCROLL REVEAL COMPONENT ───────────────────────────────────────
interface GSAPScrollRevealProps extends UseGSAPScrollRevealOptions {
  children: ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function GSAPScrollReveal({
  children,
  className = "",
  as: Component = "div",
  type = "fadeUp",
  start,
  duration,
  delay,
  stagger,
  scrub,
  once,
}: GSAPScrollRevealProps) {
  const containerRef = useGSAPScrollReveal({
    type,
    start,
    duration,
    delay,
    stagger,
    scrub,
    once,
  });

  return (
    // @ts-ignore dynamic tag
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  );
}

// ─── 3. GSAP TEXT REVEAL COMPONENT ─────────────────────────────────────────
interface GSAPTextRevealProps extends UseGSAPTextRevealOptions {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div";
}

export function GSAPTextReveal({
  children,
  className = "",
  as: Component = "div",
  stagger,
  duration,
  start,
}: GSAPTextRevealProps) {
  const textRef = useGSAPTextReveal({ stagger, duration, start });

  return (
    // @ts-ignore dynamic tag
    <Component ref={textRef} className={className}>
      {children}
    </Component>
  );
}

// ─── 4. GSAP IMAGE REVEAL COMPONENT ────────────────────────────────────────
interface GSAPImageRevealProps extends UseGSAPImageRevealOptions {
  children: ReactNode;
  className?: string;
}

export function GSAPImageReveal({
  children,
  className = "",
  direction = "up",
  duration,
  start,
  isSplashActive,
}: GSAPImageRevealProps) {
  const containerRef = useGSAPImageReveal({ direction, duration, start, isSplashActive });

  return (
    <div
      ref={containerRef}
      data-gsap-reveal={direction}
      className={`relative overflow-hidden rounded-xl ${className}`}
    >
      {children}
    </div>
  );
}

// ─── 5. GSAP PARALLAX COMPONENT ────────────────────────────────────────────
interface GSAPParallaxProps extends UseGSAPParallaxOptions {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function GSAPParallax({
  children,
  className = "",
  containerClassName = "",
  speed = -0.2,
  start,
  end,
}: GSAPParallaxProps) {
  const elementRef = useGSAPParallax({ speed, start, end });

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <div ref={elementRef} className={`will-change-transform ${className}`}>
        {children}
      </div>
    </div>
  );
}

// ─── 6. GSAP HORIZONTAL SCROLL COMPONENT ──────────────────────────────────
interface GSAPHorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export function GSAPHorizontalScroll({ children, className = "" }: GSAPHorizontalScrollProps) {
  // NOTE: this outer element is the GSAP pin trigger — it must not sit under
  // an `overflow-hidden`/`overflow-scroll` ancestor, or the pin can misbehave
  // (clip, jump, or fail to release cleanly). Clipping happens one level
  // down instead, on the scroll wrapper below.
  const sectionRef = useGSAPHorizontalScroll();

  return (
    <div ref={sectionRef} className={`relative w-full ${className}`}>
      {/*
        Desktop/tablet (≥768px): GSAP pins the section above and drives this
        track via transform, so it stays clipped + non-scrollable here.
        Mobile (<768px): the pin never engages, so this becomes a plain
        native horizontal swipe track with snap points instead.
      */}
      <div className="w-full overflow-x-auto md:overflow-hidden no-scrollbar overscroll-x-contain [-webkit-overflow-scrolling:touch]">
        <div
          data-horizontal-track
          className="flex items-stretch gap-8 w-max px-6 sm:px-12 py-10 will-change-transform snap-x snap-mandatory md:snap-none"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
