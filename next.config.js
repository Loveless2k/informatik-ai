/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  telemetry: {
    enabled: false,
  },
  trailingSlash: true,
  reactStrictMode: true,
  output: 'standalone',
}

module.exports = nextConfig
