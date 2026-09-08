import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "@react-three/drei",
      "@react-three/fiber",
      "three",
      "gsap",
      "lenis",
    ],
  },
};

export default nextConfig;
