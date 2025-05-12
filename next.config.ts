import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"], 
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
      };
      
      config.resolve.alias = {
        ...config.resolve.alias,
        'pdfjs-dist/build/pdf': 'pdfjs-dist/legacy/build/pdf',
        'pdfjs-dist/build/pdf.worker.js$': 'pdfjs-dist/legacy/build/pdf.worker.js',
      };
    }
    return config;
  },
};

export default nextConfig;
