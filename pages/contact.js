import Page from '@components/page'

const Contact = () => {
  return (
    <Page title="Contact" footer={false} description="Get in touch.">
      <article>
        <p>Get in touch...</p>

        <blockquote>
          <a
            href="mailto:sakhib@orzklv.uz?subject=Hello Sokhibjon... I'd like to talk with you about ...!"
            className="reset"
          >
            sakhib@orzklv.uz
          </a>
          <br />
          <a
            href="mailto:sakhib@orzklv.uz?subject=Hello Sokhibjon... I'd like to talk with you about ...!"
            className="reset"
          >
            sakhib@khakimovs.uz
          </a>
        </blockquote>

        <p>...or follow me on telegram...</p>

        <blockquote>
          <a href="https://t.me/s/orzklvb" className="reset">
            @orzklvb
          </a>
        </blockquote>

        <p>...emmm, maybe twitter?</p>

        <blockquote>
          <a href="https://twitter.com/orzklv" className="reset">
            @orzklv
          </a>
        </blockquote>
      </article>
    </Page>
  )
}

export default Contact
