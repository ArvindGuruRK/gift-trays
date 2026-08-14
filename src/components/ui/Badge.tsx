import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "maroon" | "gold" | "beige" | "outline" | "success" | "warning";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export function Badge({
  className,
  variant = "gold",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const baseStyles = "ui-badge";

  const variants = {
    maroon: "ui-badge-maroon",
    gold: "ui-badge-gold",
    beige: "ui-badge-beige",
    outline: "ui-badge-outline",
    success: "ui-badge-success",
    warning: "ui-badge-warning",
  };

  const sizes = {
    sm: "ui-badge-sm",
    md: "ui-badge-md",
  };

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  );
}
