import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ESLint is run separately in CI; skip during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript errors are caught by tsc --noEmit, skip in builds
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
    ],
  },
};

export default nextConfig;
