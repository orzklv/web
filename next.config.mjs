/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/telegram',
        destination: 'https://t.me/orzklvb',
        permanent: true,
      },
      {
        source: '/discord',
        destination: 'https://discord.gg/JkXFQpScFj',
        permanent: true,
      },
      {
        source: '/windows',
        destination: "https://massgrave.dev/get",
        permanent: true,
      }
    ]
  },
  output: 'standalone',
}

export default nextConfig
