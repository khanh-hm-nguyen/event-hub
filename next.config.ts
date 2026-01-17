import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  compiler: {
 
    removeConsole: process.env.NODE_ENV === "production" 
      ? { exclude: ["error"] } 
      : false,
  },

  reactCompiler: true,
};

export default nextConfig;
