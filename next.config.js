/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'source.unsplash.com'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
