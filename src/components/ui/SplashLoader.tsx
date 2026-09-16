"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { motion, AnimatePresence } from "motion/react";
import { KolamCornerFlourish, LotusMotif } from "@/components/ui/Motifs";
import {
  SPLASH_VIDEO_SRC,
  getCachedSplashVideoUrl,
  hasSeenSplashThisSession,
  markSplashSeen,
  warmSplashVideoCache,
} from "@/lib/splash";

const LOADING_MESSAGES = [
  "Arranging Ceremonial Gift Trays...",
  "Selecting Traditional Sweets & Thattus...",
  "Preparing Tamil Wedding Heritage...",
  "Welcome to Seer Varisai Thattu",
];

/*
 * The splash is anchored to the video, not to the wall clock.
 *
 * Two earlier attempts both failed for the same underlying reason. Timing from
 * mount ran long, because the overlay is server-rendered and has already been
 * on screen through page load. Timing from navigation start ran *short* on a
 * slow load — the remaining time collapsed onto its floor exactly when the
 * video needed longest to start, so the platter sat frozen on frame zero.
 *
 * Anchoring to playback removes the conflict: wait for the video to actually
 * start, then hold for a fixed stretch of visible motion. On a normal load the
 * video is playing by ~700ms, so the total lands at roughly the 2.5s intended,
 * and the visitor always sees the platter turn rather than a still frame.
 */

/** How long the splash holds once the platter is actually turning. */
const PLAYBACK_DURATION = 1800;

/** Give up waiting for the video after this and run the splash anyway. */
const MAX_WAIT_FOR_VIDEO = 1200;

/**
 * Absolute backstop, measured from navigation start rather than from mount.
 *
 * Everything else here is gated on hydration, and on a slow device hydration is
 * not a formality: throttled to 6x, React mounted around eight seconds in and a
 * mount-relative backstop then added four more, leaving the splash up for
 * twelve seconds. Counting from navigation means a late mount shortens what is
 * left rather than restarting the clock.
 */
const ABSOLUTE_MAX_FROM_NAVIGATION = 4000;

/** The bar completes slightly early, so it reads as full before the fade starts. */
const BAR_COMPLETION_RATIO = 0.92;

/** Where the bar waits while the video is still getting going. */
const BAR_WAITING_WIDTH = 30;

export interface SplashLoaderProps {
  /** Forced visibility toggle — for the design-system preview. Bypasses the session gate. */
  forceShow?: boolean;
  /** How long to hold once the video is playing (default 1800ms). */
  playbackDuration?: number;
  /** Fired when the splash is done — including immediately when it is skipped. */
  onComplete?: () => void;
}

/*
 * Reading "should this splash play at all?" through useSyncExternalStore rather
 * than a lazy useState initializer.
 *
 * The overlay is server-rendered, and the answer lives in sessionStorage and a
 * media query — neither of which exists on the server. Deciding in a lazy
 * initializer made the client's first render return `null` while the server's
 * HTML contained the overlay, which is exactly the hydration mismatch React
 * reported. useSyncExternalStore is built for this: React hydrates with the
 * server snapshot, so the trees match, then immediately re-renders with the
 * client snapshot. The inline script in the root layout has already hidden the
 * overlay via CSS by that point, so nothing is ever painted.
 */
const subscribeToNothing = () => () => {};
const getSuppressedSnapshot = () =>
  hasSeenSplashThisSession() ||
  (typeof window !== "undefined" &&
    !!window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches);
const getSuppressedServerSnapshot = () => false;

/**
 * Brand splash for the homepage.
 *
 * Waits for the platter video to actually start, then holds for
 * `playbackDuration` of visible motion, so the progress bar, the rotating
 * messages and the exit fade are choreographed against playback rather than
 * against a stopwatch that may or may not line up with it.
 *
 * It plays once per session — see `@/lib/splash`.
 */
