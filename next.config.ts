import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // GitHub Pages serves from /<repo-name>/, so we need basePath
  // Change 'iptv' to your actual repo name
  basePath: process.env.NODE_ENV === "production" ? "/iptv" : "",
  // Static images need this for GitHub Pages
  images: {
    unoptimized: true,
  },
  // Trailing slash for GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
