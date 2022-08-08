// base64 encoded code
// M2RiNWZlMTg1ZjljNGQwNGJmOTI3ZWE5MjJmNDM5MWM6Y2YyZDI2OTYwYzViNDNkMTlkZTZhNWY4NmU2ZDc2NmM

// https://uwussi.moe/spotify/callback?code=AQCr9VL_fwovyVWNuJ1BlOSiBFCW0RVxRtnH0-DBog9vn-gECUWASPS8DRAyz32IxAp6kyH8ExYWYM4bxKFM2RoNKaQRLsYKySK2JMl3mNuZOkYOsuX5XNBVi1clbnAB3MBcI1kf7Ku7t5l5PuDvJJ0zeR308evofnTQ7po4k9MIVntkn8a7Lii1SMID0IcaiAvCA-TG41nwtCuUFJF-Qdv05d8Gn1XQZJYLNLa_ZoyFKJM
import { getNowPlaying } from '@lib/spotify';

export default async (_, res) => {
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ isPlaying: false });
  }

  const song = await response.json();
  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  return res.status(200).json({
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title
  });
};
