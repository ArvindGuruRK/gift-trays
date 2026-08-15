import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  theme?: "ivory" | "sand" | "maroon" | "white" | "pattern";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  /**
   * Sections clip their overflow by default so decorative motifs bleeding past
   * the edge don't create a horizontal scrollbar.
   *
   * Set `"visible"` for any section containing a GSAP `pin`. Pinning inserts a
   * pin-spacer and switches the target to fixed positioning; a clipped ancestor
   * makes it jump, clip, or fail to release on the way back up.
   */
  overflow?: "hidden" | "visible";
  children: React.ReactNode;
}

export function Section({
  className,
  theme = "ivory",
  padding = "lg",
  overflow = "hidden",
  children,
  ...props
}: SectionProps) {
  const themeClasses = {
    ivory: "ui-section-ivory",
    sand: "ui-section-sand",
    maroon: "ui-section-maroon",
    white: "ui-section-white",
    pattern: "ui-section-pattern bg-kolam-pattern",
  };

  const paddingClasses = {
    none: "ui-section-pad-none",
    sm: "ui-section-pad-sm",
    md: "ui-section-pad-md",
    lg: "ui-section-pad-lg",
    xl: "ui-section-pad-lg py-20 sm:py-32 lg:py-36",
  };

  return (
    <section
      className={cn(
        "ui-section",
        overflow === "visible" && "ui-section-overflow-visible",
        themeClasses[theme],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
