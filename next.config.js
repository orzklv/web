module.exports = {
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
  typescript: {
    ignoreDevErrors: true,
  },
  output: 'standalone',
}
