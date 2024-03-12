import * as React from 'react'

import { useConfigStore, useGameStore, useInput } from 'store'
import { navigate } from 'utils'
import { Button, InputSlider, InputToggle } from 'components'

import styles from './styles.module.scss'

export const PauseMenu = (): JSX.Element | null => {
  const game = useGameStore()
  const config = useConfigStore()
  const input = useInput()

  const [activeMenu, setActiveMenu] = React.useState('main')

  const handleQuit = (): void => {
    navigate('mainMenu')
    game.setIsPaused(false)
  }

  if (!game.isPaused) return null

  React.useEffect(() => {
    const unsub = input.createCallback('pause', () => {
      game.setIsPaused(false)
    })

    return () => {
      unsub()
    }
  }, [game.isPaused])

  React.useEffect(() => {
    setActiveMenu('main')
  }, [])

  const title = React.useMemo(() => {
    if (activeMenu === 'keybinds') return 'Keybinds'
    if (activeMenu === 'graphics') return 'Graphics'
    return 'Game Paused'
  }, [activeMenu])

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>

      {/* {activeMenu === 'keybinds' && (
        <div className={styles.menu}>
          <SettingsKeybinds className={styles.section} />
          <SettingsControllers className={styles.section} />
        </div>
      )} */}

      {activeMenu === 'graphics' && (
        <div className={styles.menu}>
          <div className={styles.menuHeading}>Field of View</div>
          <InputSlider
            value={config.fov}
            setValue={(fov) => config.update({ fov })}
            min={70}
            max={120}
          />

          <div className={styles.menuHeading}>Show Wireframes</div>
          <InputToggle
            value={config.showWireframes}
            setValue={(showWireframes) => config.update({ showWireframes })}
          />

          <div className={styles.menuHeading}>Show Physics Debug</div>
          <InputToggle
            value={config.showPhysicsDebug}
            setValue={(showPhysicsDebug) => config.update({ showPhysicsDebug })}
          />

          <div className={styles.menuHeading}>Day/Night Cycle</div>
          <InputToggle
            value={config.dayNightCycle}
            setValue={(dayNightCycle) => config.update({ dayNightCycle })}
          />

          <div className={styles.menuHeading}>Day/Night Cycle Speed</div>
          <InputSlider
            value={config.dayNightCycleSpeed}
            setValue={(dayNightCycleSpeed) => config.update({ dayNightCycleSpeed })}
            min={100}
            max={500}
          />
        </div>
      )}

      {activeMenu === 'main' && (
        <div className={styles.buttons}>
          <button onClick={() => game.setIsPaused(false)} className={styles.button}>
            Resume
          </button>

          <br />

          <button onClick={() => setActiveMenu('graphics')} className={styles.button}>
            Graphics
          </button>
          <button onClick={() => setActiveMenu('keybinds')} className={styles.button}>
            Keybinds
          </button>

          <br />

          <button onClick={handleQuit} className={styles.button}>
            Quit to Main Menu
          </button>
        </div>
      )}
    </div>
  )
}
