import Post from '@components/post'
import renderMarkdown from '@lib/render-markdown'
import getContents from '@lib/get-contents'

const PostPage = (props) => {
  return <Post {...props} />
}

export const getStaticProps = ({ params: { slug } }) => {
  const posts = getContents('posts', 'blog')
  const postIndex = posts.findIndex((p) => p.slug === slug)
  const post = posts[postIndex]
  const { body, ...rest } = post

  return {
    props: {
      previous: posts[postIndex + 1] || null,
      next: posts[postIndex - 1] || null,
      ...rest,
      html: renderMarkdown(body),
    },
  }
}

export const getStaticPaths = () => {
  return {
    paths: getContents('posts', 'blog').map((p) => `/blog/${p.slug}`),
    fallback: false,
  }
}

export default PostPage
