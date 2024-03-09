import { classes } from 'utils'

import { InputToggleProps } from './types'
import styles from './styles.module.scss'

export const InputToggle = (props: InputToggleProps): JSX.Element => {
  const { value, setValue, className } = props

  return (
    <div onClick={() => setValue(!value)} className={classes(styles.container, className)}>
      <div className={classes(styles.knob, value ? styles.knobActive : styles.knobInactive)} />
    </div>
  )
}
