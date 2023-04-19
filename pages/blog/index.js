import React from 'react'

import Page from '@components/page'
import PostsList from '@components/posts-list'
import getContents from '@lib/get-contents'

const Blog = ({ posts }) => {
  return (
    <Page title="Blog" description="Writing about design and code.">
      <article>
        <ul>
          <PostsList posts={posts} />
        </ul>
      </article>
    </Page>
  )
}

export const getStaticProps = () => {
  const posts = getContents('posts', 'blog')

  return {
    props: {
      posts,
    },
  }
}

export default Blog
