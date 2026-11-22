/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["mongoose"],  // Moved from "experimental"
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
    ],
  },
  
  // Optional: work on the UI locally without a database by proxying the API
  // to a deployed copy of the site, e.g.
  //   DEV_API_PROXY=https://www.udayshinde.in npm run dev
  // Only active in development and only when the variable is set.
  async rewrites() {
    const origin = process.env.DEV_API_PROXY;
    if (process.env.NODE_ENV !== "development" || !origin) return [];
    return {
      beforeFiles: [
        { source: "/api/:path*", destination: `${origin.replace(/\/$/, "")}/api/:path*` },
      ],
      afterFiles: [],
      fallback: [],
    };
  },

  webpack(config: { experiments: any; }) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  }
};

module.exports = nextConfig;
