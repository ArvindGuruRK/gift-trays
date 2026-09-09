"use client";

import React, { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, disabled, required, ...props }, ref) => {
    // See Input.tsx — ids come from useId, not from the label text.
    const generatedId = useId();
    const textareaId = id || generatedId;
    const errorId = `${textareaId}-error`;
    const hintId = `${textareaId}-hint`;

    const describedBy = [error ? errorId : null, !error && hint ? hintId : null]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="ui-field-group">
        {label && (
          <label htmlFor={textareaId} className="ui-label">
            {label}
            {required && (
              <>
                <span aria-hidden="true" className="text-error"> *</span>
                <span className="sr-only"> (required)</span>
              </>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          className={cn(
            "ui-textarea",
            "placeholder:text-muted-foreground/70",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "ui-input-error",
            className
          )}
          {...props}
        />

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
Textarea.displayName = "Textarea";
