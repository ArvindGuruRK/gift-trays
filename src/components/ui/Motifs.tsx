import React from "react";
import { cn } from "@/lib/utils";

export interface MotifProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number;
}

/** Traditional South Indian Lotus Floral Motif */
export function LotusMotif({ className, size = 32, ...props }: MotifProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-accent", className)}
      {...props}
    >
      <path
        d="M24 4C24 4 17 14 17 21C17 24.866 20.134 28 24 28C27.866 28 31 24.866 31 21C31 14 24 4 24 4Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 28C18 28 8 20 5 26C3 30 7 36 14 36C20 36 24 28 24 28Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M24 28C30 28 40 20 43 26C45 30 41 36 34 36C28 36 24 28 24 28Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="42" r="2" fill="currentColor" />
    </svg>
  );
}

/**
 * Kolam corner flourish — a traditional South Indian sikku/pulli kolam.
 *
 * Purely decorative: it carries no information a screen reader needs, so it has
 * an empty alt and is hidden from the accessibility tree by default. It also
 * now forwards the rest of its props, which it did not before — aria-hidden
 * passed by callers was being silently dropped.
 */
export function KolamCornerFlourish({
  className,
  size = 120,
  ...props
}: { className?: string; size?: number } & React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- decorative background
    // flourish positioned absolutely; next/image adds no value here.
    <img
      src="/motifs/kolam_corner_flourish.webp"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={cn("object-contain pointer-events-none drop-shadow-md", className)}
      {...props}
    />
  );
}

/** Alias export for RealisticKolamCorner */
export const RealisticKolamCorner = KolamCornerFlourish;

/** Traditional Ceremonial Thattu (Gift Tray) Icon */
export function ThattuIcon({ className, size = 24, ...props }: MotifProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-accent", className)}
      {...props}
    >
      <ellipse cx="12" cy="16" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 16V14C3 12.3431 7.02944 11 12 11C16.9706 11 21 12.3431 21 14V16" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11C8 8.5 9.5 6 12 6C14.5 6 16 8.5 16 11" stroke="currentColor" strokeWidth="1.5" strokeDasharray="1.5 1.5" />
      <circle cx="12" cy="4" r="1.5" fill="currentColor" />
    </svg>
  );
}
