import Page from '@components/page'
import Entry from '@components/entry'

const Projects = () => {
  return (
    <Page title="Projects" description="Collection of past and present work.">
      <article>
        <Entry
          title="Vercel Design"
          description="The Vercel Design System"
          image="https://assets.zeit.co/image/upload/q_auto/front/assets/design/geist-card.png"
          href="https://zeit.co/design"
        />

        <Entry
          title="Dusk"
          description="Simple application icons"
          image="https://res.cloudinary.com/dsdlhtnpw/image/upload/v1572672667/dusk_o7qcsa.png"
          href="https://dusk.now.sh"
          position="top"
        />

        <Entry
          title="Songbird"
          description="Website for Songbird Healing Studio"
          image="https://res.cloudinary.com/dsdlhtnpw/image/upload/v1572672667/songbird_sb0kon.png"
          href="http://songbirdhealingstudio.com/"
          position="top"
        />
      </article>
    </Page>
  )
}

export default Projects
