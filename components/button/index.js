import styles from './button.module.css'
import { forwardRef } from 'react'

const Button = forwardRef(({ onClick, children, disabled }, ref) => {
  return (
    <button
      onClick={onClick}
      className={styles.button}
      disabled={disabled}
      ref={ref}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
