"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { KolamCornerFlourish } from "@/components/ui/Motifs";
import { SPLASH_VIDEO_SRC } from "@/lib/assets";
import { cn } from "@/lib/utils";

/**
 * Status lines, chosen by how far the real preload has actually got rather than
 * on a timer. Each one names something the visitor can verify is happening, so
 * the wait reads as progress instead of decoration.
 */
function statusFor(progress: number, loaded: number, total: number): string {
  if (total === 0) return "Preparing your ceremonial tray showcase...";
  if (progress >= 1) return "Welcome to Seer Varisai Thattu";
  if (progress >= 0.75) return "Almost ready — arranging the final trays...";
  if (progress > 0) return `Loading real celebration photos... ${loaded} of ${total}`;
  return "Preparing your ceremonial tray showcase...";
}

/**
 * Hard ceiling on the whole splash, measured from navigation start.
 *
 * Waiting for a full gallery preload and guaranteeing a ~3s splash are in direct
 * conflict on a slow connection, so this is the tiebreaker: the preload gets the
 * 3s window plus a short grace, and after that the splash leaves regardless.
 * Anything still in flight keeps downloading behind the real page — the images
 * are lazy with blur placeholders, so a straggler degrades gracefully instead of
 * holding the visitor on a loading screen.
 */
const MAX_WAIT_MS = 4500;

/**
 * Always keep the splash up for at least this long *after* hydration, even when
 * the minimum has already elapsed during load. Cutting away the instant React
 * catches up reads as a glitch rather than a transition, and it gives the
 * progress bar a beat to visibly reach 100%.
 */
const POST_HYDRATION_FLOOR_MS = 260;

/** Length of the CSS lift-off fade. Must match `.ui-splash-lift` in globals.css. */
const SPLASH_FADE_MS = 400;

/**
 * Grace period on the JS fallback timer so it can't pre-empt the CSS lift-off.
 * The CSS clock starts at the element's first paint, the JS clock at navigation
 * start, so the fallback has to allow for that offset.
 */
const SPLASH_FALLBACK_MARGIN_MS = 1200;

export interface SplashLoaderProps {
  /** Forced visibility toggle — keeps the splash on screen and skips auto-dismiss entirely (used for previews) */
  forceShow?: boolean;
  /** Minimum time the brand animation stays on screen, in ms, counted from navigation start. */
  minDuration?: number;
  /**
   * External signal that the real page assets have finished loading — driven by
   * actual load events, not a guessed URL, since Next's image optimizer serves a
   * different path than the raw file on disk (see useImagePreloader).
   * Omit if nothing upstream tracks load state; the splash then only waits on minDuration.
   */
  assetsReady?: boolean;
  /** Real preload progress, 0–1. Drives the bar; falls back to a time-based sweep when omitted. */
  progress?: number;
  /** Number of assets settled so far — shown in the status line. */
  loadedCount?: number;
  /** Total assets being preloaded. */
  totalCount?: number;
  /** Callback fired when splash animation completes (or immediately, if the splash is skipped) */
  onComplete?: () => void;
}

