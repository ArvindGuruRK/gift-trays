import type { Metadata } from "next";
import { BUSINESS, absoluteUrl, formattedAddress, resolvedSiteUrl } from "@/lib/business";

/**
 * Per-route metadata. Every page gets its own title and description — before
 * this, only the root layout had one, so every route shared a single title.
 */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${BUSINESS.displayName}`,
      description,
      url,
      siteName: BUSINESS.displayName,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${BUSINESS.displayName}`,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/**
 * LocalBusiness structured data. This is the machine-readable half of the
 * "add business details" requirement — it is what Google reads for local
 * search, so it must agree exactly with what the footer and contact page show.
 *
 * No aggregateRating: there are no genuine reviews yet, and marking up ratings
 * you don't have is precisely the misrepresentation the fake testimonials were.
 */
export function localBusinessJsonLd() {
  const a = BUSINESS.address;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#business"),
    name: BUSINESS.displayName,
    legalName: BUSINESS.legalName.startsWith("TODO") ? undefined : BUSINESS.legalName,
    description:
      "Custom Seer Varisai Thattu ceremonial gift tray arrangements for weddings, engagements, seemantham and housewarming ceremonies in Chennai.",
    url: resolvedSiteUrl(),
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email.startsWith("TODO") ? undefined : BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${a.line1}, ${a.locality}`,
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.postalCode,
      addressCountry: a.countryCode,
    },
    areaServed: BUSINESS.serviceAreas.map((name) => ({ "@type": "Place", name })),
    priceRange: "₹₹",
    knowsLanguage: ["en", "ta"],
  };
}

/** Breadcrumb trail for interior pages. */
export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const ADDRESS_ONE_LINE = formattedAddress();
