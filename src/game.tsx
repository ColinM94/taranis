import * as React from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'

interface Props {
  children?: React.ReactNode
  className?: string
}

export const Game = ({ children, className }: Props): JSX.Element => {
  return (
    <Canvas shadows>
      <Physics debug>
        <React.Suspense>
          <div className={className}>{children}</div>
        </React.Suspense>
      </Physics>
    </Canvas>
  )
}
