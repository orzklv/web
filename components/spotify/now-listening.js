import useSWR from 'swr'
import Entry from '@components/entry'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Spotify = () => {
  const { data, error } = useSWR('/api/spotify/now-playing', fetcher, {
    refreshInterval: 3000,
  })

  if (error)
    return <p align="center">Oops, I failed to load data from Spotify</p>

  if (!data)
    return <p align="center">Let me check if I&#39;m listening on Spotify...</p>

  if (!data.isPlaying) return <></>

  return (
    <>
      <h2 align="center">Listening on Spotify</h2>
      <Entry
        key={data.artist + data.title}
        title={data.title}
        image={data.albumImageUrl}
        href={data.songUrl}
        description={data.artist}
      />
    </>
  )
}

export default Spotify
