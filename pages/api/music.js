import music from '@data/music.json'

export default async function handler(req, res) {
  return res.status(200).json(music)
}
