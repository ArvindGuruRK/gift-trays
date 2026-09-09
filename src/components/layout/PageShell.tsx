import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";

/**
 * The standard page format: skip link, navigation, a labelled <main> landmark,
 * then the footer. Every route uses this instead of re-assembling the chrome,
 * so the landmark structure and skip target stay consistent site-wide.
 */
export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SkipLink />
      <Navbar />
      <main id="main-content" tabIndex={-1} className={className ?? "flex-1"}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
