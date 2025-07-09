const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https:;
  font-src 'self' data:;
  connect-src 'self' ws://localhost:* ws://127.0.0.1:* https://api.emailjs.com https://accounts.google.com https://oauth2.googleapis.com https://www.googleapis.com;
  frame-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  // Comentado temporalmente para permitir API routes dinámicas (Google Calendar)
  // output: 'export',
  distDir: 'dist',

  images: {
    unoptimized: true,
  },

  // ✅ Cabeceras HTTP con CSP (deshabilitado en desarrollo)
  async headers() {
    // Deshabilitar CSP en desarrollo para evitar problemas con WebSocket
    if (process.env.NODE_ENV === 'development') {
      return [];
    }

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\n/g, '').trim(),
          },
        ],
      },
    ];
  },

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          framework: {
            chunks: 'all',
            name: 'framework',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          framerMotion: {
            name: 'framer-motion',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            priority: 30,
            enforce: true,
          },
        },
      };
    }

    return config;
  },

  experimental: {
    // tus flags experimentales aquí si los usas
  },
};

module.exports = withBundleAnalyzer(nextConfig);
