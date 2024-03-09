import * as React from 'react'

import { useInput } from 'store'
import { classes, navigate } from 'utils'
import { gameName } from 'config'
import { Button } from 'components'
import themeSong from 'assets/music/taranis.mp3'
import backgroundImage from 'assets/images/background.jpg'

import styles from './styles.module.scss'
import { MainMenuScreenProps } from './types'

export const MainMenuScreen = ({ showClickToStart }: MainMenuScreenProps): JSX.Element => {
  const input = useInput()

  const audio = React.useRef<HTMLAudioElement>(null)

  const [selectedButton, setSelectedButton] = React.useState(0)
  const [showMenu, setShowMenu] = React.useState(!showClickToStart)

  const handleQuit = () => {
    if (window.confirm('Are you sure you want to quit?')) {
      window.close()
    }
  }

  const handleNavigate = React.useCallback(() => {
    console.log('navigateTo', selectedButton)

    if (selectedButton === 0) navigate('game')
    if (selectedButton === 1) navigate('settings')
    if (selectedButton === 2) handleQuit()
  }, [selectedButton])

  React.useEffect(() => {
    const unsubscribe = input.createCallback('uiUp', () => {
      setSelectedButton((prev) => Math.max(0, prev - 1))
    })

    const unsubscribe2 = input.createCallback('uiDown', () => {
      setSelectedButton((prev) => Math.min(2, prev + 1))
    })

    const unsubscribe3 = input.createCallback('uiSelect', () => {
      handleNavigate()
    })

    return () => {
      unsubscribe()
      unsubscribe2()
      unsubscribe3()
    }
  }, [selectedButton])

  console.log('show')

  React.useEffect(() => {
    if (showMenu) {
      audio.current?.play()
    }
  }, [showMenu])

  return (
    <>
      <img src={backgroundImage} className={styles.backgroundImage} />

      {showClickToStart && (
        <div
          onClick={() => setShowMenu(true)}
          className={classes(styles.start, showMenu && styles.fadeOut)}
        >
          Click to Start
        </div>
      )}

      <div
        className={classes(
          styles.container,
          showClickToStart && showMenu && styles.fadeIn,
          showClickToStart && styles.invisible
        )}
      >
        <audio ref={audio} id="audioPlayer" src={themeSong} loop />

        <div className={styles.gameName}>{gameName}</div>

        <div className={styles.buttons}>
          <Button
            label="Start Game"
            type="text"
            onClick={() => navigate('game')}
            onMouseOver={() => setSelectedButton(0)}
            className={classes(styles.button, selectedButton === 0 && styles.buttonSelected)}
          />

          <Button
            label="Settings"
            type="text"
            onClick={() => navigate('settings')}
            onMouseOver={() => setSelectedButton(1)}
            className={classes(styles.button, selectedButton === 1 && styles.buttonSelected)}
          />

          <Button
            label="Quit"
            type="text"
            onClick={handleQuit}
            onMouseOver={() => setSelectedButton(2)}
            className={classes(styles.button, selectedButton === 2 && styles.buttonSelected)}
          />
        </div>

        <div className={styles.copyright}>&copy;{new Date().getFullYear()} Colin Maher</div>
      </div>
    </>
  )
}
