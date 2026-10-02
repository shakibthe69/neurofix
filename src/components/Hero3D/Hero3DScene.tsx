import { Environment, Float, Lightformer } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef, type ReactNode } from 'react'
import * as THREE from 'three'
import { useDocumentVisible } from '../../hooks/useDocumentVisible'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import {
  ConnectionLines,
  Cube,
  GlassSphere,
  Laptop,
  Motes,
  Phone,
  Ring,
  Twinkle,
  type Quality,
} from './objects'

type Hero3DSceneProps = {
  quality?: Quality
}

/**
 * Frame-rate independent damping factor. `delta` is seconds since the previous
 * frame, so this converges at the same visual speed on 60Hz and 144Hz displays.
 */
function dampFactor(delta: number, responsiveness = 0.0009) {
  return 1 - Math.pow(responsiveness, delta)
}

/** Group that leans gently toward the pointer, with heavy easing. */
function ParallaxRig({ children, enabled }: { children: ReactNode; enabled: boolean }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    const group = ref.current
    if (!group || !enabled) return

    const k = dampFactor(delta)
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, state.pointer.x * 0.2, k)
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, -state.pointer.y * 0.12, k)
    group.position.x = THREE.MathUtils.lerp(group.position.x, state.pointer.x * 0.34, k)
    group.position.y = THREE.MathUtils.lerp(group.position.y, state.pointer.y * 0.22, k)
  })

  return <group ref={ref}>{children}</group>
}

/** Local, network-free studio lighting built from drei lightformers. */
function StudioEnvironment({ resolution }: { resolution: number }) {
  return (
    <Environment resolution={resolution} frames={1}>
      <Lightformer form="rect" intensity={2.2} color="#3478F6" position={[-5, 3, -4]} scale={[10, 7, 1]} />
      <Lightformer form="rect" intensity={2} color="#8054F6" position={[5, -2, -3]} scale={[9, 7, 1]} />
      <Lightformer form="circle" intensity={1.7} color="#ffffff" position={[0, 6, 3]} scale={5} />
    </Environment>
  )
}

/** Float preset that becomes a no-op when motion is not wanted. */
function Floaty({
  children,
  animate,
  speed = 1.4,
  rotationIntensity = 0.3,
  floatIntensity = 1,
  range = [-0.09, 0.13] as [number, number],
}: {
  children: ReactNode
  animate: boolean
  speed?: number
  rotationIntensity?: number
  floatIntensity?: number
  range?: [number, number]
}) {
  return (
    <Float
      speed={animate ? speed : 0}
      rotationIntensity={animate ? rotationIntensity : 0}
      floatIntensity={animate ? floatIntensity : 0}
      floatingRange={range}
    >
      {children}
    </Float>
  )
}

