import { getNowPlaying } from '@lib/spotify'

const base = 'https://www.katsuki.moe/music'

export default async (_, res) => {
  const response = await getNowPlaying()

  if (response.status === 204 || response.status > 400) {
    return res.redirect(base)
  }

  const song = await response.json()
  const isPlaying = song.is_playing
  const songUrl = song.item.external_urls.spotify

  return isPlaying ? res.redirect(songUrl) : res.redirect(base)
}
