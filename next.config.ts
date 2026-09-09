import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    // Next 16 defaults to ["image/webp"] only. AVIF is typically another
    // 20-30% smaller and every current browser supports it; WebP stays as the
    // fallback. Order matters — the first match against the Accept header wins.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
