import { useState } from 'react'

import TextEntry from '@components/entry/text'
import styles from './stacks-list.module.css'

const Stacks = ({ slug, stacks, paginate }) => {
  const [showMore, setShowMore] = useState(3)

  return (
    <div className={styles.container}>
      {stacks.slice(0, paginate ? showMore : undefined).map((stack) => {
        const date = new Date(stack.date).toLocaleDateString('default', {
          month: 'numeric',
          day: 'numeric',
        })

        return (
          <TextEntry
            key={`stack-item-${stack.slug}`}
            href="/stack/[slug]"
            as={`/stack/${stack.slug}`}
            title={stack.title}
            type={date}
            description={stack.description}
          />
        )
      })}
      {paginate && showMore < stacks.length && (
        <button
          onClick={() => {
            setShowMore(showMore + 3)
          }}
          className={styles.button}
        >
          Show More
        </button>
      )}
    </div>
  )
}

export default Stacks
