// Show Spotify's Callback Code
export default async function handler(req, res) {
  return res.status(200).json({
    content: req.query.code,
  })
}
