import React from "react";
import { cn } from "@/lib/utils";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";

export interface HeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  variant?: "display" | "h1" | "h2" | "h3" | "h4";
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center" | "right";
  hasDivider?: boolean;
  theme?: "dark" | "light";
}

export function Heading({
  className,
  as,
  variant = "h2",
  eyebrow,
  title,
  subtitle,
  align = "center",
  hasDivider = false,
  theme = "light",
  ...props
}: HeadingProps) {
  const Component = as || (variant === "display" ? "h1" : variant);

  const alignmentStyles = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const variantStyles = {
    display: "text-display font-medium text-foreground",
    h1: "text-h1 font-medium text-foreground",
    h2: "text-h2 font-medium text-foreground",
    h3: "text-h3 font-medium text-foreground",
    h4: "text-h4 font-medium text-foreground",
  };

  const themeTextStyles = {
    light: "text-foreground",
    dark: "text-primary-foreground",
  };

  // Gold eyebrows need different tokens per ground to clear WCAG AA — the raw
  // brand gold is only 2.89:1 on ivory and 3.66:1 on maroon. See globals.css.
  const themeEyebrowStyles = {
    light: "!text-accent-text",
    dark: "!text-accent-on-dark",
  };

  const themeSubtitleStyles = {
    light: "text-muted-foreground",
    dark: "text-sand-beige/90",
  };

  return (
    <div
      className={cn("flex flex-col gap-2.5", alignmentStyles[align], className)}
      {...props}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-eyebrow font-semibold uppercase tracking-[0.14em]",
            themeEyebrowStyles[theme]
          )}
        >
          {eyebrow}
        </span>
      )}

      <Component
        className={cn(
          variantStyles[variant],
          themeTextStyles[theme],
          "tracking-tight"
        )}
      >
        {title}
      </Component>

      {subtitle && (
        <p
          className={cn(
            "text-body-lg max-w-2xl font-sans font-normal",
            themeSubtitleStyles[theme]
          )}
        >
          {subtitle}
        </p>
      )}

      {hasDivider && (
        <div className="mt-2">
          <OrnamentalDivider width={align === "center" ? "md" : "sm"} />
        </div>
      )}
    </div>
  );
}
