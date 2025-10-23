import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ae-pic-a1.aliexpress-media.com",
      },
    ],
  },
};

export default nextConfig;
