module.exports = {
  async rewrites() {
    return [
      {
        source: '/waifurun',
        destination: '/api/_wf/',
      },
      {
        source: '/waifurun/:path*',
        destination: '/api/_wf/:path*',
      },
    ];
  },
  typescript: {
    ignoreDevErrors: true
  }
}
