import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export function Container({
  className,
  size = "xl",
  children,
  ...props
}: ContainerProps) {
  const sizeClasses = {
    sm: "ui-container-sm",
    md: "ui-container-md",
    lg: "ui-container-lg",
    xl: "ui-container-xl",
    "2xl": "ui-container-2xl",
    full: "ui-container-full",
  };

  return (
    <div
      className={cn(
        "ui-container",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
