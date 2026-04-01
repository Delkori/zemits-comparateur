/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'zemits.fr' },
      { protocol: 'https', hostname: 'zemits.store' },
      { protocol: 'https', hostname: 'lteqngcboeiwqjfmcwve.supabase.co' },
    ],
  },
}

module.exports = nextConfig
