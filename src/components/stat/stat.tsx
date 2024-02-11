import styles from './styles.module.scss'

interface Props {
  label: string
  value: string | number
  onClick?: () => void
}

export const Stat = ({ label, value, onClick }: Props) => {
  return (
    <div onClick={onClick} className={styles.container}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  )
}
