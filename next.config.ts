import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://dinnerdeal.backendless.com/**'),
      new URL('https://demo.eccdn.com.au/**')
    ],
  }
};

export default nextConfig;