function SceneContents({ quality, animate }: { quality: Quality; animate: boolean }) {
  const isLow = quality === 'low'

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 7, 6]} intensity={1.15} color="#e8f0ff" />
      <pointLight position={[-6, 2, 4]} intensity={2.4} decay={0} distance={26} color="#3478F6" />
      <pointLight position={[6, -3, 3]} intensity={2} decay={0} distance={26} color="#8054F6" />

      <StudioEnvironment resolution={isLow ? 128 : 256} />

      <ParallaxRig enabled={animate}>
        {/* ---- Devices ---- */}
        <group position={[0, -0.1, 0]}>
          <Floaty animate={animate} speed={1.25} rotationIntensity={0.22} floatIntensity={0.85}>
            <group position={[-0.8, 0.8, 0]} rotation={[0.17, -0.5, 0.04]} scale={isLow ? 0.72 : 0.86}>
              <Laptop quality={quality} />
            </group>
          </Floaty>

          <Floaty
            animate={animate}
            speed={1.6}
            rotationIntensity={0.32}
            floatIntensity={1.1}
            range={[-0.12, 0.16]}
          >
            <group
              position={[isLow ? 1.5 : 1.9, isLow ? -0.85 : -0.75, 1.6]}
              rotation={[0.1, -0.34, 0.09]}
              scale={isLow ? 0.72 : 0.9}
            >
              <Phone quality={quality} />
            </group>
          </Floaty>

          {/* ---- Abstract shapes ---- */}
          <Floaty animate={animate} speed={0.9} rotationIntensity={0.5} floatIntensity={1.3}>
            <group position={[-2.45, -1.05, 0.9]}>
              <GlassSphere radius={isLow ? 0.44 : 0.55} quality={quality} />
            </group>
          </Floaty>

          {!isLow && (
            <Floaty animate={animate} speed={1.05} rotationIntensity={0.6} floatIntensity={1.5}>
              <group position={[2.5, 1.5, -0.2]}>
                <GlassSphere radius={0.3} quality={quality} color="#e0d4ff" />
              </group>
            </Floaty>
          )}

          <Floaty animate={animate} speed={0.8} rotationIntensity={0.35} floatIntensity={1.1}>
            <Ring
              radius={isLow ? 0.95 : 1.35}
              tube={0.04}
              quality={quality}
              position={[2.35, 1.35, -1.2]}
              rotation={[1.15, 0.35, -0.4]}
            />
          </Floaty>

          {!isLow && (
            <>
              <Floaty animate={animate} speed={1.3} rotationIntensity={0.4} floatIntensity={1.4}>
                <Ring
                  radius={0.85}
                  tube={0.028}
                  color="#9E7BFA"
                  quality={quality}
                  position={[-2.9, 1.75, -1.6]}
                  rotation={[0.6, -0.7, 0.5]}
                />
              </Floaty>

              <Floaty animate={animate} speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
                <Cube size={0.36} spin={animate ? 0.24 : 0} position={[-1.4, -1.65, 1.4]} />
              </Floaty>
            </>
          )}

          <Floaty animate={animate} speed={1.7} rotationIntensity={0.4} floatIntensity={1.3}>
            <Cube
              size={0.26}
              spin={animate ? -0.3 : 0}
              color="#8054F6"
              quality={quality}
              position={[3.05, -0.55, 1.1]}
            />
          </Floaty>
        </group>

        {/* ---- Atmosphere ---- */}
        <Motes count={isLow ? 70 : 170} spread={isLow ? 9 : 12} animate={animate} />
        <Twinkle count={isLow ? 16 : 36} scale={isLow ? 7 : 10} animate={animate} />
        {!isLow && <ConnectionLines nodeCount={18} spread={10} />}
      </ParallaxRig>
    </>
  )
}

/**
 * The hero's interactive 3D composition.
 *
 * Performance notes:
 * - the whole module is lazy-loaded, so Three.js never blocks first paint
 * - the render loop is suspended entirely while the tab is hidden
 * - `quality="low"` (mobile) drops transmissive glass, shadow-free extras and
 *   cuts particle counts and pixel ratio
 * - `reducedMotion` keeps a single beautiful still rather than animating
 */
export default function Hero3DScene({ quality = 'high' }: Hero3DSceneProps) {
  const visible = useDocumentVisible()
  const prefersReducedMotion = usePrefersReducedMotion()
  const animate = !prefersReducedMotion
  const isLow = quality === 'low'

  return (
    <Canvas
      /* Suspend the render loop entirely while the tab is in the background. */
      frameloop={visible ? 'always' : 'never'}
      dpr={isLow ? [1, 1.5] : [1, 1.9]}
      camera={{ position: [0, 0, isLow ? 11.5 : 9.6], fov: 40 }}
      gl={{
        antialias: !isLow,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl }) => gl.setClearColor(new THREE.Color('#000000'), 0)}
      style={{ touchAction: 'pan-y' }}
    >
      <Suspense fallback={null}>
        <SceneContents quality={quality} animate={animate} />
      </Suspense>
    </Canvas>
  )
}
