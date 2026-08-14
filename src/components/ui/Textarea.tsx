import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, disabled, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="ui-field-group">
        {label && (
          <label htmlFor={textareaId} className="ui-label">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
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
          <span className="text-xs text-error font-medium">{error}</span>
        ) : hint ? (
          <span className="text-xs text-muted-foreground">{hint}</span>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
