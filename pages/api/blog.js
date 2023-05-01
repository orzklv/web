import blog from '@data/blog.json'

export default async function handler(req, res) {
  return res.status(200).json(blog)
}