export function SplashLoader({
  forceShow = false,
  minDuration = 3000,
  assetsReady,
  progress,
  loadedCount = 0,
  totalCount = 0,
  onComplete,
}: SplashLoaderProps) {
  // Plays on every mount — i.e. every full page load/refresh. No once-per-session gate:
  // this is a deliberate brand moment the visitor should see each time, not just on first visit.
  const [safetyElapsed, setSafetyElapsed] = useState<boolean>(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState<boolean>(false);
  const [liftFinished, setLiftFinished] = useState<boolean>(false);

  // Visibility is DERIVED, not stored. Holding it in state meant the dismissal
  // effect had to call setState synchronously in its body, which triggers a
  // cascading re-render of the whole splash at exactly the moment the page is
  // trying to hand over to the real content.
  // `assetsReady` undefined (nothing upstream wired up) means there's nothing to wait on.
  const effectiveAssetsReady = (assetsReady ?? true) || safetyElapsed;

  // The CSS lift-off is the authority on when the splash leaves the screen, and
  // React unmounts in response to it finishing.
  //
  // These two used to race: the CSS fade runs from the element's first paint
  // while React's timer runs from navigation start, so React could remove the
  // node partway through the fade — cutting the splash off abruptly instead of
  // letting it fade. Following `animationend` keeps them in lockstep.
  // `minTimeElapsed` remains as a fallback for when no animation runs at all.
  const readyToDismiss = effectiveAssetsReady && (liftFinished || minTimeElapsed);
  const showSplash = forceShow || !readyToDismiss;

  // What the bar actually shows.
  //
  // Real preload progress when a caller supplies it, but held just short of full
  // until the page is genuinely ready — a bar that sits at 100% while the splash
  // is still up is the exact thing that makes a loader feel like it's lying.
  const hasRealProgress = typeof progress === "number" && totalCount > 0;
  const barValue = readyToDismiss
    ? 1
    : hasRealProgress
      ? Math.min(progress, 0.96)
      : 0.9;

  const statusText = readyToDismiss
    ? "Welcome to Seer Varisai Thattu"
    : statusFor(hasRealProgress ? progress : 0, loadedCount, totalCount);

  // Safety cap — if something upstream is tracking real asset load state via `assetsReady`
  // and it never flips true (stalled network, failed request), never trap the visitor
  // behind the splash forever.
  useEffect(() => {
    // Only meaningful when something upstream is actually gating on assets.
    // With no `assetsReady`, dismissal is purely time-based and this timer would
    // just cost an extra render for nothing.
    if (!showSplash || assetsReady === undefined) return;
    // Also counted from navigation start, for the same reason as the floor below.
    const safetyTimer = setTimeout(
      () => setSafetyElapsed(true),
      Math.max(0, MAX_WAIT_MS - performance.now())
    );
    return () => clearTimeout(safetyTimer);
  }, [showSplash, assetsReady]);

  // Minimum on-screen floor (the brand moment shouldn't flash by instantly when
  // everything happens to come straight from browser cache).
  useEffect(() => {
    if (!showSplash) return;

    // The floor is measured from NAVIGATION START, not from this effect.
    //
    // This markup is server-rendered, so the visitor is already looking at the
    // splash from first paint — but effects don't run until React has hydrated
    // the whole page, which on a client-heavy landing page is comfortably over a
    // second. Starting a fresh `minDuration` timer here therefore charged the
    // visitor twice: once for hydration, then again for the full floor on top.
    // Counting elapsed time instead makes `minDuration` mean what it says —
    // "the splash is visible for at least this long, total".
    // Fallback only. The CSS lift-off normally finishes first and drives the
    // unmount; this exists for the cases where no animationend ever arrives
    // (animations disabled, the element never painted, an unsupported browser).
    // The extra margin keeps it from beating the animation in a race — the CSS
    // clock starts at the element's first paint, which is always later than
    // navigation start, so a bare `minDuration` here would sometimes win.
    const elapsed = performance.now();
    const remaining = Math.max(
      POST_HYDRATION_FLOOR_MS,
      minDuration + SPLASH_FALLBACK_MARGIN_MS - elapsed
    );

    const minTimer = setTimeout(() => setMinTimeElapsed(true), remaining);
    return () => clearTimeout(minTimer);
  }, [showSplash, minDuration]);

  // Notify once, the moment the splash stops being shown.
  //
  // There is deliberately no extra hold before this. The exit transition below
  // already overlaps the reveal, so an added delay is dead time the visitor just
  // waits through — it was the single largest contributor to this feeling sluggish.
  const hasCompleted = useRef(false);
  useEffect(() => {
    if (showSplash || hasCompleted.current) return;
    hasCompleted.current = true;
    onComplete?.();
  }, [showSplash, onComplete]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          // No `exit` animation: the CSS auto-lift below has already faded this
          // out by the time React gets around to unmounting it, and a second
          // competing fade here would just re-show it briefly.
          transition={{ duration: 0 }}
          // `ui-splash-lift` runs off first paint rather than off hydration, so
          // the splash clears at exactly `minDuration` regardless of how long the
          // client bundle takes to boot. Skipped when `forceShow` is set, which
          // is the design-system preview holding it open on purpose.
          className={cn(
            "fixed inset-0 z-9999 flex flex-col items-center justify-center bg-linear-to-b from-[#3E1017] via-deep-maroon to-[#2D0B10] text-amber-100 overflow-hidden select-none",
            !forceShow && "ui-splash-lift"
          )}
          // `minDuration` is the total time the splash owns the screen, so the
          // fade has to start early enough to *finish* on that mark rather than
          // begin on it.
          style={
            {
              "--splash-delay": `${Math.max(0, minDuration - SPLASH_FADE_MS)}ms`,
            } as React.CSSProperties
          }
          // The CSS lift-off finishing is what actually retires the splash;
          // React unmounts in response rather than on its own schedule.
          //
          // Matched by element rather than by `animationName`, which a CSS
          // minifier is free to rewrite. Nothing else can trigger this: the only
          // other animations in here (the ring spin, the ambient pulse) are
          // infinite, so they never emit animationend.
          onAnimationEnd={(event) => {
            if (event.target === event.currentTarget) setLiftFinished(true);
          }}
        >
          {/* Ambient Radial Glow */}
          <div className="absolute w-125 h-125 rounded-full bg-accent/20 blur-[120px] pointer-events-none animate-pulse" />

          {/* Traditional Background Pattern Overlay */}
          <div className="absolute inset-0 bg-kolam-pattern opacity-10 pointer-events-none" />

          {/* 4 Corner Kolam Flourishes */}
          <KolamCornerFlourish
            size={160}
            className="absolute top-0 left-0 opacity-40 pointer-events-none"
          />
          <KolamCornerFlourish
            size={160}
            className="absolute top-0 right-0 opacity-40 pointer-events-none scale-x-[-1]"
          />
          <KolamCornerFlourish
            size={160}
            className="absolute bottom-0 left-0 opacity-40 pointer-events-none scale-y-[-1]"
          />
          <KolamCornerFlourish
            size={160}
            className="absolute bottom-0 right-0 opacity-40 pointer-events-none rotate-180"
          />

          {/* Main Center Content Box */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg w-full">
            {/* Rotating Brass Platter Video inside Circular Ornamental Frame */}
            <div className="relative mb-8">
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-4 rounded-full border border-accent/30 animate-[spin_20s_linear_infinite]" />
              <div className="absolute -inset-2 rounded-full border border-dashed border-accent/50" />

              {/* Inner Circular Base */}
              <div className="w-64 h-64 sm:w-75 sm:h-75 rounded-full bg-[#4A141D]/90 border-2 border-accent/60 shadow-2xl shadow-accent/30 flex items-center justify-center p-0 backdrop-blur-md overflow-hidden">
                {/* Matched by a <link rel="preload" as="video"> in the root layout —
                    without it this can't even start downloading until the client
                    bundle has parsed and hydrated, which is most of the splash. */}
                <video
                  src={SPLASH_VIDEO_SRC}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain pointer-events-none drop-shadow-xl scale-[1.65]"
                />
              </div>
            </div>

            {/* Eyebrow & Brand Title */}
            <div className="flex flex-col items-center gap-1.5 mb-6">
              <div className="flex items-center gap-2 text-accent/80 text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em]">
                <span className="w-8 h-px bg-accent/40" />
                <span>HANDCRAFTED HERITAGE</span>
                <span className="w-8 h-px bg-accent/40" />
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-wider text-accent drop-shadow-md">
                Seer Varisai Thattu
              </h1>
            </div>

            {/* Progress Bar & Status Text */}
            <div className="w-full flex flex-col items-center gap-3.5">
              {/* Status line — reports what is genuinely loading, and how far along */}
              <div className="h-6 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={statusText}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-xs sm:text-sm text-amber-200/90 font-sans tracking-wide tabular-nums"
                  >
                    {statusText}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Custom Progress Track */}
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(barValue * 100)}
                aria-label="Loading gallery"
                className="w-72 sm:w-96 h-2.5 bg-black/40 rounded-full overflow-hidden border border-accent/30 p-px relative shadow-inner"
              >
                <motion.div
                  // Driven by scaleX rather than width. Animating `width` is a
                  // layout+paint animation on every frame, running for the whole
                  // splash — precisely while fonts are swapping in and GSAP is
                  // measuring trigger positions. scaleX is composited instead.
                  initial={{ scaleX: 0 }}
                  // Tracks the REAL preload count when one is wired up, so the bar
                  // means something; it only reaches a full 100% once the page is
                  // genuinely ready to be shown.
                  animate={{ scaleX: barValue }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{ transformOrigin: "left center" }}
                  className="h-full w-full bg-linear-to-r from-amber-600 via-amber-400 to-yellow-300 rounded-full shadow-[0_0_12px_rgba(234,179,8,0.6)] relative"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
