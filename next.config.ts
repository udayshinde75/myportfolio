/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["mongoose"],  // Moved from "experimental"
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        // You can specify a pathname pattern if needed
        // pathname: '/**',  // Optional: Allows all paths
      },
    ],
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
