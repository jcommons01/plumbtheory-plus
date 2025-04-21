import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export", // ✅ Enables static export mode for mobile app packaging
  eslint: {
    ignoreDuringBuilds: true, // ✅ Disable ESLint blocking builds on Vercel
  },
};

export default nextConfig;
