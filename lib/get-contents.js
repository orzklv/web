import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export default (directory, json) => {
  const contents = fs
    .readdirSync(`./${directory}/`)
    .filter((file) => path.extname(file) === '.md')
    .map((file) => {
      const postContent = fs.readFileSync(`./${directory}/${file}`, 'utf8')
      const { data, content } = matter(postContent)

      if (data.published === false) {
        return null
      }

      return { ...data, body: content }
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  // Metadata for searching contents
  const meta = contents.map((p) => ({ ...p, body: null }))
  fs.writeFileSync(
    path.resolve(process.cwd(), `data/${json}.json`),
    JSON.stringify(meta)
  )

  return contents
}
