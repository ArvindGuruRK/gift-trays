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
  imageAlt: string;
  onClick?: () => void;
  className?: string;
}

export function CollectionCard({
  title,
  subtitle,
  itemCount,
  imageUrl,
  imageAlt,
  onClick,
  className,
}: CollectionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={cn(
        "relative group h-[380px] w-full overflow-hidden rounded-xl border border-border shadow-warm-sm cursor-pointer select-none",
        className
      )}
    >
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={imageAlt}
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
      <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-card/90 backdrop-blur-md flex items-center justify-center border border-accent/40 text-foreground transition-transform duration-300 group-hover:rotate-45 group-hover:bg-accent group-hover:text-accent-foreground">
        <ArrowUpRight className="w-5 h-5" />
      </div>

      {/* Content at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col gap-1.5 text-soft-white">
        {subtitle && (
          <span className="text-eyebrow text-accent uppercase tracking-widest text-xs">
            {subtitle}
          </span>
        )}
        <h3 className="text-h3 font-medium text-soft-white leading-tight">
          {title}
        </h3>
      </div>
    </motion.div>
  );
}
