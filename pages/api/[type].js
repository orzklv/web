import design from '@data/design.json'
import reading from '@data/reading.json'
import music from '@data/music.json'
import blog from '@data/blog.json'
import keyboard from '@data/keyboards.json'
import { skyline2022 } from '@lib/skyline'

export default async function handler(req, res) {
  switch (req.query.type) {
    case 'keyboard':
      return res.status(200).json(keyboard)
    case 'reading':
      return res.status(200).json(reading)
    case 'music':
      return res.status(200).json(music)
    case 'design':
      return res.status(200).json(design)
    case 'blog':
      return res.status(200).json(blog)
    case 'skyline':
      return res.redirect(encodeURI(skyline2022))
    default:
      return res.status(404).json({ message: 'Unknown service' })
  }
}
