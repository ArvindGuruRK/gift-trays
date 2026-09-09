import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { pageMetadata } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = pageMetadata({
  title: "Cookie Policy",
  description: `${BUSINESS.displayName} does not use cookies or tracking on this website. Here is exactly what that means.`,
  path: "/cookie-policy",
});

const LAST_UPDATED = "2026-09-09";

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      intro="This website does not use cookies. This page explains what that means and why you are not being asked to accept anything."
      lastUpdated={LAST_UPDATED}
    >
      <h2>We do not use cookies</h2>
      <p>
        <strong>This website sets no cookies of any kind.</strong> Not essential
        ones, not analytics ones, not advertising ones. That is why you have not
        been shown a cookie banner — there is nothing to consent to.
      </p>

      <h2>What we do not run</h2>
      <p>To be specific, this site contains none of the following:</p>
      <ul>
        <li>Google Analytics, or any other analytics or visitor-measurement tool</li>
        <li>Google Tag Manager or any tag-management script</li>
        <li>Facebook Pixel or any advertising or remarketing tracker</li>
        <li>Session recording, heatmaps or A/B testing tools</li>
        <li>Embedded maps, videos, chat widgets or social media feeds</li>
        <li>Comment systems or third-party form services</li>
      </ul>

      <h2>Fonts</h2>
      <p>
        The site uses two typefaces, Cormorant Garamond and Manrope, which
        originate from Google Fonts. They are downloaded once when the site is
        built and served from our own domain. Your browser never contacts Google
        to load them, so no request, IP address or cookie reaches Google as a
        result of your visit.
      </p>

      <h2>Images</h2>
      <p>
        One image on the homepage is served from Cloudinary, an image hosting
        service. Loading an image discloses your IP address to that host, as it
        would for any image on any website, but no cookie is set and you are not
        tracked across sites.
      </p>

      <h2>Links to WhatsApp, phone and maps</h2>
      <p>
        The site links out to WhatsApp, to your phone dialler and to Google
        Maps. These are ordinary links: nothing happens until you click one. If
        you do, you leave this website and the privacy policy of that service
        applies instead of ours.
      </p>

      <h2>Local storage</h2>
      <p>
        The site does not use browser local storage, session storage or any
        other client-side store. Nothing about your visit is kept in your
        browser between page loads.
      </p>

      <h2>What this means for you</h2>
      <p>
        You can browse this site without being tracked, profiled or measured. We
        genuinely do not know who visits, how many people visit, or which pages
        they read.
      </p>

      <h2>If this changes</h2>
      <p>
        If we ever add analytics or any other cookie-setting technology, we will
        update this page and, where the law requires it, ask for your consent
        before setting anything.
      </p>

      <p>
        See also our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </LegalPageLayout>
  );
}
