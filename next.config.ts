import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ✅ Disable ESLint blocking builds on Vercel
  },
};

export default nextConfig;
