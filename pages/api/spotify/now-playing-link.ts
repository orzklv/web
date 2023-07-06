import { getNowPlaying } from '@lib/spotify'
import { NextApiRequest, NextApiResponse } from 'next'
import { Spotify } from '@type/Spotify'

const base = 'https://www.orzklv.uz/music'

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const response = await getNowPlaying()

  if (response.status === 204 || response.status > 400) {
    return res.redirect(base)
  }

  const song: Spotify = await response.json()
  const isPlaying = song.is_playing
  const songUrl = song.item.external_urls.spotify

  return isPlaying ? res.redirect(songUrl) : res.redirect(base)
}
