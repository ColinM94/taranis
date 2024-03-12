import * as React from 'react'
import { RigidBody, RigidBodyProps } from '@react-three/rapier'

import { useInput } from 'store'
import { randomColor, randomNumber } from 'utils'
import { FirstPersonCamera, Plane, Sun } from 'entities'

const randomPosition = (): [number, number, number] => {
  return [randomNumber(25, 80), randomNumber(75, 100), randomNumber(25, 80)]
}

const Cube = (props: RigidBodyProps) => {
  return (
    <RigidBody colliders="cuboid" mass={2} {...props}>
      <mesh castShadow>
        <boxGeometry />
        <meshStandardMaterial color={randomColor()} />
      </mesh>
    </RigidBody>
  )
}

const Cubes = () => {
  const input = useInput()

  const [cubes, setCubes] = React.useState<JSX.Element[]>([])

  React.useEffect(() => {
    const unsubscribe = input.createCallback('attack', () => {
      const newCubes: JSX.Element[] = []

      for (let i = 0; i < 250; i++) {
        newCubes.push(<Cube position={randomPosition()} key={cubes.length + i} />)
      }

      setCubes((prev) => {
        const tempCubes = prev
        tempCubes.push(...newCubes)
        return tempCubes
      })
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return cubes
}

const Sphere = (props: RigidBodyProps) => {
  return (
    <RigidBody colliders="ball" mass={2} {...props}>
      <mesh castShadow>
        <sphereGeometry args={[1, 50, 50]} />
        <meshStandardMaterial color={randomColor()} />
      </mesh>
    </RigidBody>
  )
}

const Spheres = () => {
  const input = useInput()

  const [spheres, setSpheres] = React.useState<JSX.Element[]>([])

  React.useEffect(() => {
    const unsubscribe = input.createCallback('attack', () => {
      const newSpheres: JSX.Element[] = []

      for (let i = 0; i < 250; i++) {
        newSpheres.push(<Sphere position={randomPosition()} key={spheres.length + i} />)
      }

      setSpheres((prev) => {
        const tempSpheres = prev
        tempSpheres.push(...newSpheres)
        return tempSpheres
      })
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return spheres
}

export const GameScreen = () => {
  return (
    <>
      <Sun />
      <Spheres />
      <Cubes />
      <Plane height={1000} width={1000} />
      <FirstPersonCamera position={[0, 10, 0]} />
    </>
  )
}
