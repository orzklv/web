import design from '@data/design.json'
import reading from '@data/reading.json'
import music from '@data/music.json'
import blog from '@data/blog.json'

export default async function handler(req, res) {
  switch (req.query.type) {
    case 'reading':
      return res.status(200).json(reading)
    case 'music':
      return res.status(200).json(music)
    case 'design':
      return res.status(200).json(design)
    case 'blog':
      return res.status(200).json(blog)
    case 'minecraft':
      const data = await fetch("https://api.mcsrvstat.us/2/owo.uwussi.moe:25565")
      return res.json(await data.json())
    default:
      return res.status(404).json({ message: 'Unknown service' })
  }
}
