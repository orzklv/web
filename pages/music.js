import Page from '@components/page'
import Entry from '@components/entry'

// Data
import { data as items } from '@data/music.json'
import Spotify from '@components/spotify'

const Music = () => {
  return (
    <Page title="Music" description="Collection of exemplary electronic music.">
      <article>
        <h1>Spotify Now Listening</h1>
        <Spotify />

        <h1>List of collected musics</h1>
        {items.map((entry) => {
          return (
            <Entry
              key={entry.title}
              title={entry.title}
              image={entry.image}
              href={entry.url}
              description={entry.description}
            />
          )
        })}
      </article>
    </Page>
  )
}

export default Music
