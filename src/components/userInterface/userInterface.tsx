import { World } from 'components/world/world'
import { BottomBar } from './components/bottomBar/bottomBar'
import styles from './styles.module.scss'

export const UserInterface = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <World className={styles.world} />
      </div>
      <BottomBar className={styles.bottomBar} />
    </div>
  )
}
