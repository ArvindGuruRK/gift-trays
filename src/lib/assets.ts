/**
 * Shared asset paths for files that need to be referenced from more than one
 * place — most importantly, anything the root layout has to emit a preload
 * hint for while a client component does the actual rendering.
 *
 * Kept free of the "use client" directive so server components can import it
 * without pulling a client module into their graph.
 */

/** Rotating brass platter shown inside the splash screen's circular frame. */
export const SPLASH_VIDEO_SRC =
  "/lottie/Ornate_brass_platter_rotating_202608112357-Picsart-BackgroundRemover.webm";
