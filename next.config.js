/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/skyline',
        destination: '/api/skyline',
        permanent: true,
      },
    ]
  },
  output: 'standalone',
}

module.exports = nextConfig
