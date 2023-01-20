import Page from '@components/page'
import Entry from '@components/entry/index'

// Data
import client from '@lib/apollo'
import { gql } from '@apollo/client'

const Reading = ({ sponsors }) => {
  console.log(sponsors)
  return (
    <Page title="Sponsors" description="People who support my work and effort!">
      <article>
        <h1 align="center">People who support my work!</h1>

        {sponsors.map((entry) => {
          return (
            <Entry
              key={entry.id}
              title={entry.name}
              image={entry.avatarUrl}
              href={entry.url}
              description={entry.bio}
            />
          )
        })}
      </article>
    </Page>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Sponsors {
        user(login: "katsuki-yuri") {
          sponsors(first: 100) {
            nodes {
              ... on User {
                id
                name
                avatarUrl
                bio
                url
              }
            }
          }
        }
      }
    `,
  })

  return {
    props: {
      sponsors: data.user.sponsors.nodes,
    },
  }
}

export default Reading
