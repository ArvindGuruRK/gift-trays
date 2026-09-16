import React from "react";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";
import { COLLECTIONS_DATA } from "@/lib/collections";
import { CollectionsPageClient } from "./CollectionsPageClient";

export const metadata: Metadata = pageMetadata({
  title: "Collections",
  description: `${COLLECTIONS_DATA.length} Seer Varisai tray collections by ${BUSINESS.displayName} — wedding, engagement, seemantham, housewarming and custom theme arrangements in ${BUSINESS.address.city}.`,
  path: "/collections",
});

/**
 * /collections — the catalogue that used to live on the homepage.
 *
 * A Server Component so the page can own its metadata; the filterable grid
 * and enquiry modal are interactive and live in the client component beside
 * it, the same split /gallery uses.
 */
export default function CollectionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
        ])}
      />

      <PageShell>
        <CollectionsPageClient />
      </PageShell>
    </>
  );
}
