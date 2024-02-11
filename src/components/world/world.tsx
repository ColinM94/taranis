import { classes } from 'utils'
import styles from './styles.module.scss'
import React, { ReactNode } from 'react'

interface Props {
  className?: string
}

type Cell = {
  x: number
  y: number
  explored: boolean
}

export const World = ({ className }: Props) => {
  const gridSize = 1000

  const grid = React.useCallback(() => {
    const rows: Cell[] = []

    for (let row = 0; row < gridSize; row++) {
      const cells: Cell[] = []

      for (let col = 0; col < gridSize; col++) {
        cells.push({ x: col, y: row, explored: false })
      }

      rows.push(...cells)
    }

    const grid: ReactNode[] = []

    rows.forEach((row, index) => {
      grid.push(
        <div key={row.x} className={styles.row}>
          {rows.slice(index * gridSize, (index + 1) * gridSize).map((cell) => (
            <div key={cell.y} className={styles.cell} />
          ))}
        </div>
      )
    })

    return grid
  }, [])

  return <div className={classes(styles.container, className)}>{grid()}</div>
}

// const { gold, food, wood, stone, setGold, setFood, setWood, setStone } = usePlayerStore()

// const gatherResource = (resource: string) => {
//   switch (resource) {
//     case 'gold':
//       setGold(gold + 1)
//       break
//     case 'food':
//       setFood(food + 1)
//       break
//     case 'wood':
//       setWood(wood + 1)
//       break
//     case 'stone':
//       setStone(stone + 1)
//       break
//     default:
//       break
//   }
// }

/* <div onClick={() => gatherResource('gold')} className={styles.test}>
    +1 Gold
  </div>
  <div onClick={() => gatherResource('food')} className={styles.test}>
    +1 Food
  </div>
  <div onClick={() => gatherResource('wood')} className={styles.test}>
    +1 Wood
  </div>
  <div onClick={() => gatherResource('stone')} className={styles.test}>
    +1 Stone
  </div> */
