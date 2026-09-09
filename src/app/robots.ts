import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/business";

/**
 * /robots.txt
 *
 * /design-system is an internal component reference, not customer-facing
 * content, so it is kept out of the index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/design-system"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
