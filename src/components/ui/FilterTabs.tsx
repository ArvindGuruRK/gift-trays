"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface FilterTab {
  id: string;
  label: string;
}

export interface FilterTabsProps {
  tabs: FilterTab[];
  activeId: string;
  onChange: (id: string) => void;
  /** Names the group for screen readers, e.g. "Filter collections by occasion". */
  ariaLabel: string;
  className?: string;
}

/**
 * Pill-shaped filter buttons shared by the Collections and Gallery sections, so
 * the two filters cannot drift apart in size or styling.
 */
export function FilterTabs({ tabs, activeId, onChange, ariaLabel, className }: FilterTabsProps) {
  return (
    <div
      className={cn("flex items-center justify-center gap-2 flex-wrap mt-8 mb-10", className)}
      role="group"
      aria-label={ariaLabel}
    >
      {tabs.map((tab) => {
        const isActive = activeId === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            // aria-pressed is what tells a screen reader which filter is
            // active; the colour change alone conveys nothing.
            aria-pressed={isActive}
            className={cn(
              "px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans font-semibold transition-all cursor-pointer",
              isActive
                ? "bg-primary text-primary-foreground shadow-warm-sm"
                : "bg-card text-foreground/80 border border-border hover:bg-secondary"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
