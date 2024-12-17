import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
module.exports = {
  "*.{js,ts,jsx,tsx}": ["eslint --fix", "prettier --write", "git add"],
};
export default nextConfig;
