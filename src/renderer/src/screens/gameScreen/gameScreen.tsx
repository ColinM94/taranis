import * as React from 'react'
import { PerspectiveCameraProps, useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import { PerspectiveCamera, PointerLockControls, Sphere } from '@react-three/drei'

import { useGameStore, useInput } from 'store'
import { Geometry } from 'components'

import { GameScreenProps } from './types'

const Sphere2 = ({ position, args, color }) => {
  const ref = React.useRef()

  const { showWireframes } = useGameStore()

  const [isHovered, setIsHovered] = React.useState(false)
  const [isClicked, setIsClicked] = React.useState(false)

  useFrame((state, delta, frame) => {
    const speed = isHovered ? 1 : 0.2
    ref.current.rotation.y += delta * speed
    // ref.current.position.z = Math.sin(state.clock.elapsedTime * 4);
  })

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 2 : 0.25}
    >
      <sphereGeometry args={args} />
      <meshStandardMaterial
        color={isHovered ? 'dodgerblue' : 'orange'}
        wireframe={showWireframes}
      />
    </mesh>
  )
}

export const GameScreen = ({}: GameScreenProps) => {
  const input = useInput()
  const { isPaused, setIsPaused, fov, showWireframes, dayNightCycle, dayNightCycleSpeed } =
    useGameStore()

  const sphereRef = React.useRef<Mesh>(null)
  const camera = React.useRef<any>(null)
  const pointerControls = React.useRef<any>(null)
  const sun = React.useRef<any>(null)
  const [sunBrightness, setSunBrightness] = React.useState(100000)

  const [scale, setScale] = React.useState(1)

  // React.useEffect(() => {
  //   if (isPaused) return;

  //   let timeout: number;

  //   if (isPaused) {
  //     timeout = setTimeout(() => {
  //       pointerControls.current.unlock();
  //     }, 100);
  //   } else {
  //     timeout = setTimeout(() => {
  //       pointerControls.current.connect();
  //       pointerControls.current.lock();
  //     }, 100);
  //   }

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [isPaused]);

  React.useEffect(() => {
    const unsub = input.createCallback('pause', () => {
      setTimeout(() => {
        if (isPaused) {
          pointerControls.current.connect()
          pointerControls.current.lock()
          setIsPaused(false)
        } else {
          pointerControls.current.unlock()
          setIsPaused(true)
        }
      }, 100)
    })

    return () => {
      unsub()
    }
  }, [isPaused])

  React.useEffect(() => {
    if (!pointerControls.current) return

    if (isPaused) {
      pointerControls.current.unlock()
      setIsPaused(true)
    } else {
      setTimeout(() => {
        pointerControls.current.connect()
        pointerControls.current.lock()
        setIsPaused(false)
      }, 100)
    }
  }, [isPaused])

  useFrame((state, delta) => {
    if (isPaused) return

    if (!camera.current) return

    if (sphereRef.current) {
      sphereRef.current.rotateY(delta * 0.2)
    }

    if (dayNightCycle) {
      console.log('helllooo')
      if (sun.current) {
        sun.current.position.x = Math.sin(state.clock.elapsedTime * dayNightCycleSpeed) * 100
        sun.current.position.y = Math.cos(state.clock.elapsedTime * dayNightCycleSpeed) * 100
        sun.current.position.z = Math.cos(state.clock.elapsedTime * dayNightCycleSpeed) * 100

        const maxBrightness = 10000
        const minBright = 1000

        if (sun.current.position.y < 0) {
          setSunBrightness(minBright)
        } else if (sun.current.position.y > 1) {
          setSunBrightness(minBright + 1000 * sun.current.position.y)
        }
      }
    } else {
      setSunBrightness(100000)
    }

    const multiplier = 3

    if (pointerControls?.current?.moveRight && pointerControls?.current?.moveForward) {
      if (input.moveLeft.isPressed) {
        pointerControls.current.moveRight(-delta * multiplier)
      } else if (input.moveRight.isPressed) {
        pointerControls.current.moveRight(delta * multiplier)
      }

      if (input.moveDown.isPressed) {
        pointerControls.current.moveForward(-delta * multiplier)
      } else if (input.moveUp.isPressed) {
        pointerControls.current.moveForward(delta * multiplier)
      }

      if (input.attack.isPressed) {
        // camera.current.position = [
        //   camera.current.position[0],
        //   camera.current.position[1] + 0.1,
        //   camera.current.position[2],
        // ];
      }

      // if (input.attack.isPressed) {
      //   setScale((prev) => prev + 0.01);
      // }
    }
  })

  return (
    <group>
      <group>
        <Sphere
          ref={sun}
          args={[1, 50, 50]}
          position={[99, 99, 99]}
          scale={6}
          // castShadow
        >
          <meshStandardMaterial
            attach="material"
            color="yellow"
            emissive="yellow"
            emissiveIntensity={1}
          />
        </Sphere>
        <pointLight position={[99, 99, 99]} intensity={sunBrightness} />
      </group>

      {/* Light */}

      {/* <group scale={scale} rotation={[0, 0, 0]} position={[0, 4, 0]}>
        <Geometry type="cube" position={[0, -1, 1]} color="red" />
        <Geometry type="cube" position={[0, 0, 1]} color="green" />
        <Geometry type="cube" position={[0, 1, 1]} color="blue" />
        <Geometry type="cube" position={[0, 2, 1]} color="orange" />
        <Geometry type="cube" position={[0, 3, 1]} color="purple" />
        <Geometry type="cube" position={[0, 4, 1]} color="yellow" />
        <Geometry type="sphere" position={[-1, -2, 1]} color="dodgerblue" />
        <Geometry type="sphere" position={[1, -2, 1]} color="orange" />
      </group> */}

      {/* <Geometry type="torusKnot" position={[4, 2, 0]} size={[0.5, 0.1, 30, 30]} color="hotpink" /> */}

      <Geometry type="torus" position={[8, 2, 0]} rotation={[90, 25, 25]} color="red" />

      <Sphere2 position={[20, 6, 0]} args={[3, 50, 50]} color="red" />

      {/* <mesh position={[15, 5, 0]}>
        <sphereGeometry args={[5, 2000, 2000]} />
        <meshStandardMaterial wireframe={true} />
      </mesh> */}

      <Geometry
        type="plane"
        position={[0, 0, 0]}
        color="green"
        size={[100, 100, 1, 1]}
        rotation={[Math.PI / 2, 0, 0]}
        side="double"
      />

      {!isPaused && (
        <PointerLockControls ref={pointerControls} makeDefault onUnlock={() => setIsPaused(true)} />
      )}

      <PerspectiveCamera ref={camera} makeDefault position={[3, 3, 0]} fov={fov} />
    </group>
  )
}
