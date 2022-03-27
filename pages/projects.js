import Page from '@components/page'
import Entry from '@components/entry'

const Projects = () => {
  return (
    <Page title="Projects" description="Collection of past and present work.">
      <article>
        <Entry
          title="Mad Maids"
          description="An organization that helps young developers"
          image="https://raw.githubusercontent.com/mad-maids/.github/main/profile/banners.png"
          href="https://maid.uz"
        />

        <Entry
          title="Xinux Uzbekistan"
          description="Linux community created in Uzbekistan to develop Linux"
          image="https://repository-images.githubusercontent.com/331039158/a3990580-848a-11eb-974b-412c7e313f33"
          href="https://xinux.uz/"
          position="top"
        />

        <Entry
          title="Osmon"
          description="A programming language created for Uzbek audience"
          image="https://www.osmon.dev/og.png"
          href="https://osmon.dev"
          position="top"
        />
      </article>
    </Page>
  )
}

export default Projects
