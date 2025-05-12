import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"], 
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
