import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
