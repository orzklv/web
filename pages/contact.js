import Page from '@components/page'

const Contact = () => {
  return (
    <Page title="Contact" footer={false} description="Get in touch.">
      <article>
        <p>Get in touch.</p>

        <blockquote>
          <a href="mailto:uwussimo@icloud.com?subject=Hello" className="reset">
            uwussimo@icloud.com
          </a>
        </blockquote>
      </article>
    </Page>
  )
}

export default Contact
