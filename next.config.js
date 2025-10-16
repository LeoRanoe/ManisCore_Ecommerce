/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  // Enable logging for debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Ensure proper handling of dynamic routes
  experimental: {
    // Enable PPR (Partial Prerendering) for better performance
    // ppr: true,
  },
}

module.exports = nextConfig
