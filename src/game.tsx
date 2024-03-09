import * as React from 'react'
import { Canvas } from '@react-three/fiber'

interface Props {
  children?: React.ReactNode
  className?: string
}

export const Game = ({ children, className }: Props): JSX.Element => {
  return (
    <div className={className}>
      <Canvas>{children}</Canvas>
    </div>
  )
}
