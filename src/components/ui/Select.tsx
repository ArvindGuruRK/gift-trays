"use client";

import React, { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, hint, options, placeholder, id, disabled, required, ...props }, ref) => {
    // See Input.tsx — ids come from useId, not from the label text.
    const generatedId = useId();
    const selectId = id || generatedId;
    const errorId = `${selectId}-error`;
    const hintId = `${selectId}-hint`;

    const describedBy = [error ? errorId : null, !error && hint ? hintId : null]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="ui-field-group">
        {label && (
          <label htmlFor={selectId} className="ui-label">
            {label}
            {required && (
              <>
                <span aria-hidden="true" className="text-error"> *</span>
                <span className="sr-only"> (required)</span>
              </>
            )}
          </label>
        )}

        <div className="relative flex items-center w-full">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy || undefined}
            className={cn(
              "ui-select",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "ui-input-error",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown
            aria-hidden="true"
            className="absolute right-3.5 w-4 h-4 text-muted-foreground pointer-events-none"
          />
        </div>

        {error ? (
          <span id={errorId} className="text-xs text-error font-medium">
            {error}
          </span>
        ) : hint ? (
          <span id={hintId} className="text-xs text-muted-foreground">
            {hint}
          </span>
        ) : null}
      </div>
    );
  }
);
Select.displayName = "Select";
