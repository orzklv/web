import { getNowPlaying } from '@lib/spotify'
import { NextApiRequest, NextApiResponse } from 'next'
import { Spotify } from '@type/Spotify'

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const response = await getNowPlaying()

  console.log(await response.text())

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false })
  }

  const song: Spotify = await response.json()
  const isPlaying = song.is_playing
  const title = song.item.name
  const artist = song.item.artists.map((_artist) => _artist.name).join(', ')
  const album = song.item.album.name
  const albumImageUrl = song.item.album.images[0].url
  const songUrl = song.item.external_urls.spotify

  return res.status(200).json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  })
}
