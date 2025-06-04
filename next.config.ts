import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: { ignoreBuildErrors: true },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  env: {
    GOOGLE_OAUTH_CLIENTID: process.env.GOOGLE_OAUTH_CLIENTID,
    DOMAIN: process.env.DOMAIN,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
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

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(
  nextConfig
);
