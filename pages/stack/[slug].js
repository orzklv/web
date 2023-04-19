import Stack from '@components/stack'
import renderMarkdown from '@lib/render-markdown'
import getContents from '@lib/get-contents'

const StackPage = (props) => {
  return <Stack {...props} />
}

export const getStaticProps = ({ params: { slug } }) => {
  const stacks = getContents('stacks', 'stack')
  const stackIndex = stacks.findIndex((p) => p.slug === slug)
  const stack = stacks[stackIndex]
  const { body, ...rest } = stack

  return {
    props: {
      previous: stacks[stackIndex + 1] || null,
      next: stacks[stackIndex - 1] || null,
      ...rest,
      html: renderMarkdown(body),
    },
  }
}

export const getStaticPaths = () => {
  return {
    paths: getContents('stacks', 'stack').map((p) => `/stack/${p.slug}`),
    fallback: false,
  }
}

export default StackPage
