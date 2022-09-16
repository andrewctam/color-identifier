/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  assetPrefix: './',
  images: {
    unoptimized: true,
  }
}