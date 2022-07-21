import Stack from '@components/stack'
import renderMarkdown from '@lib/render-markdown'
import getStacks from '@lib/get-stacks'

const StackPage = (props) => {
  return <Stack {...props} />
}

export const getStaticProps = ({ params: { slug } }) => {
  const stacks = getStacks()
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
    paths: getStacks().map((p) => `/stack/${p.slug}`),
    fallback: false,
  }
}

export default StackPage
