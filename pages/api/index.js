export default async function handler(req, res) {
  return res.status(404).json({
    query:
      '/api/[blog, design, keyboard, minecraft, reading, minecraft, skyline]',
    endpoints: [
      {
        name: '/blog',
        desc: 'Get blog posts of Yuri',
      },
      {
        name: '/design',
        desc: 'Get bookmarked website links with awesome design',
      },
      {
        name: '/keyboard',
        desc: 'Get list of favorite keyboard models',
      },
      {
        name: '/minecraft',
        desc: "Get list of Yuri's favorite musics",
      },
      {
        name: '/reading',
        desc: 'Get list of bookmarked articles',
      },
      {
        name: '/minecraft',
        desc: "Get status of Yuri's Minecraft Server",
      },
      {
        name: '/skyline',
        desc: "Checkout Yuri's Skyline",
      },
    ],
  })
}
