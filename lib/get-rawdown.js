import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const readFile = promisify(fs.readFile)

const getRawdown = async filename => {
  const filenamePath = path.resolve(process.cwd(), filename)
  const md = await readFile(filenamePath, 'utf-8')

  return md
}

export default getRawdown
