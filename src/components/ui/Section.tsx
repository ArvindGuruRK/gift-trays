import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  theme?: "ivory" | "sand" | "maroon" | "white" | "pattern";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

export function Section({
  className,
  theme = "ivory",
  padding = "lg",
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
