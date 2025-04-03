import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {},
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  env: {
    GOOGLE_OAUTH_CLIENTID: process.env.GOOGLE_OAUTH_CLIENTID,
    DOMAIN: process.env.DOMAIN,
  },
  serverExternalPackages: ["sequelize", "sequelize-typescript"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.sandbox.midtrans.com",
      },
      {
        protocol: "https",
        hostname: "api.midtrans.com",
      },
    ],
  },
};

export default nextConfig;
