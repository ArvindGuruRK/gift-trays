import React from "react";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";
import { OccasionsPageClient } from "./OccasionsPageClient";

export const metadata: Metadata = pageMetadata({
  title: "Occasions",
  description: `Recommended Seer Varisai tray counts and contents for weddings, engagements, seemantham, housewarming and custom occasions, by ${BUSINESS.displayName} in ${BUSINESS.address.city}.`,
  path: "/occasions",
});

/**
 * /occasions — the full, detailed version of the homepage's Occasions
 * section, the same relationship /gallery has to its homepage preview.
 *
 * A Server Component so the page can own its metadata; the scroll-reveal
 * content lives in the client component beside it.
 */
export default function OccasionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Occasions", path: "/occasions" },
        ])}
      />

      <PageShell>
        <OccasionsPageClient />
      </PageShell>
    </>
  );
}
