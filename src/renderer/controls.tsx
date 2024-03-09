import * as React from 'react'

import { useControllerStore, useInput } from 'store'
import { Bind, Keybinds } from 'types'
import { KeybindKey, keybinds } from 'config'

export const Controls = (): null => {
  const controllers = useControllerStore()
  const mouseWheelTimeout = React.useRef<NodeJS.Timeout | null>(null)

  const tempState = React.useRef<Keybinds>({
    ...keybinds
  })

  const keyMap = React.useMemo(() => {
    const tempKeyMap = new Map<string, KeybindKey[]>()

    for (const key in keybinds) {
      const keybind = keybinds[key as KeybindKey]

      for (const bind of keybind.binds) {
        if (!tempKeyMap.has(bind)) {
          tempKeyMap.set(bind, [])
        }

        tempKeyMap.set(bind, [...tempKeyMap.get(bind)!, key as KeybindKey])
      }
    }

    return tempKeyMap
  }, [])

  const handlePress = (key: Bind, isPressed: boolean): void => {
    const input = useInput.getState()
    const keys = keyMap.get(key)

    if (!keys || keys.length === 0) return

    for (const key of keys) {
      if (tempState.current[key].isPressed === isPressed) continue

      tempState.current[key].isPressed = isPressed

      isPressed && input.callbacks[key]?.(isPressed)

      input.updateKeyBind(key, {
        isPressed
      })
    }
  }

  const handleKeyboardDown = (e: KeyboardEvent): void => {
    handlePress(`keyboard:${e.code}` as Bind, true)
  }

  const handleKeyboardUp = (e: KeyboardEvent): void => {
    handlePress(`keyboard:${e.code}` as Bind, false)
  }

  const handleMouseDown = (e: MouseEvent): void => {
    e.preventDefault()
    handlePress(`mouse:${e.button}` as Bind, true)
  }

  const handleMouseUp = (e: MouseEvent): void => {
    e.preventDefault()
    handlePress(`mouse:${e.button}` as Bind, false)
  }

  const handleMouseWheel = (e: WheelEvent): void => {
    if (e.deltaY > 0) handlePress(`mouse:WheelDown` as Bind, true)
    else if (e.deltaY < 0) handlePress(`mouse:WheelUp` as Bind, true)

    mouseWheelTimeout.current && clearTimeout(mouseWheelTimeout.current)

    mouseWheelTimeout.current = setTimeout(() => {
      handlePress(`mouse:WheelDown` as Bind, false)
      handlePress(`mouse:WheelUp` as Bind, false)
    }, 50)
  }

  const handleContextMenu = (e: MouseEvent): void => {
    e.preventDefault()
  }

  const handleControllerUpdate = (): void => {
    for (let x = 0; x < 4; x++) {
      const controller = navigator.getGamepads()[x]

      if (!controller) continue

      for (let i = 0; i < controller.buttons.length; i++) {
        const button = controller.buttons[i]
        const bind = `controller:${i}` as Bind
        handlePress(bind, button.pressed)
      }
    }
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      handleControllerUpdate()
    }, 20)

    return () => clearInterval(interval)
  }, [])

  const handleControllerConnected = (e: GamepadEvent): void => {
    controllers.update(e.gamepad.index, true)
  }

  const handleControllerDisconnected = (e: GamepadEvent): void => {
    controllers.update(e.gamepad.index, false)
  }

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyboardDown)
    window.addEventListener('keyup', handleKeyboardUp)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('contextmenu', handleContextMenu)
    window.addEventListener('wheel', handleMouseWheel)

    window.addEventListener('gamepadconnected', handleControllerConnected)
    window.addEventListener('gamepaddisconnected', handleControllerDisconnected)

    return () => {
      window.removeEventListener('keydown', handleKeyboardDown)
      window.removeEventListener('keyup', handleKeyboardUp)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.addEventListener('contextmenu', handleContextMenu)
      window.removeEventListener('gamepadconnected', handleControllerConnected)
      window.removeEventListener('gamepaddisconnected', handleControllerDisconnected)
      window.removeEventListener('wheel', handleMouseWheel)
    }
  }, [])

  return null
}
