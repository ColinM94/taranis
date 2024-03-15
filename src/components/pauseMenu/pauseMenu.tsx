import * as React from 'react'

import { useGameStore, useInput } from 'store'
import { navigate } from 'utils'

import styles from './styles.module.scss'
import { Settings } from 'components'

export const PauseMenu = (): JSX.Element | null => {
  const game = useGameStore()
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

      {activeMenu === 'settings' && (
        <Settings type="pauseMenu" onBackClick={() => setActiveMenu('main')} />
      )}

      {activeMenu === 'main' && (
        <div className={styles.buttons}>
          <button onClick={() => game.setIsPaused(false)} className={styles.button}>
            Resume
          </button>

          <button onClick={() => setActiveMenu('settings')} className={styles.button}>
            Settings
          </button>

          <button onClick={handleQuit} className={styles.button}>
            Quit to Main Menu
          </button>
        </div>
      )}
    </div>
  )
}
