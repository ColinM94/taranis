import * as React from 'react'

import { ControllerState, useControllerStore } from 'store'
import { classes } from 'utils'

import styles from './styles.module.scss'
import { Props } from './types'

export const SettingsControllers = ({ headingClassName }: Props): JSX.Element => {
  const controllers = useControllerStore()

  const render = React.useMemo(() => {
    const items: JSX.Element[] = []

    for (let i = 0; i < 4; i++) {
      const index = i as keyof ControllerState
      const isConnected = controllers[index].isConnected

      items.push(
        <div
          key={i}
          className={classes(styles.controller, isConnected && styles.controllerConnected)}
        >
          <div className={styles.name}>#{i + 1}</div>
          <div className={styles.status}>{isConnected ? 'Connected' : 'Not Connected'}</div>
        </div>
      )
    }

    return items
  }, [controllers])

  return (
    <>
      <div className={styles.controllers}>{render}</div>
    </>
  )
}
