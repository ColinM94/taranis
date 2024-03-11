import { RigidBody } from '@react-three/rapier'
import { Props } from './types'

export const Plane = (props: Props) => {
  const { height, width, ...rest } = props

  return (
    <RigidBody
      type="fixed"
      rotation={[Math.PI * -0.5, 0, 0]}
      restitution={0.2}
      friction={4}
      {...rest}
    >
      <mesh receiveShadow>
        <planeGeometry args={[height, width]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </RigidBody>
  )
}
