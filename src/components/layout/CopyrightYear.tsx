"use client";

import React from "react";

/**
 * Renders the current year.
 *
 * The Footer is a Server Component, so a bare `new Date().getFullYear()` there
 * is evaluated when the page is built and frozen into the static HTML — the
 * copyright would silently go stale on 1 January until the next deploy.
 *
 * As a Client Component this re-evaluates in the browser. `suppressHydrationWarning`
 * covers the one case where they legitimately differ: a build from last year
 * being served this year, which is exactly the situation this exists to fix.
 */
export function CopyrightYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
