/**
 * Splash-screen session gate and media caching.
 *
 * Two problems this solves:
 *
 * 1. The splash used to replay every time you came back to `/` from Contact or
 *    About. A brand intro is a *first impression*, not a toll booth — so it
 *    plays once per browser session and is skipped for the rest of it. This is
 *    the pattern almost every SaaS onboarding/brand splash uses: a
 *    `sessionStorage` flag, so a fresh tab tomorrow sees it again but moving
 *    around the site today does not.
 *
 * 2. The splash video is a ~920 KB cross-origin `.webm`. On a repeat visit we
 *    read it out of the Cache Storage API instead of the network, so the
 *    platter is on screen immediately (and works offline).
 */

/** `sessionStorage` key. Must stay in sync with the inline script in `app/layout.tsx`. */
export const SPLASH_SESSION_KEY = "svt.splash.seen";

/** Attribute the pre-paint inline script sets on `<html>`. */
export const SPLASH_SEEN_ATTR = "data-splash";

/** Cache Storage bucket holding the splash video. Bump to invalidate. */
const MEDIA_CACHE = "svt-media-v2";

/*
 * Delivered through a Cloudinary transform rather than as the original upload.
 *
 * Sizing this correctly matters more than it looks. The circle is 300px, but the
 * video inside it carries `scale-[1.65]`, so the element is drawn at 488 CSS px
 * and clipped by the circle — and that is before device pixel ratio. Measured:
 *
 *   desktop @2x   488 css ->  977 device px
 *   mobile  @3x   422 css -> 1267 device px
 *
 * An earlier attempt at `w_480` sized against the 300px container and ignored
 * both the transform and DPR, so the video was upscaled 2-3x on every retina
 * screen and looked soft. Against the original, resampled to the size it is
 * actually drawn at, that cost a mean error of 4.89/255; `w_1280` costs 1.18,
 * which is re-encode noise.
 *
 * So: keep the source resolution, take the ~28% the recompression gives (939 KB
 * -> 678 KB), and stop there. Frame rate is unaffected either way (~29fps), and
 * the alpha channel — load-bearing, since the platter is composited over the
 * maroon circle — is verified to survive.
 */
const CLOUDINARY_BASE = "https://res.cloudinary.com/khenir6q/video/upload";
const SPLASH_VIDEO_TRANSFORM = "q_auto,w_1280";
const SPLASH_VIDEO_FILE =
  "v1786829708/Ornate_brass_platter_rotating_202608112357-Picsart-BackgroundRemover.webm";

export const SPLASH_VIDEO_SRC = `${CLOUDINARY_BASE}/${SPLASH_VIDEO_TRANSFORM}/${SPLASH_VIDEO_FILE}`;

/**
 * Has the splash already played this session?
 *
 * Reads the same key as the inline script in the root layout, so React's
 * initial state always agrees with the DOM the script produced — no hydration
 * mismatch, no flash. `sessionStorage` throws in some privacy modes, so every
 * access is guarded.
 */
export function hasSeenSplashThisSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(SPLASH_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function markSplashSeen(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
  } catch {
    /* Private mode / storage disabled — the splash just plays again. */
  }
  document.documentElement.setAttribute(SPLASH_SEEN_ATTR, "seen");
}

/** Test/debug helper: forget the flag so the next load replays the splash. */
export function resetSplashSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(SPLASH_SESSION_KEY);
  } catch {
    /* ignore */
  }
  document.documentElement.removeAttribute(SPLASH_SEEN_ATTR);
}

export interface ResolvedMedia {
  /** What to hand to the `<video>` element. */
  url: string;
  /** True when `url` is a blob: URL that the caller must revoke on unmount. */
  isObjectUrl: boolean;
}

/**
 * Memoized lookup of the cached video bytes, shared by every caller on the page.
 *
 * Deliberately resolves to a `Blob` rather than to a finished object URL, so
 * each caller can mint — and revoke — its own URL. Sharing one URL would mean
 * the first caller to unmount revokes it while another is still displaying it.
 */
let cachedBlob: Promise<Blob | null> | null = null;

async function loadCachedBlob(src: string): Promise<Blob | null> {
  if (typeof window === "undefined" || !("caches" in window)) return null;

  try {
    const cache = await caches.open(MEDIA_CACHE);
    const hit = await cache.match(src);

    // Drop any previous variant of the video so a changed transform does not
    // leave the old, heavier file sitting in the visitor's cache forever.
    for (const key of await cache.keys()) {
      if (key.url !== src) void cache.delete(key);
    }

    if (hit) return await hit.blob();

    // Miss — the <video> streams from the network now; populate for next time.
    void cache.add(src).catch(() => {
      /* Offline or CORS refused: the direct URL still works. */
    });
    return null;
  } catch {
    return null;
  }
}

/**
 * Store a copy of the splash video locally for future visits. Safe to call
 * repeatedly; the work happens once per page load.
 *
 * Cache Storage needs a secure context (https, or localhost) and is absent in
 * some embedded browsers. Every failure path is silent — this is an
 * optimisation, and the plain network URL always works.
 *
 * Note: `localStorage`/`sessionStorage` are deliberately *not* used for this.
 * They only hold strings, so the video would have to be base64'd — inflating it
 * by a third — against a ~5 MB synchronous, main-thread-blocking quota. Cache
 * Storage is the API built for binary media: async, far larger, and it stores
 * the real `Response`.
 */
export function warmSplashVideoCache(src: string = SPLASH_VIDEO_SRC): void {
  cachedBlob ??= loadCachedBlob(src);
  void cachedBlob.catch(() => null);
}

/**
 * The locally cached copy as a `blob:` URL, or null if we do not have it.
 *
 * Used only as a *fallback*, when the network source fails — offline, or a
 * connection that dies mid-visit. It is deliberately never swapped in over a
 * source that is already working: doing so reloads the element and restarts
 * playback, which was observed restarting the platter ten seconds into a slow
 * load. The browser's own HTTP cache already makes the normal repeat visit
 * fast, so there is nothing to gain by pre-empting it.
 *
 * The caller owns the returned URL and must revoke it.
 */
export async function getCachedSplashVideoUrl(
  src: string = SPLASH_VIDEO_SRC
): Promise<string | null> {
  cachedBlob ??= loadCachedBlob(src);
  const blob = await cachedBlob;
  return blob ? URL.createObjectURL(blob) : null;
}
