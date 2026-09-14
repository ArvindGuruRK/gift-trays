import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The WhatsApp logo from public/icons/whatsapp.svg, for every button and link
 * that opens WhatsApp. The logo keeps its own colours so the action is
 * recognisable at a glance; the button around it uses the brand palette
 * (Secondary Sand) instead of a WhatsApp-green background.
 *
 * Decorative: the button or link it sits in carries the accessible name.
 */
export function WhatsAppLogo({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/icons/whatsapp.svg"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      style={{ width: size, height: size }}
    />
  );
}
