import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SPLASH_VIDEO_SRC } from "@/lib/assets";
import "./globals.css";

/**
 * Marks the document as JS-capable before first paint.
 *
 * The GSAP reveal guard in globals.css hides elements that only JS can reveal.
 * Scoping that guard to `html.js` means a bundle that fails to load leaves the
 * page fully readable instead of permanently blank.
 */
const JS_ENABLED_MARKER = `document.documentElement.classList.add('js')`;

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

export const metadata: Metadata = {
  title: "Seer Varisai Thattu — Traditional Ceremonial Gift Trays & Arrangements",
  description:
    "Exquisite packed plating of Seer Varisai Thattu trays for wedding ceremonies, engagements, seemantham, and sacred traditions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_ENABLED_MARKER }} />
        {/* The splash video renders inside a client component, so without this
            hint the browser can't discover it until the bundle has parsed and
            hydrated — leaving an empty circle for most of the splash. */}
        <link
          rel="preload"
          as="video"
          type="video/webm"
          href={SPLASH_VIDEO_SRC}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-accent/20 selection:text-primary">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
