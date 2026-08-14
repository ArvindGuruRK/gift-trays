"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  badge?: string;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  layout?: "vertical" | "horizontal" | "grid";
  className?: string;
}

export function RadioGroup({
  name,
  options,
  selectedValue,
  onChange,
  label,
  layout = "grid",
  className,
}: RadioGroupProps) {
  const layoutClasses = {
    vertical: "flex flex-col gap-2.5",
    horizontal: "flex flex-wrap gap-3",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <span className="text-sm font-semibold text-foreground font-sans">
          {label}
        </span>
      )}

      <div className={cn(layoutClasses[layout], className)}>
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "relative flex items-start gap-3 p-4 rounded-lg border bg-card cursor-pointer transition-all duration-200 select-none",
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary shadow-warm-sm"
                  : "border-border hover:border-accent/60 hover:bg-secondary/20"
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange?.(option.value)}
                className="sr-only"
              />

              {/* Radio circle indicator */}
              <div
                className={cn(
                  "w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 shrink-0 transition-colors",
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-border bg-card"
                )}
              >
                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
              </div>

              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-foreground font-sans">
                    {option.label}
                  </span>
                  {option.badge && (
                    <span className="text-[11px] font-semibold text-accent bg-accent/15 px-2 py-0.5 rounded-full">
                      {option.badge}
                    </span>
                  )}
                </div>
                {option.description && (
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {option.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
