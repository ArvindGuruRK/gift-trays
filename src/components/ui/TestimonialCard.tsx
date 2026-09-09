import React from "react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Star } from "lucide-react";

export interface TestimonialCardProps {
  quote: string;
  author: string;
  occasion: string;
  location?: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  occasion,
  location,
  rating = 5,
  className,
}: TestimonialCardProps) {
  return (
    <Card className={className} hoverEffect>
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Badge variant="gold" size="sm">
            {occasion}
          </Badge>

          <div className="flex items-center gap-1 text-accent">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-accent stroke-accent" />
            ))}
          </div>
        </div>

        <div className="relative">
          <p className="text-body text-foreground italic relative z-10 pl-4 border-l-2 border-accent/40 font-serif">
            &ldquo;{quote}&rdquo;
          </p>
        </div>

        <div className="pt-3 border-t border-border/50 flex flex-col">
          <span className="font-semibold text-foreground font-sans text-sm">
            {author}
          </span>
          {location && (
            <span className="text-xs text-muted-foreground font-sans">
              {location}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
