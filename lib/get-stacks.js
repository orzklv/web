import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export default () => {
  const stacks = fs
    .readdirSync('./stacks/')
    .filter((file) => path.extname(file) === '.md')
    .map((file) => {
      const postContent = fs.readFileSync(`./stacks/${file}`, 'utf8')
      const { data, content } = matter(postContent)

      if (data.published === false) {
        return null
      }

      return { ...data, body: content }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  // Metadata for searching stacks
  const meta = stacks.map((p) => ({ ...p, body: null }))
  fs.writeFileSync(
    path.resolve(process.cwd(), 'data/stack.json'),
    JSON.stringify(meta)
  )

  return stacks
}
