"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ThattuIcon } from "./Motifs";
import { getBlurDataURL } from "@/lib/blur-placeholders";

export interface ImageFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  aspectRatio?: "1/1" | "4/3" | "3/4" | "16/9" | "21/9";
  hasGoldFrame?: boolean;
  hoverZoom?: boolean;
  /** Load immediately instead of waiting for scroll proximity. Use sparingly — only for images genuinely above the fold. */
  eager?: boolean;
  /**
   * Width this frame occupies at each breakpoint, for srcset selection.
   * Defaults to a 3-column grid, which is what the gallery uses; pass an
   * explicit value anywhere the layout differs or the browser will fetch a
   * needlessly large derivative.
   */
  sizes?: string;
}

export function ImageFrame({
  className,
  src,
  alt,
  aspectRatio = "4/3",
  hasGoldFrame = false,
  hoverZoom = true,
  eager = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  ...props
}: ImageFrameProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const blurDataURL = getBlurDataURL(src);

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
        {/* Skeleton — only when there's no baked-in blur placeholder to show
            instead. The pulse+bounce pair repaints continuously, so running it
            behind every image in a 21-item grid is pure wasted main thread. */}
        {!isLoaded && !hasError && !blurDataURL && (
          <div className="absolute inset-0 bg-secondary/50 animate-pulse flex items-center justify-center">
            <ThattuIcon className="w-8 h-8 text-accent/40" />
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
            sizes={sizes}
            {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={cn(
              // Only `opacity` and `transform` transition here — `transition-all`
              // would also animate layout properties as classes swap.
              "object-cover transition-[opacity,transform] duration-700 ease-luxury",
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
