module.exports = {
  async rewrites() {
    return [
      {
        source: '/waifu',
        destination: '/api/_wf/',
      },
      {
        source: '/waifu/:path*',
        destination: '/api/_wf/:path*',
      },
    ];
  },
  typescript: {
    ignoreDevErrors: true
  }
}
