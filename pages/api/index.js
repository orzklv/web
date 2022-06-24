export default async function handler(req, res) {
  return res
    .status(404)
    .json({ query: '/api/[blog, design, keyboard, music, reading, minecraft]' })
}
