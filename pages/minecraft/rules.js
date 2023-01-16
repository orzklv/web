import Page from '@components/page'
import Link from 'next/link'

const Rules = () => {
  return (
    <Page description="Hey, would you like to join my Minecraft server?">
      <p>
        <Link href="/minecraft">← Back to stats</Link>
      </p>

      <h2 align="center">Rules to know before you start playing...</h2>

      <article>
        <p>
          <blockquote>
            Everything seems beautiful when the one and only beautiful law
            exists...
            <br />
            <div align="right">© UwUssimo Robinson</div>
          </blockquote>
        </p>
        <h3>In order to avoid booming server, we created a set of rules</h3>
        <ul>
          <li>Don&#39;t destroy something without a meaningful reason</li>
          <li>PVP isn&#39;t allowed except special PVP places & bases</li>
          <li>
            Don&#39;t touch anything built by <b>System Builders</b> team
          </li>
          <li>
            Shaders and optimizers are ok, but we hate plugins and cheats!
          </li>
          <li>
            Don&#39;t even talk about changing Vanilla core to something
            Spigotish
          </li>
          <li>
            Don&#39;t flame chat or write hate speech towards to someone.
            Cursing is ok...
          </li>
          <li>
            Don&#39;t boom TNTs nearby to lobby or try to bed trap someone
          </li>
          <li>Do your experiments in your base, not random located area</li>
          <li>Exploiting some user is strictly disallowed</li>
        </ul>
        Breaking any above these stated rules might result <b>IP Bans</b> which
        will last likely forever. Keep in mind that VPN gives you only one
        dedicated IP address whereas you have only one attempt to enjoy the
        server after getting banned. If your VPN&#39;s ip either gets banned,
        this is the end of your journey in my minecraft server :)
        <h3>Exceptions</h3>
        <ul>
          <li>
            Only team <b>System Builders</b> are allowed to use Map plugins
          </li>
          <li>
            If team <b>System Builders</b> admins run out of resources, they are
            allowed to use /give if they wish
          </li>
          <li>
            If someone gets admin stats, he/she isn&#39;t allowed to put blocks
            anymore or interact with the world. Only watch and protect rights of
            players.
          </li>
        </ul>
      </article>
    </Page>
  )
}

export default Rules
