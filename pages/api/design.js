import design from '@data/design.json'

export default async function handler(req, res) {
  return res.status(200).json(design)
}