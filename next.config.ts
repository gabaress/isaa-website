import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The largest source image is 1600px wide, so nothing above that is ever useful.
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1600],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
