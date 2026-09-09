"use client";

import React, { useId } from "react";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

export interface NumberSelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  hint?: string;
  className?: string;
  /** Word appended to the value, e.g. "trays". */
  unit?: string;
}

/**
 * Stepper for a small numeric value.
 *
 * Exposed as a spinbutton so assistive tech reports the current value and its
 * range. Previously the label was an unassociated <span> and value changes were
 * announced to nobody — a keyboard user could press the buttons without ever
 * learning what the number had become.
 */
export function NumberSelector({
  value,
  onChange,
  min = 1,
  max = 50,
  step = 2,
  label,
  hint,
  className,
  unit = "trays",
}: NumberSelectorProps) {
  const id = useId();
  const labelId = `${id}-label`;
  const hintId = `${id}-hint`;

  const handleDecrement = () => {
    if (value - step >= min) onChange(value - step);
  };

  const handleIncrement = () => {
    if (value + step <= max) onChange(value + step);
  };

  // Arrow keys and Home/End, which is what a spinbutton is expected to support.
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowRight":
        event.preventDefault();
        handleIncrement();
        break;
      case "ArrowDown":
      case "ArrowLeft":
        event.preventDefault();
        handleDecrement();
        break;
      case "Home":
        event.preventDefault();
        onChange(min);
        break;
      case "End":
        event.preventDefault();
        onChange(max);
        break;
      default:
        break;
    }
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <span id={labelId} className="text-sm font-semibold text-foreground font-sans">
          {label}
        </span>
      )}

      <div className="inline-flex items-center gap-1.5 p-1 bg-card border border-border rounded-lg shadow-warm-sm w-fit">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className="w-11 h-11 rounded-md flex items-center justify-center text-foreground hover:bg-secondary/60 active:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-colors"
          aria-label={`Decrease number of ${unit}`}
        >
          <Minus className="w-4 h-4" aria-hidden="true" />
        </button>

        <div
          role="spinbutton"
          tabIndex={0}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={`${value} ${unit}`}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={hint ? hintId : undefined}
          onKeyDown={handleKeyDown}
          className="w-20 text-center font-sans font-semibold text-foreground text-base rounded-md py-2"
        >
          {value} <span className="text-xs font-normal text-muted-foreground">{unit}</span>
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className="w-11 h-11 rounded-md flex items-center justify-center text-foreground hover:bg-secondary/60 active:bg-secondary disabled:opacity-40 disabled:pointer-events-none transition-colors"
          aria-label={`Increase number of ${unit}`}
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      {hint && (
        <span id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </span>
      )}
    </div>
  );
}
