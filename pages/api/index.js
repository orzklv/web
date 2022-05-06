export default async function handler(req, res) {
    return res.status(404).json({ query: '/api/[blog, design, ideas, keyboard, music, quotes, reading, words]' })
}
