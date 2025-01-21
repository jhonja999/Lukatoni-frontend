import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [], // Si estás usando una URL externa
    unoptimized: true, // Para desarrollo local
  }
};

export default nextConfig;
