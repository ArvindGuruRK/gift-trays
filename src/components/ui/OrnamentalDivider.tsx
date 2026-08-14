import React from "react";
import { cn } from "@/lib/utils";

export interface OrnamentalDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: "sm" | "md" | "lg" | "full";
  color?: "gold" | "maroon" | "beige";
}

export function OrnamentalDivider({
  className,
  width = "md",
  color = "gold",
  ...props
}: OrnamentalDividerProps) {
  const widthClasses = {
    sm: "w-24",
    md: "w-48",
    lg: "w-72",
    full: "w-full",
  };

  const colorClasses = {
    gold: "text-accent border-accent/40",
    maroon: "text-primary border-primary/40",
    beige: "text-border border-border",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 my-3 mx-auto",
        widthClasses[width],
        colorClasses[color],
        className
      )}
      {...props}
    >
      <div className="h-[1px] flex-1 bg-current opacity-40" />

      {/* Central Floral/Lotus Motif SVG */}
      <svg
        className="w-4 h-4 shrink-0 fill-current opacity-90"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2C12 2 14.5 7 14.5 9.5C14.5 10.88 13.38 12 12 12C10.62 12 9.5 10.88 9.5 9.5C9.5 7 12 2 12 2ZM12 22C12 22 9.5 17 9.5 14.5C9.5 13.12 10.62 12 12 12C13.38 12 14.5 13.12 14.5 14.5C14.5 17 12 22 12 22ZM2 12C2 12 7 9.5 9.5 9.5C10.88 9.5 12 10.62 12 12C12 13.38 10.88 14.5 9.5 14.5C7 14.5 2 12 2 12ZM22 12C22 12 17 14.5 14.5 14.5C13.12 14.5 12 13.38 12 12C12 10.62 13.12 9.5 14.5 9.5C17 9.5 22 12 22 12Z" />
      </svg>

      <div className="h-[1px] flex-1 bg-current opacity-40" />
    </div>
  );
}
