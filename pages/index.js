import Page from '@components/page'
import Link from '@components/link'
import Spotify from '@components/spotify/now-listening'

const Index = () => {
  return (
    <Page description="Hi, I'm Yuri. Senior Dorito Enjoyer, Linux enthusiast, practicing minimalist, and electronic lover in search of good dota team without aggressive russian kids.">
      <article>
        <h1 className="hero">Yuri Katsuki (๑╹ω╹๑)</h1>

        <p>
          Senior Dorito Enjoyer,{' '}
          <Link underline href="/keyboards">
            keyboard
          </Link>{' '}
          enthusiast, practicing minimalist, and{' '}
          <Link underline href="/music">
            electronic lover
          </Link>{' '}
          in search of good Rust macro.{' '}
          <Link underline href="/blog">
            Writing
          </Link>{' '}
          about my coding style and some extra shit.
        </p>

        <p>
          Working at{' '}
          <Link underline href="https://uzinfocom.uz/uz/" external>
            Uzinfocom
          </Link>{' '}
          to make Uzbekistan more survivable. Mostly, I maintain{' '}
          <Link underline href="https://github.com/uzinfocom-org" external>
            Uzinfocom Open Source Organization.
          </Link>
        </p>

        <p align="center">
          ⌘K or Alt+K to let the dark magic happen or press the ⌘ button on
          navigation menu...
        </p>

        <Spotify />
      </article>
    </Page>
  )
}

export default Index
