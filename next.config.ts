import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP as the fallback for browsers that don't support it.
    // Source files are already WebP, so this is purely about serving the
    // smaller derivative when the request's Accept header allows it.
    formats: ["image/avif", "image/webp"],
    // Required from Next 16 onwards: any `quality` prop not in this list is
    // rejected by the optimizer (unrestricted values would let anyone generate
    // arbitrary transforms). 75 is the default and must stay present.
    qualities: [70, 75, 85],
    // Photography here is static — cache derivatives for 31 days rather than
    // re-transforming on every cold edge.
    minimumCacheTTL: 2678400,
  },
  experimental: {
    // These are barrel-exported packages; without this every import pulls the
    // whole module graph into the client bundle.
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
