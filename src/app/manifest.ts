import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BUSINESS.displayName} — Traditional Ceremonial Gift Trays`,
    short_name: BUSINESS.displayName,
    description: `Custom Seer Varisai Thattu ceremonial gift trays in ${BUSINESS.address.city}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F0",
    theme_color: "#6B1F2A",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
