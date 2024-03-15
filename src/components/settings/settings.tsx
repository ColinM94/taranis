import * as React from 'react'

import { useGameStore } from 'store'
import { navigate } from 'utils'
import { Button } from 'components'

import { SettingsButton } from './components/settingsButton/settingsButton'
import { SettingsGraphics } from './components/settingsGraphics/settingsGraphics'
import { SettingsKeybinds } from './components/settingsKeybinds/settingsKeybinds'
import { SettingsControllers } from './components/settingsControllers/settingsControllers'

import styles from './styles.module.scss'
import { Props } from './types'

type Menu = 'graphics' | 'keybinds' | 'controllers'

export const Settings = (props: Props): JSX.Element => {
  const [activeMenu, setActiveMenu] = React.useState<Menu>('graphics')
  const game = useGameStore()

  const handleQuit = (): void => {
    navigate('mainMenu')
    game.setIsPaused(false)
  }

  const handleBack = () => {
    if (props.onBackClick) props.onBackClick()
    else if (props.type === 'mainMenu') navigate('mainMenu')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button type="icon" label="<" onClick={handleBack} className={styles.headerBackButton} />
        <div className={styles.headerTitle}>Settings</div>
      </div>

      <div className={styles.row}>
        <div className={styles.buttons}>
          {/* {props.type === 'pauseMenu' && (
            <SettingsButton label="Resume" onClick={() => game.update({ isPaused: false })} />
          )} */}

          <SettingsButton
            label="Graphics"
            isActive={activeMenu === 'graphics'}
            onClick={() => setActiveMenu('graphics')}
          />

          <SettingsButton
            label="Keybinds"
            isActive={activeMenu === 'keybinds'}
            onClick={() => setActiveMenu('keybinds')}
          />

          <SettingsButton
            label="Controllers"
            isActive={activeMenu === 'controllers'}
            onClick={() => setActiveMenu('controllers')}
          />

          {/* {props.type === 'pauseMenu' && <SettingsButton label="Quit Game" onClick={handleQuit} />} */}
        </div>

        <div className={styles.content}>
          {activeMenu === 'graphics' && <SettingsGraphics headingClassName={styles.heading} />}
          {activeMenu === 'keybinds' && <SettingsKeybinds headingClassName={styles.heading} />}
          {activeMenu === 'controllers' && (
            <SettingsControllers headingClassName={styles.heading} />
          )}
        </div>
      </div>
    </div>
  )
}
