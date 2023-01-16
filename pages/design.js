import { join } from 'path'
import { promises } from 'fs'
import Page from '@components/page'
import Entry from '@components/entry'
import TextEntry from '@components/entry/text'

const Design = ({ data }) => {
  const imageItems = data.filter((x) => x.image)
  const nonImageItems = data.filter((x) => !x.image)

  return (
    <Page
      title="Design"
      description="Collection of beautiful websites and portfolios that I admire."
    >
      <article>
        {imageItems.map((entry) => {
          return (
            <Entry
              key={`${entry.title}-${entry.url}`}
              title={entry.title}
              image={entry.image}
              href={entry.url}
              type={entry.key}
              description={entry.description}
            />
          )
        })}

        {nonImageItems.map((entry) => {
          return (
            <TextEntry
              key={`${entry.title}-${entry.url}`}
              title={entry.title}
              image={entry.image}
              href={entry.url}
              type={entry.key}
              description={entry.description}
            />
          )
        })}
      </article>
    </Page>
  )
}

export const getStaticProps = async () => {
  const file = await promises.readFile(join('./data', 'design.json'), {
    encoding: 'utf8',
  })
  const parsed = JSON.parse(file)

  return {
    props: { data: parsed.data },
  }
}

export default Design
