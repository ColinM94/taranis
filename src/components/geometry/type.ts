import { MeshProps } from '@react-three/fiber'

export interface GeometryProps extends MeshProps {
  type: 'cube' | 'sphere' | 'torus' | 'torusKnot' | 'plane'
  size?: [number, number, number, number]
  color?: string
  wireframe?: boolean
  side?: 'front' | 'back' | 'double'
  transparent?: boolean
}
