import * as React from 'react'
import { useFrame } from '@react-three/fiber'
import { useGameStore, useInput } from 'store'
import { Props } from './types'
import { PerspectiveCamera, PointerLockControls } from '@react-three/drei'
import { PerspectiveCamera as PerspectiveCameraType, Vector3 } from 'three'

export const FirstPersonCamera = ({ position = [0, 0, 0] }: Props) => {
  const input = useInput()
  const { fov } = useGameStore()
  const { isPaused, setIsPaused } = useGameStore()

  const direction = new Vector3(0, 1, 0)
  const camera = React.useRef<PerspectiveCameraType>(null)
  const pointerControls = React.useRef<any>(null)

  React.useEffect(() => {
    if (!camera.current) return

    camera.current.position.set(position[0], position[1], position[2])
  }, [])

  React.useEffect(() => {
    if (!pointerControls.current) return

    if (isPaused) {
      pointerControls.current.unlock()
      setIsPaused(true)
    } else {
      setTimeout(() => {
        pointerControls.current.connect()
        pointerControls.current.lock()
        setIsPaused(false)
      }, 100)
    }
  }, [isPaused])

  useFrame((_state, delta) => {
    if (!camera.current) return

    const movementMultiplier = 10 * delta
    const lookMultiplier = 2 * delta

    // Move forward and backward with buttons.
    if (input.moveForward.isPressed) {
      camera.current.translateZ(-movementMultiplier)
    } else if (input.moveBack.isPressed) {
      camera.current.translateZ(+movementMultiplier)
    }

    // Move left and right with buttons.
    if (input.strafeLeft.isPressed) {
      camera.current.translateX(-movementMultiplier)
    } else if (input.strafeRight.isPressed) {
      camera.current.translateX(movementMultiplier)
    }

    // Move left and right with analog input.
    if (input.strafeRight.xAxis !== undefined) {
      camera.current.translateX(input.strafeRight.xAxis * movementMultiplier)
    }

    // Move forward and backwards with analog input.
    if (input.moveForward.yAxis !== undefined) {
      camera.current.translateZ(input.moveForward.yAxis * movementMultiplier)
    }

    // Look up and down with anaolog input.
    if (input.lookUp.yAxis !== undefined) {
      camera.current.rotateX(-input.lookUp.yAxis * lookMultiplier)
    }

    // Look left and right with analog input.
    if (input.lookRight.xAxis !== undefined) {
      //   camera.current.rotateY(-input.lookRight.xAxis * lookMultiplier)
      camera.current.rotateOnWorldAxis(direction, -input.lookRight.xAxis * lookMultiplier)
    }
  })

  return (
    <>
      {!isPaused && (
        <PointerLockControls ref={pointerControls} makeDefault onUnlock={() => setIsPaused(true)} />
      )}
      <PerspectiveCamera ref={camera} fov={fov} makeDefault />
    </>
  )
}
