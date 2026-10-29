/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  experimental: {
    webpackBuildWorker: false,
  },
};

export default nextConfig;

