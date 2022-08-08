import useSWR from 'swr'
import Link from 'next/link'
import Entry from '@components/entry'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

const Spotify = () => {
  const { data, error } = useSWR(
    '/api/spotify/now-playing',
    fetcher,
    {
      refreshInterval: 1000,
    }
  )

  if (error) return <p align="center">Oops, I failed to load data</p>

  if (!data) return <p align="center">Hold on, I&#39;m loading...</p>

  if (!data.isPlaying)
    return (
      <>
        <p align="center">
          My spotify is offline, seems like I&apos;m in an important meeting...
        </p>
      </>
    )

  return (
    <Entry
      key={data.artist + data.title}
      title={data.title}
      image={data.albumImageUrl}
      href={data.songUrl}
      description={data.artist}
    />
  )
}

export default Spotify
