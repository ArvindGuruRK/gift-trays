"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CollectionCardProps {
  title: string;
  subtitle?: string;
  itemCount?: string;
  imageUrl: string;
  onClick?: () => void;
  className?: string;
}

export function CollectionCard({
  title,
  subtitle,
  itemCount,
  imageUrl,
  onClick,
  className,
}: CollectionCardProps) {
  return (
    // motion.button rather than motion.div: this card is the primary way into
    // the enquiry modal, and as a div it could not be reached by keyboard or
    // announced by a screen reader.
    <motion.button
      type="button"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      aria-label={`${title}${subtitle ? ` — ${subtitle}` : ""}${itemCount ? `, ${itemCount}` : ""}. Enquire about this collection.`}
      className={cn(
        "ui-card-button relative group h-[380px] w-full overflow-hidden rounded-xl border border-border shadow-warm-sm select-none",
        className
      )}
    >
      {/*
        alt="" because the button's aria-label already names the collection —
        without this the card announces its title twice.
      */}
      <Image
        src={imageUrl}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-108"
      />

      {/* Luxury Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/90 via-dark-brown/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

      {/* Top Badge */}
      {itemCount && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-card/90 backdrop-blur-md text-foreground text-xs font-semibold px-3 py-1 rounded-full border border-accent/30 shadow-warm-sm">
            {itemCount}
          </span>
        </div>
      )}

      {/* Hover Icon */}
      <div
        aria-hidden="true"
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-card/90 backdrop-blur-md flex items-center justify-center border border-accent/40 text-foreground transition-transform duration-300 group-hover:rotate-45 group-hover:bg-accent group-hover:text-accent-foreground"
      >
        <ArrowUpRight className="w-5 h-5" />
      </div>

      {/* Content at bottom — sits over a dark gradient, so it uses the lighter
          gold token rather than the brand gold. */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col gap-1.5 text-left text-soft-white">
        {subtitle && (
          <span className="font-sans font-semibold !text-accent-on-dark uppercase tracking-widest text-xs">
            {subtitle}
          </span>
        )}
        <h3 className="text-h3 font-medium text-soft-white leading-tight">
          {title}
        </h3>
      </div>
    </motion.button>
  );
}
