"use client";

import React from "react";
import Lottie from "lottie-react";
import diwaliDiya from "@/../public/lottie/diwali-diya.json";
import { cn } from "@/lib/utils";

interface DiyaLogoProps {
  className?: string;
  size?: number | string;
  style?: React.CSSProperties;
}

export function DiyaLogo({ className, size = 64, style }: DiyaLogoProps) {
  const dimensionStyle =
    typeof size === "number" ? { width: `${size}px`, height: `${size}px` } : { width: size, height: size };

  return (
    <div
      className={cn("relative flex items-center justify-center shrink-0 pointer-events-none", className)}
      style={{ ...dimensionStyle, ...style }}
    >
      <Lottie
        animationData={diwaliDiya}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
