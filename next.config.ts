import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    POSTS_ENDPOINT: process.env.POSTS_ENDPOINT,
  }
};

export default nextConfig;
