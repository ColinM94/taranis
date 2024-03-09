import { MainMenuScreen, SettingsScreen } from 'screens'
import { PreloaderScreen } from 'screens/preloaderScreen/preloaderScreen'
import { GameScreen } from 'screens/gameScreen/gameScreen'
import { PauseMenu } from 'components'
import 'styles/global.scss'
import { Controls } from './controls'

import styles from './styles/main.module.scss'
import { Game } from './game'
import { useGameStore } from './store'

export const Main = () => {
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

      <div className={styles.ui}>{isPaused && <PauseMenu />}</div>
    </div>
  )
}
