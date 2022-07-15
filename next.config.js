module.exports = {
  async redirects() {
    return [
      {
        source: '/skyline',
        destination: '/api/skyline',
        permanent: true
      }
    ]
  },
  typescript: {
    ignoreDevErrors: true
  }
}
