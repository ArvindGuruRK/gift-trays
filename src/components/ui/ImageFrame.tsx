"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ThattuIcon } from "./Motifs";

export interface ImageFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  aspectRatio?: "1/1" | "4/3" | "3/4" | "16/9" | "21/9";
  hasGoldFrame?: boolean;
  hoverZoom?: boolean;
  /** Load immediately instead of waiting for scroll proximity — for images that should be preloaded up front (e.g. while a splash screen is up) rather than lazy-loaded on scroll. */
  eager?: boolean;
}

export function ImageFrame({
  className,
  src,
  alt,
  aspectRatio = "4/3",
  hasGoldFrame = false,
  hoverZoom = true,
  eager = false,
  ...props
}: ImageFrameProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectRatioClasses = {
    "1/1": "aspect-square",
    "4/3": "aspect-[4/3]",
    "3/4": "aspect-[3/4]",
    "16/9": "aspect-video",
    "21/9": "aspect-[21/9]",
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-secondary/30 rounded-lg group select-none",
        aspectRatioClasses[aspectRatio],
        hasGoldFrame && "p-2 border border-accent/40 bg-card shadow-warm-sm",
        className
      )}
      {...props}
    >
      {/* Inner container */}
      <div className="relative w-full h-full overflow-hidden rounded-md">
        {/* Placeholder / Skeleton */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-secondary/50 animate-pulse flex items-center justify-center">
            <ThattuIcon className="w-8 h-8 text-accent/40 animate-bounce" />
          </div>
        )}

        {/* Fallback image display if image fails to load */}
        {hasError ? (
          <div className="absolute inset-0 bg-secondary flex flex-col items-center justify-center p-4 text-center">
            <ThattuIcon className="w-10 h-10 text-accent mb-2" />
            <span className="text-xs text-muted-foreground font-sans">
              Traditional Gift Tray Image
            </span>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            loading={eager ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={cn(
              "object-cover transition-all duration-700 ease-luxury",
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
              hoverZoom && "group-hover:scale-105"
            )}
          />
        )}

        {/* Subtle Inner Gold Accent Border Line */}
        {hasGoldFrame && (
          <div className="absolute inset-2 border border-accent/30 pointer-events-none rounded-sm" />
        )}
      </div>
    </div>
  );
}
