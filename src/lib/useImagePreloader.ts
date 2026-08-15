"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * A resolved image to warm. Build these with `getImageProps()` so the candidate
 * the browser picks here is byte-identical to the one the real `<img>` will ask
 * for — preloading the raw `/public` path instead would miss entirely, since
 * `next/image` requests `/_next/image?url=…&w=…`.
 */
export interface PreloadEntry {
  /** Original `/public` path — used to match Resource Timing entries. */
  src: string;
  /** Fallback href (`props.src` from getImageProps). */
  href: string;
  /** `props.srcSet` — lets the browser resolve the same candidate as the <img>. */
  srcSet?: string;
  /** `props.sizes` — must match the rendering component's own `sizes`. */
  sizes?: string;
}

export interface ImagePreloadState {
  /** How many images have finished downloading. */
  loaded: number;
  /** How many are being tracked in total. */
  total: number;
  /** 0–1. Always 1 when there is nothing to track. */
  progress: number;
  /** True once every tracked image has arrived. */
  done: boolean;
}

/**
 * Warm a set of `next/image` sources in the background, and report real progress.
 *
 * ## Why this waits for `window.load`
 *
 * The obvious implementation — emit `<link rel="preload">` into the SSR'd HTML so
 * fetching starts during parse — measurably backfires. Those preloads compete with
 * the page's own JavaScript for connections, so hydration lands *later*, and since
 * the splash screen's dismissal timers only start at hydration, the splash gets
 * longer the more images you preload. Preloading all 27 pushed a ~2.4s splash to
 * ~13.5s locally; even 12 left it at ~7s. (It's worse over HTTP/1.1, which is what
 * `next start` serves, than over HTTP/2 in production — but the ordering problem is
 * real either way, and this avoids depending on the transport to save us.)
 *
 * Deferring to `window.load` means the bundle, CSS and LCP hero are already in
 * before a single gallery byte is requested. Nothing on the critical path is
 * displaced, and there is still a useful window left while the splash finishes.
 *
 * ## Why `<link>` rather than `new Image()`
 *
 * `new Image()` fetches *and decodes*. Decoding dozens of photos is real main-thread
 * work, competing with hydration all over again. `<link rel="preload" as="image">`
 * only fills the HTTP cache; decode happens later, when the real `<img>` paints.
 *
 * Progress is read from the Resource Timing buffer, so it reflects what the browser
 * genuinely fetched rather than a timer pretending to be one.
 */
export function useImagePreloader(entries: readonly PreloadEntry[]): ImagePreloadState {
  // Frozen on first render via a lazy initialiser, so a caller passing an inline
  // array can't restart the whole preload on every render.
  const [list] = useState<readonly PreloadEntry[]>(() => entries);

  const total = list.length;
  const [loaded, setLoaded] = useState(0);

  // The token identifying each image inside its optimizer URL. Matching on this
  // rather than a full URL is required: the real request is
  // `/_next/image?url=<token>&w=…`, and the width the browser settles on depends
  // on viewport and DPR, so it can't be predicted here.
  const tokens = useMemo(() => list.map((e) => encodeURIComponent(e.src)), [list]);

  useEffect(() => {
    if (total === 0) return;

    let cancelled = false;
    const outstanding = new Set(tokens);
    const links: HTMLLinkElement[] = [];
    let observer: PerformanceObserver | undefined;

    const consume = (name: string) => {
      if (cancelled || outstanding.size === 0) return;
      for (const token of outstanding) {
        if (name.includes(token)) {
          outstanding.delete(token);
          setLoaded(total - outstanding.size);
          return;
        }
      }
    };

    const start = () => {
      if (cancelled) return;

      // Count anything already fetched (e.g. an image shared with a section that
      // has since rendered), then watch for the rest.
      for (const entry of performance.getEntriesByType("resource")) consume(entry.name);

      if (typeof PerformanceObserver !== "undefined") {
        observer = new PerformanceObserver((entries) => {
          for (const entry of entries.getEntries()) consume(entry.name);
        });
        try {
          observer.observe({ type: "resource", buffered: true });
        } catch {
          observer = undefined;
        }
      }

      for (const entry of list) {
        if (!outstanding.has(encodeURIComponent(entry.src))) continue;
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.fetchPriority = "low";
        // imagesrcset/imagesizes have no IDL attributes on HTMLLinkElement in the
        // DOM typings, so they're set directly. With both present the browser
        // resolves the same srcset candidate the real <img> will request.
        if (entry.srcSet) link.setAttribute("imagesrcset", entry.srcSet);
        if (entry.sizes) link.setAttribute("imagesizes", entry.sizes);
        link.href = entry.href;
        document.head.appendChild(link);
        links.push(link);
      }
    };

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
      observer?.disconnect();
      for (const link of links) link.remove();
    };
  }, [tokens, total, list]);

  const done = total === 0 || loaded >= total;
  return {
    loaded: Math.min(loaded, total),
    total,
    progress: total === 0 ? 1 : Math.min(loaded / total, 1),
    done,
  };
}
