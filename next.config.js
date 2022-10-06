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
      {
        source: '/space',
        destination: 'https://owo.jetbrains.space/',
        permanent: true,
      },
      {
        source: '/discord',
        destination: 'https://discord.gg/JkXFQpScFj',
        permanent: true,
      },
    ]
  },
  output: 'standalone',
}

module.exports = nextConfig
