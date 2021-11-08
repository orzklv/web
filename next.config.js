module.exports = {
  async redirects() {
    return [
      {
        source: "/waifurun",
        destination: "/api/_wf",
        permanent: true,
      },
    ];
  },
  typescript: {
    ignoreDevErrors: true
  }
}
