import React from "react";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { HomePageClient } from "./HomePageClient";
import { pageMetadata, localBusinessJsonLd } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = pageMetadata({
  title: "Seer Varisai Thattu — Ceremonial Gift Trays in Chennai",
  description: `Custom Seer Varisai Thattu ceremonial gift trays for weddings, engagements, seemantham and housewarming ceremonies in ${BUSINESS.address.city}. Arranged to your requirements and delivered to your venue.`,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />
      <PageShell className="flex-1 overflow-x-clip">
        <HomePageClient />
      </PageShell>
    </>
  );
}
