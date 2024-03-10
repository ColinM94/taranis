import * as React from 'react'
import { Physics, useBox, BoxProps, useSphere, SphereProps } from '@react-three/cannon'

import { FirstPersonCamera, Plane, Sun } from 'components'
import { useInput } from 'store'
import { Mesh } from 'three'
import { randomColor, randomNumber } from 'utils'

const Cube = (props: BoxProps) => {
  const [ref] = useBox<Mesh>(() => ({ mass: 0.1, ...props }))

  return (
    <mesh castShadow ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color={randomColor()} />
    </mesh>
  )
}

const randomPosition = () => {
  return [randomNumber(25, 80), randomNumber(75, 100), randomNumber(25, 80)]
}

const Cubes = () => {
  const input = useInput()

  const [cubes, setCubes] = React.useState<JSX.Element[]>([])

  React.useEffect(() => {
    const unsubscribe = input.createCallback('attack', () => {
      const newCubes = []

      for (let i = 0; i < 25; i++) {
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

const Sphere = (props: SphereProps) => {
  const [ref] = useSphere<Mesh>(() => ({ mass: 0.1, ...props }))

  return (
    <mesh castShadow ref={ref}>
      <sphereGeometry args={[1, 50, 50]} />
      <meshStandardMaterial color={randomColor()} />
    </mesh>
  )
}

const Spheres = () => {
  const input = useInput()

  const [spheres, setSpheres] = React.useState<JSX.Element[]>([])

  React.useEffect(() => {
    const unsubscribe = input.createCallback('attackSecondary', () => {
      const newSpheres = []

      for (let i = 0; i < 25; i++) {
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
    <Physics>
      <Sun />
      <Cubes />
      <Spheres />
      <Plane height={1000} width={1000} />
      <FirstPersonCamera position={[3, 3, 0]} />
    </Physics>
  )
}
