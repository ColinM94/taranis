import * as React from 'react'
import { Sphere } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import { useGameStore } from 'store'

export const Sun = () => {
  const ref = React.useRef<any>(null)

  const defaultBrightness = 100
  const { dayNightCycle, dayNightCycleSpeed } = useGameStore()

  const [sunBrightness, setSunBrightness] = React.useState(defaultBrightness)

  useFrame((state, delta, _frame) => {
    if (dayNightCycle) {
      if (ref.current) {
        ref.current.position.x =
          Math.sin(state.clock.elapsedTime * dayNightCycleSpeed * delta) * 100

        ref.current.position.y =
          Math.cos(state.clock.elapsedTime * dayNightCycleSpeed * delta) * 100

        ref.current.position.z =
          Math.cos(state.clock.elapsedTime * dayNightCycleSpeed * delta) * 100

        const minBright = 1000

        if (ref.current.position.y < 0) {
          setSunBrightness(minBright)
        } else if (ref.current.position.y > 1) {
          setSunBrightness(minBright + 1000 * ref.current.position.y)
        }
      }
    } else {
      setSunBrightness(defaultBrightness)
    }
  })

  return (
    <group>
      <Sphere
        ref={ref}
        args={[1, 50, 50]}
        position={[99, 99, 99]}
        scale={6}
        // castShadow
      >
        <meshStandardMaterial
          attach="material"
          color="yellow"
          emissive="yellow"
          emissiveIntensity={1}
        />
      </Sphere>
      <spotLight penumbra={0.5} position={[10, 10, 5]} castShadow intensity={sunBrightness} />
      <ambientLight />
    </group>
  )
}
