import React from 'react'

import Page from '@components/page'
import StacksList from '@components/stacks-list'
import getStacks from '@lib/get-stacks'

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
  const stacks = getStacks()

  return {
    props: {
      stacks,
    },
  }
}

export default Stack
