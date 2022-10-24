/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['encrypted-tbn0.gstatic.com','cdn.sanity.io'],
  },
}

module.exports = nextConfig
