import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
  },
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
