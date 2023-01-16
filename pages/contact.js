import Page from '@components/page'

const Contact = () => {
  return (
    <Page title="Contact" footer={false} description="Get in touch.">
      <article>
        <p>Get in touch...</p>

        <blockquote>
          <a
            href="mailto:yuri@katsuki.moe?subject=Hewwo Yuwi... Iwd liwe to tawk with ya!"
            className="reset"
          >
            yuri@katsuki.moe
          </a>
        </blockquote>

        <p>...or follow me on telegram.</p>

        <blockquote>
          <a href="https://t.me/s/yurionblog" className="reset">
            @yurionblog
          </a>
        </blockquote>
      </article>
    </Page>
  )
}

export default Contact
