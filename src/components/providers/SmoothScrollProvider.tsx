"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const [reducedMotion, setReducedMotion] = useState(false);

  // Tracked in state (not read inline) so a preference change at runtime is
  // actually picked up, and so the Lenis options below can react to it.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    // The ticker is registered UNCONDITIONALLY, including under reduced motion.
    // Bailing out here while <ReactLenis> stayed mounted with autoRaf:false left
    // Lenis intercepting wheel input with nothing ever advancing it — the page
    // simply could not be scrolled. Reduced motion is handled by turning
    // smoothWheel off below, which passes input through to native scrolling.
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
    // This is the single refresh authority for the page. Individual hooks must
    // not call ScrollTrigger.refresh() themselves — several used to, and the
    // overlapping global re-measures were a jank source of their own.
    // Everything is coalesced into at most one refresh per frame.
    let cancelled = false;
    let frame = 0;
    const refresh = () => {
      if (cancelled || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!cancelled) ScrollTrigger.refresh();
      });
    };

    document.fonts?.ready?.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      gsap.ticker.remove(update);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        // `lerp` rather than `duration` + easing. The old exponential easing over
        // 1.2s produced a long floaty tail that reads as *lag*, not smoothness —
        // the scroll kept coasting well after the wheel stopped. A lerp tracks
        // input far more closely while still smoothing it. (Lenis ignores
        // duration/easing entirely when lerp is set, so they're removed.)
        lerp: 0.1,
        orientation: "vertical",
        gestureOrientation: "vertical",
        // Disabled under reduced motion so wheel input falls through to native
        // scrolling instead of being intercepted.
        smoothWheel: !reducedMotion,
        wheelMultiplier: 1,
        // Touch is left on native scrolling — it's already GPU-driven and
        // momentum-correct, and syncing it costs frames for no benefit.
        syncTouch: false,
        touchMultiplier: 1,
        autoRaf: false,
      }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}

