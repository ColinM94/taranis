import React from 'react'
import ReactDOM from 'react-dom/client'

import backgroundImage from 'assets/images/background.jpg'
import { useGameStore } from 'store'
import { GameScreen, MainMenuScreen, PreloaderScreen, SettingsScreen } from 'screens'
import { PauseMenu } from 'components'
import { Game } from './game'
import { Controls } from './controls'

import styles from './styles/main.module.scss'
import 'styles/global.scss'

const Main = (): JSX.Element => {
  const { activeScreen, isPaused } = useGameStore()

  return (
    <div className={styles.container}>
      <Controls />

      <div className={styles.screens}>
        <img src={backgroundImage} className={styles.backgroundImage} />
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
