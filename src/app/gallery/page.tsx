import React from "react";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { BUSINESS, absoluteUrl } from "@/lib/business";
import { GALLERY_ITEMS } from "@/lib/gallery";
import { GalleryPageClient } from "./GalleryPageClient";

export const metadata: Metadata = pageMetadata({
  title: "Gallery",
  description: `${GALLERY_ITEMS.length} photographs of Seer Varisai Thattu ceremonial gift tray arrangements by ${BUSINESS.displayName} — weddings, engagements, seemantham and housewarming ceremonies in ${BUSINESS.address.city}.`,
  path: "/gallery",
});

/**
 * /gallery — the complete photo library.
 *
 * A Server Component so the page can own its metadata; the grid, filters and
 * lightbox are interactive and live in the client component beside it.
 */
export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />

      {/*
        ImageGallery structured data. Every entry carries the same caption the
        page shows, so what a search engine is told about a photograph matches
        what a visitor reads under it.
      */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          name: `${BUSINESS.displayName} — Gallery of Completed Arrangements`,
          description: `Photographs of ceremonial gift tray arrangements prepared by ${BUSINESS.displayName}.`,
          url: absoluteUrl("/gallery"),
          numberOfItems: GALLERY_ITEMS.length,
          associatedMedia: GALLERY_ITEMS.map((item) => ({
            "@type": "ImageObject",
            contentUrl: absoluteUrl(item.imageUrl),
            name: item.title,
            caption: item.location,
          })),
        }}
      />

      <PageShell>
        <GalleryPageClient />
      </PageShell>
    </>
  );
}
