import * as React from 'react'

import { useInput } from 'store'
import { classes } from 'utils'
import { keybindKeys } from 'consts'
import { KeybindKey, keyNames } from 'config'
import { Bind } from 'types'

import { SettingsSectionHeader } from '../settingsSectionHeader/settingsSectionHeader'
import { Props } from './types'
import styles from './styles.module.scss'

type SelectedOption = {
  keybindKey: KeybindKey
  index: number
}

export const SettingsKeybinds = ({ className }: Props): JSX.Element => {
  const input = useInput()

  const [selectedOption, setSelectedOption] = React.useState<SelectedOption | null>(null)

  const handleReset = (): void => {
    input.reset()
  }

  const handleKeyDown = (e: KeyboardEvent): void => {
    updateKeyBind(`keyboard:${e.code}` as Bind)
  }

  const updateKeyBind = (bind: Bind): void => {
    if (!selectedOption) return

    const updatedBinds: Bind[] = []

    for (let i = 0; i < 3; i++) {
      if (i === selectedOption.index) {
        updatedBinds[i] = bind
      } else {
        updatedBinds[i] = input[selectedOption.keybindKey].binds[i]
      }
    }

    input.updateKeyBind(selectedOption.keybindKey, {
      binds: updatedBinds
    })

    setSelectedOption(null)
  }

  React.useEffect(() => {
    if (!selectedOption) return

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedOption])

  React.useEffect(() => {
    if (!selectedOption) return

    const interval = setInterval(() => {
      const controller = navigator.getGamepads()[0]

      if (!controller) return

      for (let i = 0; i < controller.buttons.length; i++) {
        const button = controller.buttons[i]

        if (button.pressed) {
          updateKeyBind(`controller:${i}` as Bind)
        }
      }
    }, 20)

    return () => clearInterval(interval)
  }, [selectedOption])

  const rows = React.useMemo(() => {
    return keybindKeys.map((keybindKey) => {
      const keybind = input[keybindKey]

      if (keybind.rebindable === false) return null

      const row = [
        <div key={`${keybindKey}-label`} className={styles.rowLabel}>
          {keybind.label}
        </div>
      ]

      for (let i = 0; i < 3; i++) {
        const isSelected = selectedOption?.keybindKey === keybindKey && selectedOption.index === i

        const val = keyNames[keybind.binds[i]] || '-'

        row.push(
          <div
            onClick={() => setSelectedOption({ keybindKey, index: i })}
            key={`${keybindKey}-${i}`}
            className={classes(styles.rowValue, isSelected && styles.selectedValue)}
          >
            {isSelected && 'Press a key'}
            {!isSelected && val}
          </div>
        )
      }

      return (
        <div key={keybindKey} className={styles.row}>
          {row}
        </div>
      )
    })
  }, [input, selectedOption])

  return (
    <div className={classes(styles.container, className)}>
      <SettingsSectionHeader label="Keybinds" onReset={handleReset} />

      <div className={classes(styles.headerRow, styles.row)}>
        <div className={styles.rowLabel}>Action</div>
        <div className={styles.rowValue}>#1</div>
        <div className={styles.rowValue}>#2</div>
        <div className={styles.rowValue}>#3</div>
      </div>

      {rows}
    </div>
  )
}
