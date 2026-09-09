"use client";

import React, { useId } from "react";
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

/**
 * Radio group.
 *
 * Uses a real fieldset/legend so the group has an accessible name — the label
 * used to be a loose <span>, which associated it with nothing. The inputs are
 * visually hidden but still focusable, so the card carries a focus ring driven
 * by peer-focus-visible; previously focus was completely invisible and the
 * group could not be operated by keyboard with any confidence.
 */
export function RadioGroup({
  name,
  options,
  selectedValue,
  onChange,
  label,
  layout = "grid",
  className,
}: RadioGroupProps) {
  const groupId = useId();

  const layoutClasses = {
    vertical: "flex flex-col gap-2.5",
    horizontal: "flex flex-wrap gap-3",
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
  };

  return (
    <fieldset className="flex flex-col gap-2 w-full border-0 p-0 m-0 min-w-0">
      {label && (
        <legend className="text-sm font-semibold text-foreground font-sans p-0 mb-1">
          {label}
        </legend>
      )}

      <div className={cn(layoutClasses[layout], className)}>
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          const optionId = `${groupId}-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                "relative flex items-start gap-3 p-4 rounded-lg border bg-card cursor-pointer transition-all duration-200 select-none",
                "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-text",
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary shadow-warm-sm"
                  : "border-border hover:border-accent/60 hover:bg-secondary/20"
              )}
            >
              <input
                type="radio"
                id={optionId}
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange?.(option.value)}
                className="peer sr-only"
              />

              <span
                aria-hidden="true"
                className={cn(
                  "w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 shrink-0 transition-colors",
                  isSelected ? "border-primary bg-primary" : "border-border bg-card"
                )}
              >
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
              </span>

              <span className="flex flex-col flex-1 min-w-0">
                <span className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-foreground font-sans">
                    {option.label}
                  </span>
                  {option.badge && (
                    <span className="text-[11px] font-semibold text-accent-text bg-accent/15 px-2 py-0.5 rounded-full shrink-0">
                      {option.badge}
                    </span>
                  )}
                </span>
                {option.description && (
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {option.description}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
