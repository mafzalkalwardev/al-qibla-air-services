import type { NextConfig } from "next";

/** Full-stack mode for Vercel (admin, API routes, Supabase). Set NEXT_PUBLIC_BASE_PATH only for legacy static hosting. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
