import { PlaneProps } from '@react-three/cannon'

export interface Props extends PlaneProps {
  height: number
  width: number
  color?: string
}
