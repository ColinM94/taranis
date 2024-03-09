import { GameScreen, MainMenuScreen, PreloaderScreen, SettingsScreen } from 'screens'
import { PauseMenu } from 'components'
import { useGameStore } from 'store'

import { Controls } from './controls'
import { Game } from './game'
import 'styles/global.scss'
import styles from './styles/main.module.scss'

export const Main = (): JSX.Element => {
  const { activeScreen, isPaused } = useGameStore()

  return (
    <div className={styles.container}>
      <Controls />

      <div className={styles.screens}>
        {activeScreen.name === 'preloader' && <PreloaderScreen />}
        {activeScreen.name === 'mainMenu' && <MainMenuScreen {...activeScreen.params} />}
        {activeScreen.name === 'settings' && <SettingsScreen />}
      </div>

      {activeScreen.name === 'game' && (
        <Game className={styles.game}>
          <GameScreen />
        </Game>
      )}

      {isPaused && <div className={styles.ui}>{<PauseMenu />}</div>}
    </div>
  )
}
