import * as React from 'react'

import { useGameStore, useInput } from 'store'
import { navigate } from 'utils'
import { SettingsKeybinds } from 'screens/settingsScreen/components/settingsKeybinds/settingsKeybinds'
import { SettingsControllers } from 'screens/settingsScreen/components/settingsControllers/settingsControllers'
import { Button, InputSlider, InputToggle } from 'components'

import styles from './styles.module.scss'

export const PauseMenu = (): JSX.Element | null => {
  const {
    isPaused,
    setIsPaused,
    fov,
    setFov,
    showWireframes,
    setShowWireframes,
    dayNightCycle,
    setDayNightCycle,
    dayNightCycleSpeed,
    setDayNightCycleSpeed
  } = useGameStore()
  const input = useInput()

  const [activeMenu, setActiveMenu] = React.useState('main')

  const handleQuit = (): void => {
    navigate('mainMenu')
    setIsPaused(false)
  }

  if (!isPaused) return null

  React.useEffect(() => {
    const unsub = input.createCallback('pause', () => {
      setIsPaused(false)
    })

    return () => {
      unsub()
    }
  }, [isPaused])

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

      {activeMenu !== 'main' && (
        <Button
          type="icon"
          label="X"
          onClick={() => setActiveMenu('main')}
          className={styles.backButton}
        />
      )}

      {activeMenu === 'keybinds' && (
        <div className={styles.menu}>
          <SettingsKeybinds className={styles.section} />
          <SettingsControllers className={styles.section} />
        </div>
      )}

      {activeMenu === 'graphics' && (
        <div className={styles.menu}>
          <div className={styles.menuHeading}>Field of View</div>
          <InputSlider value={fov} setValue={setFov} min={70} max={120} />

          <div className={styles.menuHeading}>Show Wireframes</div>
          <InputToggle value={showWireframes} setValue={setShowWireframes} />

          <div className={styles.menuHeading}>Day/Night Cycle</div>
          <InputToggle
            value={dayNightCycle}
            setValue={() => {
              setDayNightCycle(!dayNightCycle)
            }}
          />

          <div className={styles.menuHeading}>Day/Night Cycle Speed</div>
          <InputSlider
            value={dayNightCycleSpeed * 100}
            setValue={(value) => setDayNightCycleSpeed(value / 100)}
            min={1}
            max={500}
          />
        </div>
      )}

      {activeMenu === 'main' && (
        <div className={styles.buttons}>
          <button onClick={() => setIsPaused(false)} className={styles.button}>
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
