import { classes } from 'utils'

import styles from './styles.module.scss'
import { InputOptionsProps } from './types'

export const InputOptions = <T,>(props: InputOptionsProps<T>): JSX.Element => {
  const { options, value, setValue, className } = props

  const option = () => {
    return options.map((item, index) => {
      return (
        <div
          key={index}
          onClick={() => setValue(item.value)}
          className={classes(styles.option, value === item.value && styles.optionActive)}
        >
          {item.label}
        </div>
      )
    })
  }

  return (
    <div className={classes(styles.container, className)}>
      {/* <div className={classes(styles.knob, value ? styles.knobActive : styles.knobInactive)} /> */}
      {option()}
    </div>
  )
}
