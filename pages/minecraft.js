import useSWR from 'swr'
import Page from '@components/page'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const About = () => {
  const { data, error } = useSWR('/api/minecraft', fetcher, {
    refreshInterval: 2000
  })

  if (error)
    return (
      <Page description="Damn, I can't load server stats">
        <article>
          <h1 align="center">Oops, I failed to load data</h1>
        </article>
      </Page>
    )

  if (!data)
    return (
      <Page description="Hey, would you like to join my Minecraft server?">
        <article>
          <h1 align="center">Hold on, I'm loading...</h1>
        </article>
      </Page>
    )

  return (
    <Page description="Hey, would you like to join my Minecraft server?">
      <article>
        <img src={data.icon} alt="Minecraft Server Icon" />

        <p>
          Recently, I created my own Minecraft Server to enjoy my free time on
          my server. Feel free to join me if you want to spend some time with
          me! Also, you can view{' '}
          <a href="https://github.com/uwussimo/minecraft">
            <u>repository</u>
          </a>{' '}
          of my minecraft server where I synchronise all my changes.
        </p>

        <pre>
          <b>Online:</b> {data.online ? 'Yup' : 'Nope'}
          <br />
          <b>Players:</b> {data.players.online}/{data.players.max}
          <br />
          <b>Address:</b> {data.hostname}:{data.port}
          <br />
          <b>Software:</b> {data.software} {data.version}
          <br />
          <b>Message:</b> {data.motd.raw}
          <br />
        </pre>

        <h4>For Developers</h4>

        <pre>
          // GET: /api/minecraft
          <br />
          {JSON.stringify(data, null, 2)}
        </pre>
      </article>
    </Page>
  )
}

export default About
