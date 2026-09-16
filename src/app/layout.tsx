import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { BackToTop } from "@/components/layout/BackToTop";
import { InlineScript } from "@/components/ui/InlineScript";
import { SPLASH_SESSION_KEY, SPLASH_SEEN_ATTR } from "@/lib/splash";
import { BUSINESS, resolvedSiteUrl, assertBusinessConfigured } from "@/lib/business";
import "./globals.css";

/**
 * Fonts are loaded through next/font, which downloads and self-hosts them at
 * build time. Visitors' browsers never contact Google, so these do not create a
 * third-party data transfer or a cookie-consent obligation. Keep it that way —
 * switching to a <link> to fonts.googleapis.com would change that.
 */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Fails the production build while contact details are still placeholders.
assertBusinessConfigured();

export const metadata: Metadata = {
  metadataBase: new URL(resolvedSiteUrl()),
  title: {
    default: `${BUSINESS.displayName} — Traditional Ceremonial Gift Trays`,
    template: `%s | ${BUSINESS.displayName}`,
  },
  description: `Custom Seer Varisai Thattu ceremonial gift trays for weddings, engagements, seemantham and housewarming ceremonies in ${BUSINESS.address.city}.`,
  applicationName: BUSINESS.displayName,
  keywords: [
    "Seer Varisai Thattu",
    "Seer Varisai Chennai",
    "wedding gift trays",
    "ceremonial gift trays",
    "thamboolam trays",
    "seemantham trays",
    "engagement trays Chennai",
  ],
  authors: [{ name: BUSINESS.displayName }],
  creator: BUSINESS.displayName,
  publisher: BUSINESS.displayName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: BUSINESS.displayName,
    locale: "en_IN",
    url: "/",
    title: `${BUSINESS.displayName} — Traditional Ceremonial Gift Trays`,
    description: `Custom Seer Varisai Thattu ceremonial gift trays for weddings, engagements and traditional ceremonies in ${BUSINESS.address.city}.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.displayName} — Traditional Ceremonial Gift Trays`,
    description: `Custom Seer Varisai Thattu ceremonial gift trays in ${BUSINESS.address.city}.`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Event Services",
  formatDetection: {
    // Let mobile browsers linkify the phone number and address.
    telephone: true,
    address: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // No maximumScale or userScalable:false — pinch-zoom must stay available
  // (WCAG 2.2 AA, 1.4.4 Resize Text).
  themeColor: "#6B1F2A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-IN"
      className={`${cormorant.variable} ${manrope.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/*
          The splash video and the gallery images all come from Cloudinary.
          Opening the TCP + TLS connection while the HTML is still parsing takes
          a round trip or two off the first byte of every one of them.
        */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {/*
          Runs synchronously during HTML parsing, before the first paint, so a
          visitor returning to the homepage from Contact or About never sees the
          splash flash up and vanish. It also covers visitors who ask for reduced
          motion, who should never see the spinning platter at all — the overlay
          is server-rendered, so without this it would be painted for them and
          only removed once React hydrates. `SplashLoader` decides visibility
          from these same two signals in a lazy useState initializer, so React's
          markup agrees with this DOM and there is no hydration mismatch.
          See node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
        */}
        <InlineScript
          html={`(function(){try{var s=sessionStorage.getItem(${JSON.stringify(
            SPLASH_SESSION_KEY
          )})==="1",r=matchMedia("(prefers-reduced-motion: reduce)").matches;if(s||r)document.documentElement.setAttribute(${JSON.stringify(
            SPLASH_SEEN_ATTR
          )},"seen")}catch(e){}})()`}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-accent/20 selection:text-primary">
        <SmoothScrollProvider>
          {children}
          {/* After the page content, so it never precedes the skip link in tab order. */}
          <BackToTop />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
