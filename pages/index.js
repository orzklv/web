import Page from '@components/page'
import Link from '@components/link'

const About = () => {
  return (
    <Page description="Hi, I'm UwUssimo. Senior UwU Developer, Linux enthusiast, practicing minimalist, and electronic lover in search of good dota team without aggressive russian kids.">
      <article>
        <h1 className="hero">UwUssimo Robinson (๑╹ω╹๑)</h1>

        <p>
          Senior UwU Developer,{' '}
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
          to make Uzbekistan more survivable.
        </p>

        <p align="center">
          ⌘K or Alt+K to let the dark magic happen or press the ⌘ button on
          navigation menu...
        </p>
      </article>
    </Page>
  )
}

export default About
