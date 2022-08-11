import useSWR from 'swr'
import Link from 'next/link'
import Entry from '@components/entry'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Spotify = () => {
  const { data, error } = useSWR('/api/spotify/now-playing', fetcher, {
    refreshInterval: 1000,
  })

  if (error)
    return <p align="center">Oops, I failed to load data from Spotify</p>

  if (!data)
    return <p align="center">Let me check if I&#39;m listening on Spotify...</p>

  if (!data.isPlaying) return <></>

  return (
    <Entry
      key={data.artist + data.title}
      title="Now Listening"
      image={data.albumImageUrl}
      href={data.songUrl}
      description={data.title + ' - ' + data.artist}
    />
  )
}

export default Spotify
