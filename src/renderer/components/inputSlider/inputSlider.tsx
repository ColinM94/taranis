import * as React from 'react'
import { classes } from 'utils'
import styles from './styles.module.scss'
import { InputSliderProps } from './types'

export const InputSlider = (props: InputSliderProps): JSX.Element => {
  const { value, setValue, min, max, className } = props

  const percentage = React.useMemo(() => ((value - min) / (max - min)) * 100, [value, min, max])

  const onReduceClick = (): void => {
    if (value > min) setValue(value - 1)
  }

  const onIncreaseClick = (): void => {
    if (value < max) setValue(value + 1)
  }

  const sections = React.useMemo(() => {
    const tempSections: JSX.Element[] = []

    for (let i = min; i < max + 1; i++) {
      tempSections.push(<div key={i} onClick={() => setValue(i)} className={styles.section} />)
    }

    return tempSections
  }, [])

  return (
    <div className={classes(styles.container, className)}>
      <div onClick={onReduceClick} className={styles.button}>
        {'<'}
      </div>

      <div onClick={(e) => console.log(e)} className={styles.bar}>
        <div className={styles.sections}>{sections}</div>

        <div
          style={{ width: `${percentage}%` }}
          onResize={(e) => console.log(e)}
          draggable
          onDrag={(e) => console.log(e)}
          onDragStart={(e) => console.log(e)}
          className={styles.tab}
        />

        <div className={styles.value}>{value}</div>
      </div>

      <div onClick={onIncreaseClick} className={styles.button}>
        {'>'}
      </div>
    </div>
  )
}
