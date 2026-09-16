"use client";

import type React from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

/**
 * Click handler for links that point at a section of the homepage, e.g.
 * "/#collections" or "/#enquiry-form".
 *
 * A plain `<Link href="/#collections">` doesn't get you there: Lenis owns the
 * scroll position on every page, so the browser's native jump-to-anchor gets
 * silently undone the moment Lenis takes over. From the homepage itself that
 * makes the link look like it does nothing; from another page it makes the
 * anchor look like a route that doesn't exist.
 *
 * On the homepage, this drives the scroll through Lenis directly and cancels
 * the navigation. From any other page it leaves the click alone — the link
 * navigates home as normal, and the effect in HomePageClient finishes the
 * scroll once the section exists in the DOM.
 */
export function useHomeAnchorClick() {
  const pathname = usePathname();
  const lenis = useLenis();

  return (href: string, event: React.MouseEvent) => {
    if (!href.startsWith("/#") || pathname !== "/") return;
    event.preventDefault();

    const target = `#${href.slice(2)}`;
    if (lenis) {
      lenis.scrollTo(target, { offset: -96, duration: 1.2 });
    } else {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
  };
}
