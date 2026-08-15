"use client";

import React, { ReactNode } from "react";
import {
  useGSAPHeroSequence,
  useGSAPScrollReveal,
  useGSAPTextReveal,
  useGSAPImageReveal,
  useGSAPParallax,
  useGSAPHorizontalScroll,
  useGSAPPageEmerge,
  UseGSAPHeroOptions,
  UseGSAPScrollRevealOptions,
  UseGSAPTextRevealOptions,
  UseGSAPImageRevealOptions,
  UseGSAPParallaxOptions,
  UseGSAPPageEmergeOptions,
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
  pin?: boolean;
  start?: string;
  speed?: number;
  holdRatio?: number;
}

export function GSAPHorizontalScroll({
  children,
  className = "",
  pin = true,
  start = "top top",
  speed = 1,
  holdRatio = 0.08,
}: GSAPHorizontalScrollProps) {
  const sectionRef = useGSAPHorizontalScroll({ pin, start, speed, holdRatio });

  return (
    <div
      ref={sectionRef}
      // svh, not vh: the mobile URL bar must not push pinned content off screen.
      className={`relative w-full overflow-hidden ${pin ? "h-svh flex items-center" : ""} ${className}`}
    >
      {/* This wrapper clips the track, so its width is what the hook measures
          against to work out how far the track has to travel. */}
      <div className="w-full overflow-hidden">
        <div
          data-horizontal-track
          className="flex items-center gap-8 w-max px-6 sm:px-12 py-10 will-change-transform"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ─── 7. GSAP PAGE EMERGE COMPONENT ─────────────────────────────────────────
interface GSAPPageEmergeProps extends UseGSAPPageEmergeOptions {
  children: ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function GSAPPageEmerge({
  children,
  className = "",
  as: Component = "div",
  start,
  end,
  distance,
  parallaxGap,
}: GSAPPageEmergeProps) {
  const containerRef = useGSAPPageEmerge({ start, end, distance, parallaxGap });

  return (
    // @ts-ignore dynamic tag
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  );
}
