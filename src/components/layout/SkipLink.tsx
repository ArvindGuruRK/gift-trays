import React from "react";

/**
 * Skip-to-content link. Must be the first focusable element in the document so
 * keyboard and screen-reader users can bypass the navigation, which is
 * otherwise repeated on every route.
 */
export function SkipLink() {
  return (
    <a href="#main-content" className="ui-skip-link">
      Skip to main content
    </a>
  );
}
