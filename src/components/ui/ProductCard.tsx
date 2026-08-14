"use client";

import React from "react";
import { Card } from "./Card";
import { ImageFrame } from "./ImageFrame";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Sparkles } from "lucide-react";

export interface ProductCardProps {
  title: string;
  category: string;
  trayCount: number;
  startingPrice?: string;
  imageUrl: string;
  imageAlt: string;
  description?: string;
  onEnquire?: () => void;
  className?: string;
}

export function ProductCard({
  title,
  category,
  trayCount,
  startingPrice,
  imageUrl,
  imageAlt,
  description,
  onEnquire,
  className,
}: ProductCardProps) {
  return (
    <Card className={className} hoverEffect>
      <div className="p-3 pb-0">
        <ImageFrame
          src={imageUrl}
          alt={imageAlt}
          aspectRatio="4/3"
          hasGoldFrame
        />
      </div>

      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="gold" size="sm">
            {category}
          </Badge>
          <span className="text-xs font-semibold text-muted-foreground bg-secondary/60 px-2.5 py-0.5 rounded-full">
            {trayCount} Trays Set
          </span>
        </div>

        <h3 className="text-h4 font-medium text-foreground line-clamp-1">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-muted-foreground font-sans line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/50 mt-1">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-accent font-semibold block">
              Customizable Set
            </span>
            {startingPrice && (
              <span className="text-base font-semibold text-foreground font-sans">
                {startingPrice}
              </span>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onEnquire}
            rightIcon={<Sparkles className="w-3.5 h-3.5 text-accent" />}
          >
            Enquire
          </Button>
        </div>
      </div>
    </Card>
  );
}
