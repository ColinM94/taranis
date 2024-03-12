import { Props } from './types'
import styles from './styles.module.scss'
import { classes } from 'utils'

export const SettingsButton = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className={classes(styles.container, props.isActive && styles.active)}
    >
      {props.label}
    </button>
  )
}
