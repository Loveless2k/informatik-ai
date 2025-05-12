/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  telemetry: {
    enabled: false,
  },
  trailingSlash: true,
  reactStrictMode: true,
  output: 'export',  // Changed from 'standalone' to 'export' for static site generation
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable server-side features that won't work in static export
  experimental: {
    // Ensure we're not using any experimental features that require a server
  },
}

module.exports = nextConfig
