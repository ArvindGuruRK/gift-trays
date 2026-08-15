"use client";

import React, { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Viewport resizes on mobile (address bar show/hide while scrolling) fire
  // a storm of resize events that would otherwise trigger a full recalculation
  // mid-scroll — a common source of jank on phones.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

function ScrollTriggerSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Every ScrollTrigger start/end position is computed from the DOM's
    // current layout at mount. Self-hosted webfonts still swap in a beat
    // after first paint and images load in below the fold, both of which
    // reflow the page and quietly invalidate those positions — the usual
    // cause of reveals/pins feeling off (too early, too late, or clipped)
    // right after a fresh reload. Re-measuring once things actually settle
    // fixes that without touching any individual animation.
    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    document.fonts?.ready?.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);

    return () => {
      cancelled = true;
      gsap.ticker.remove(update);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        autoRaf: false,
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}

