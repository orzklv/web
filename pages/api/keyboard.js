import keyboard from '@data/keyboards.json'

export default async function handler(req, res) {
  return res.status(200).json(keyboard)
}