export function SplashLoader({
  forceShow = false,
  playbackDuration = PLAYBACK_DURATION,
  onComplete,
}: SplashLoaderProps) {
  const suppressed = useSyncExternalStore(
    subscribeToNothing,
    getSuppressedSnapshot,
    getSuppressedServerSnapshot
  );

  const [dismissed, setDismissed] = useState(false);
  const [messageIndex, setMessageIndex] = useState<number>(0);
  /** True once the platter is visibly turning (or we gave up waiting for it). */
  const [playing, setPlaying] = useState(false);

  /*
   * Seeded synchronously with the network URL rather than waiting on the async
   * Cache Storage lookup. The <video> therefore exists and starts fetching on
   * the very first frame — previously the whole element was withheld behind a
   * `caches.match()` round trip, which is what made the platter appear late.
   * Cloudinary serves this file `immutable, max-age=2592000`, so on a repeat
   * visit the URL is already a local disk-cache hit.
   */
  const [videoSrc, setVideoSrc] = useState<string>(SPLASH_VIDEO_SRC);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  // Release the fallback blob URL, if one was ever minted, on unmount.
  useEffect(
    () => () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    },
    []
  );

  const isVisible = forceShow || (!suppressed && !dismissed);

  const hasCompleted = useRef(false);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  const finish = useCallback(() => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    // A forced preview (design system) still reports completion so its host can
    // close it — it just does not hide itself or burn the session flag.
    if (!forceShow) {
      markSplashSeen();
      setDismissed(true);
    }
    onCompleteRef.current?.();
  }, [forceShow]);

  /** Idempotent: fired by the video's `playing` event or by the wait timeout. */
  const beginPlayback = useCallback(() => setPlaying(true), []);

  const handleCanPlay = useCallback(() => {
    void videoRef.current?.play().catch(() => {
      /* Autoplay refused — the still frame is an acceptable fallback. */
    });
  }, []);

  // Skip path: this visitor is not getting a splash (already seen it this
  // session, or prefers reduced motion), so release the homepage animations at
  // once. No setState here — `suppressed` already drives visibility.
  useEffect(() => {
    if (!suppressed || forceShow || hasCompleted.current) return;
    hasCompleted.current = true;
    markSplashSeen();
    onCompleteRef.current?.();
  }, [suppressed, forceShow]);

  // Keep a local copy for future visits. Fire and forget — it never touches
  // the element that is currently playing.
  useEffect(() => {
    if (!isVisible) return;
    warmSplashVideoCache(SPLASH_VIDEO_SRC);
  }, [isVisible]);

  // Network source failed (offline, or a connection that died). Fall back to
  // the cached copy if we have one, and do not let the splash hang either way.
  const handleVideoError = useCallback(() => {
    void getCachedSplashVideoUrl(SPLASH_VIDEO_SRC).then((url) => {
      if (!url) return;
      // Only one fallback attempt: if the cached copy fails too, leave it be
      // rather than looping error -> swap -> error.
      if (objectUrlRef.current) {
        URL.revokeObjectURL(url);
        return;
      }
      objectUrlRef.current = url;
      setVideoSrc(url);
    });
    // Whatever becomes of the video, the splash must still move on.
    beginPlayback();
  }, [beginPlayback]);

  // Stop waiting for a video that is not coming — a blocked autoplay, an
  // unsupported codec or a dead connection must not strand the splash.
  useEffect(() => {
    if (!isVisible || playing) return;
    const timer = setTimeout(beginPlayback, MAX_WAIT_FOR_VIDEO);
    return () => clearTimeout(timer);
  }, [isVisible, playing, beginPlayback]);

  // Once the platter is turning, hold for a fixed stretch of visible motion.
  useEffect(() => {
    if (!isVisible || !playing) return;
    const timer = setTimeout(finish, playbackDuration);
    return () => clearTimeout(timer);
  }, [isVisible, playing, playbackDuration, finish]);

  // Backstop, in case both of the above are somehow defeated.
  useEffect(() => {
    if (!isVisible) return;
    const elapsed = performance.now();
    const timer = setTimeout(
      finish,
      Math.max(0, ABSOLUTE_MAX_FROM_NAVIGATION - elapsed)
    );
    return () => clearTimeout(timer);
  }, [isVisible, finish]);

  // Messages advance and settle on the welcome line rather than looping.
  useEffect(() => {
    if (!isVisible) return;
    const step = Math.round(
      (MAX_WAIT_FOR_VIDEO + playbackDuration) / LOADING_MESSAGES.length
    );
    const timer = setInterval(() => {
      setMessageIndex((prev) => Math.min(prev + 1, LOADING_MESSAGES.length - 1));
    }, step);
    return () => clearInterval(timer);
  }, [isVisible, playbackDuration]);

  /*
   * The conditional lives *inside* AnimatePresence, not around it.
   *
   * Returning null when the splash ended unmounted AnimatePresence together
   * with its child, so the exit animation never had anything to play on — the
   * overlay simply blinked out of existence. Keeping the wrapper mounted and
   * removing only the child is what lets the fade actually run.
   */
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-screen"
          data-splash-root
          role="status"
          aria-label="Loading Seer Varisai Thattu"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#3E1017] via-[#6B1F2A] to-[#2D0B10] text-amber-100 overflow-hidden select-none"
        >
          {/* Ambient Radial Glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-accent/20 blur-[120px] pointer-events-none animate-pulse" />

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
              <div className="relative w-64 h-64 sm:w-[300px] sm:h-[300px] rounded-full bg-[#4A141D]/90 border-2 border-accent/60 shadow-2xl shadow-accent/30 flex items-center justify-center p-0 backdrop-blur-md overflow-hidden">
                {/*
                  Sits behind the video rather than instead of it, so the frame is
                  never empty while the first video frame decodes — and the video
                  itself is in the DOM immediately, fetching.
                */}
                <LotusMotif
                  size={80}
                  className="absolute text-accent animate-pulse"
                  aria-hidden="true"
                />
                <video
                  ref={videoRef}
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  /*
                   * The `autoPlay` attribute alone was not enough — the platter
                   * was observed sitting at currentTime 0, paused, with the data
                   * fully loaded. Calling play() on canplay is the usual belt and
                   * braces for muted autoplay; the promise rejects if a browser
                   * refuses, which is fine and must not surface as an error.
                   */
                  onCanPlay={handleCanPlay}
                  onPlaying={beginPlayback}
                  /*
                   * `playing` alone is not enough. The overlay is server-rendered
                   * with `autoPlay`, so the browser often starts the video before
                   * React has hydrated and attached this handler — the event fires
                   * into the void, and only the give-up timer ever ran, which is
                   * why the splash was overshooting by more than a second.
                   * `timeupdate` keeps firing while the video plays, so it catches
                   * a video that was already underway at hydration.
                   */
                  onTimeUpdate={beginPlayback}
                  // A codec the browser cannot decode (WebM alpha in Safari, say)
                  // must not strand the splash waiting for motion that never comes.
                  onError={handleVideoError}
                  className="relative w-full h-full object-contain pointer-events-none drop-shadow-xl scale-[1.65]"
                />
              </div>
            </div>

            {/* Eyebrow & Brand Title */}
            <div className="flex flex-col items-center gap-1.5 mb-6">
              <div className="flex items-center gap-2 text-accent-on-dark text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em]">
                <span className="w-8 h-[1px] bg-accent/40" />
                <span>HANDCRAFTED HERITAGE</span>
                <span className="w-8 h-[1px] bg-accent/40" />
              </div>

              {/*
                A <p>, not an <h1>: the hero section owns the page's only <h1>, and
                this overlay is server-rendered, so a second one shipped in the HTML
                every crawler sees.
              */}
              <p className="font-serif text-3xl sm:text-4xl font-bold tracking-wider text-accent drop-shadow-md">
                Seer Varisai Thattu
              </p>
            </div>

            {/* Progress Bar & Status Text */}
            <div className="w-full flex flex-col items-center gap-3.5">
              {/* Rotating Auspicious Loading Messages */}
              <div className="h-6 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIndex}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs sm:text-sm text-amber-200/90 font-sans tracking-wide"
                  >
                    {LOADING_MESSAGES[messageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Custom Progress Track */}
              <div className="w-72 sm:w-96 h-2.5 bg-black/40 rounded-full overflow-hidden border border-accent/30 p-[1px] relative shadow-inner">
                {/*
                  Linear, and all the way to 100%. Easing made the bar decelerate
                  near the end, which reads as stalling on a progress indicator,
                  and stopping short of full left it looking interrupted.
                */}
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: playing ? "100%" : `${BAR_WAITING_WIDTH}%` }}
                  /*
                   * If the backstop cuts the splash short the bar has not filled
                   * yet, and it would fade out visibly unfinished. An exit variant
                   * runs it home over the fade. It has to be `exit` rather than a
                   * prop change: AnimatePresence renders the previous snapshot of
                   * a child that is leaving, so new props never reach it.
                   */
                  exit={{ width: "100%" }}
                  transition={{
                    duration:
                      (playing ? playbackDuration * BAR_COMPLETION_RATIO : MAX_WAIT_FOR_VIDEO) /
                      1000,
                    ease: "linear",
                  }}
                  className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-300 rounded-full shadow-[0_0_12px_rgba(234,179,8,0.6)] relative"
                >
                  {/* Shimmer leading edge */}
                  <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/80 blur-[2px] rounded-full" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
