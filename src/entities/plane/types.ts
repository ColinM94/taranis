import { RigidBodyProps } from '@react-three/rapier'

export interface Props extends RigidBodyProps {
  height: number
  width: number
  color?: string
}
