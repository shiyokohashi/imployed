import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/personalized",
        destination: "/discover",
        permanent: true,
      },
      {
        source: "/personalized/:path*",
        destination: "/discover/:path*",
        permanent: true,
      },
      {
        source: "/for-you",
        destination: "/discover",
        permanent: true,
      },
      {
        source: "/personalize",
        destination: "/discover",
        permanent: true,
      },
      {
        source: "/featured",
        destination: "/explore",
        permanent: true,
      },
      {
        source: "/featured-careers",
        destination: "/explore",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
