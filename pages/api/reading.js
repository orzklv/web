import reading from '@data/reading.json'

export default async function handler(req, res) {
  return res.status(200).json(reading)
}
