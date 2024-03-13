import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { useConfigStore, useGameStore } from 'store'

interface Props {
  children?: React.ReactNode
  className?: string
}

export const Game = ({ children, className }: Props): JSX.Element => {
  const { isPaused } = useGameStore()
  const { showPhysicsDebug } = useConfigStore()

  return (
    <div className={className}>
      <Canvas shadows>
        <Physics gravity={[0, -10, 0]} paused={isPaused} debug={showPhysicsDebug}>
          <React.Suspense>{children}</React.Suspense>
        </Physics>
      </Canvas>
    </div>
  )
}
