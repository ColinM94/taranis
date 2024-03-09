import styles from './styles.module.scss'
import { Props } from './types'

export const SettingsSectionHeader = ({ label, onReset }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>

      {onReset && (
        <div onClick={onReset} className={styles.action}>
          Reset to Default
        </div>
      )}
    </div>
  )
}
