import React, { forwardRef, useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: React.ReactNode;
  description?: string;
  variant?: "primary" | "accent";
  size?: "sm" | "md" | "lg";
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      description,
      id,
      checked,
      disabled,
      onChange,
      variant = "primary",
      size = "md",
      indeterminate = false,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const resolvedRef = (ref || internalRef) as React.RefObject<HTMLInputElement | null>;

    // useId rather than a slug of the label text, which produced duplicate ids
    // whenever two checkboxes shared a label. See Input.tsx.
    const generatedId = useId();
    const checkboxId = id || generatedId;

    useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = !!indeterminate;
      }
    }, [indeterminate, resolvedRef]);

    const sizeClasses = {
      sm: "w-4 h-4 rounded",
      md: "w-5 h-5 rounded",
      lg: "w-6 h-6 rounded-md",
    };

    const iconSizes = {
      sm: "w-3 h-3 stroke-[3]",
      md: "w-3.5 h-3.5 stroke-[3]",
      lg: "w-4 h-4 stroke-[3]",
    };

    const variantClasses = {
      primary:
        "peer-checked:bg-primary peer-checked:border-primary peer-checked:text-primary-foreground",
      accent:
        "peer-checked:bg-accent peer-checked:border-accent peer-checked:text-accent-foreground",
    };

    return (
      <label
        htmlFor={checkboxId}
        className={cn(
          "inline-flex items-start gap-3 cursor-pointer select-none group",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
          <input
            type="checkbox"
            ref={resolvedRef}
            id={checkboxId}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              sizeClasses[size],
              "border border-border bg-card shadow-warm-sm transition-all duration-200 ease-luxury flex items-center justify-center shrink-0",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
              variantClasses[variant],
              "peer-checked:[&_svg]:opacity-100 peer-checked:[&_svg]:scale-100 peer-checked:[&_svg]:rotate-0",
              "group-hover:border-accent",
              disabled && "cursor-not-allowed"
            )}
          >
            {indeterminate ? (
              <Minus className={cn(iconSizes[size], "opacity-100 scale-100 transition-all duration-200 text-current")} />
            ) : (
              <Check
                className={cn(
                  iconSizes[size],
                  "opacity-0 scale-50 -rotate-12 transition-all duration-200 ease-luxury text-current pointer-events-none"
                )}
              />
            )}
          </div>
        </div>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span
                className={cn(
                  "font-medium text-foreground group-hover:text-primary transition-colors font-sans",
                  size === "sm" && "text-xs",
                  size === "md" && "text-sm",
                  size === "lg" && "text-base font-semibold"
                )}
              >
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-muted-foreground mt-0.5">{description}</span>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

