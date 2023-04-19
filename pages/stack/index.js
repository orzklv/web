import React from 'react'

import Page from '@components/page'
import StacksList from '@components/stacks-list'
import getContents from '@lib/get-contents'

const Stack = ({ stacks }) => {
  return (
    <Page
      title="Stacks"
      description="Stacks which I abused in past & currently abusing."
    >
      <article>
        <ul>
          <StacksList stacks={stacks} />
        </ul>
      </article>
    </Page>
  )
}

export const getStaticProps = () => {
  const stacks = getContents('stacks', 'stack')

  return {
    props: {
      stacks,
    },
  }
}

export default Stack
