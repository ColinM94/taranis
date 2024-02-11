import { classes } from 'utils'
import { Stat } from 'components'
import { usePlayerStore } from 'store'

import styles from './styles.module.scss'

interface Props {
  className?: string
}

export const BottomBar = ({ className }: Props) => {
  const { gold, food, wood, stone } = usePlayerStore()

  return (
    <div className={classes(styles.container, className)}>
      <Stat label="Gold" value={gold} />
      <Stat label="Food" value={food} />
      <Stat label="Wood" value={wood} />
      <Stat label="Stone" value={stone} />
    </div>
  )
}
