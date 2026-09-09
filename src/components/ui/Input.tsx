"use client";

import React, { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, id, disabled, required, ...props }, ref) => {
    // useId rather than deriving an id from the label text. The old scheme
    // turned "Full Name *" into the id "full-name-*", and two fields sharing a
    // label anywhere on the page produced duplicate ids, which breaks the
    // label/input association screen readers rely on.
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const hintId = `${inputId}-hint`;

    const describedBy = [error ? errorId : null, !error && hint ? hintId : null]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="ui-field-group">
        {label && (
          <label htmlFor={inputId} className="ui-label flex items-center justify-between">
            <span>
              {label}
              {required && (
                <>
                  <span aria-hidden="true" className="text-error"> *</span>
                  <span className="sr-only"> (required)</span>
                </>
              )}
            </span>
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div aria-hidden="true" className="absolute left-3.5 text-muted-foreground pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy || undefined}
            className={cn(
              "ui-input",
              "placeholder:text-muted-foreground/70",
              "disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "ui-input-error",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div aria-hidden="true" className="absolute right-3.5 text-muted-foreground pointer-events-none">
              {rightIcon}
            </div>
          )}
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
Input.displayName = "Input";
