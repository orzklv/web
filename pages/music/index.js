import { join } from 'path'
import { promises } from 'fs'
import Page from '@components/page'
import Entry from '@components/entry'
import Spotify from '@components/spotify/now-listening'

const Music = ({ items }) => {
  return (
    <Page title="Music" description="Collection of exemplary electronic music.">
      <article>
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

export const getStaticProps = async () => {
  const file = await promises.readFile(join('./data', 'music.json'), {
    encoding: 'utf8',
  })
  const parsed = JSON.parse(file)

  return {
    props: { items: parsed.data },
  }
}

export default Music
