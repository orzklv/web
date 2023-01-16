import { join } from 'path'
import { promises } from 'fs'
import Page from '@components/page'
import Entry from '@components/entry'

const Keyboards = ({ items }) => {
  return (
    <Page
      title="Keyboards"
      description="Collection of beautiful 60%, 65%, and TKL keyboards."
    >
      <article>
        {items.map((entry) => {
          return (
            <Entry
              key={`${entry.title}-${entry.url}`}
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
  const file = await promises.readFile(join('./data', 'keyboards.json'), {
    encoding: 'utf8',
  })
  const parsed = JSON.parse(file)

  return {
    props: { items: parsed.data },
  }
}

export default Keyboards
