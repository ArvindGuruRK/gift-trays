import type { Metadata } from "next";

/**
 * The design system page is an internal component reference, not customer
 * content. It is a Client Component so it cannot export metadata itself —
 * this segment layout keeps it out of search results instead.
 */
export const metadata: Metadata = {
  title: "Design System (internal)",
  robots: { index: false, follow: false },
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
