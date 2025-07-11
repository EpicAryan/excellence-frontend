import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
 webpack: (config) => {
   config.module.rules.push({
     test: /\.node/,
     use: 'raw-loader',
   });

   return config;
 },
};

export default nextConfig;
