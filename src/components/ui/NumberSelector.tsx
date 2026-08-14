"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

export interface NumberSelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  className?: string;
}

export function NumberSelector({
  value,
  onChange,
  min = 1,
  max = 50,
  step = 2,
  label,
  className,
}: NumberSelectorProps) {
  const handleDecrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };

  const handleIncrement = () => {
    if (value + step <= max) {
      onChange(value + step);
    }
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <span className="text-sm font-semibold text-foreground font-sans">
          {label}
        </span>
      )}

      <div className="inline-flex items-center gap-1.5 p-1 bg-card border border-border rounded-lg shadow-warm-sm w-fit">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className="w-9 h-9 rounded-md flex items-center justify-center text-foreground hover:bg-secondary/60 active:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="w-16 text-center font-sans font-semibold text-foreground text-base">
          {value} <span className="text-xs font-normal text-muted-foreground">trays</span>
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className="w-9 h-9 rounded-md flex items-center justify-center text-foreground hover:bg-secondary/60 active:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
