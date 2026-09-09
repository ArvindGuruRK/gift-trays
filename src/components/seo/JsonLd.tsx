import React from "react";

/**
 * Renders a JSON-LD structured-data block.
 *
 * `dangerouslySetInnerHTML` is required — React escapes text children, which
 * would corrupt the JSON. Safe here because every caller passes our own static
 * data from `@/lib/seo`; never pass user input through this.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
