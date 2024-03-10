import { usePlane } from '@react-three/cannon'
import { Mesh } from 'three'

import { Props } from './types'

export const Plane = (props: Props) => {
  const { height, width, ...rest } = props

  const [ref] = usePlane<Mesh>(() => ({ rotation: [-Math.PI / 2, 0, 0], ...rest }))

  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[height, width]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  )
}
