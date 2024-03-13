import { classes } from 'utils'

import { InputToggleProps } from './types'
import styles from './styles.module.scss'

export const InputToggle = (props: InputToggleProps): JSX.Element => {
  const { value, setValue, className } = props

  return (
    <div onClick={() => setValue(!value)} className={classes(styles.container, className)}>
      <div className={classes(styles.knob, value ? styles.knobActive : styles.knobInactive)} />
      <div className={styles.option1}>Low</div>
      <div className={styles.option2}>Medium</div>
      <div className={styles.option3}>High</div>
    </div>
  )
}
