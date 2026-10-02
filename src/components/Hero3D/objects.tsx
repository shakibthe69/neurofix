import { RoundedBox, Sparkles } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { createLaptopScreenTexture, createPhoneScreenTexture } from './mockScreens'

/* ------------------------------------------------------------------ */
/* Shared materials                                                    */
/* ------------------------------------------------------------------ */

const DEVICE_BODY = { color: '#1B2440', roughness: 0.32, metalness: 0.82 } as const
const DEVICE_DECK = { color: '#131B33', roughness: 0.6, metalness: 0.4 } as const

/**
 * Quality tier for the scene. 'low' is used on phones: no transmissive glass
 * (which forces an extra scene render per frame) and fewer segments.
 */
export type Quality = 'high' | 'low'

/* ------------------------------------------------------------------ */
/* Laptop                                                              */
/* ------------------------------------------------------------------ */

/**
 * A 3D laptop mockup whose screen shows a procedurally drawn Neurofix landing
 * page. The screen uses an unlit material so the UI stays bright and legible
 * while the chassis catches the scene lighting.
 */
export function Laptop({ quality = 'high' }: { quality?: Quality }) {
  const texture = useMemo(
    () => createLaptopScreenTexture(quality === 'high' ? 8 : 2),
    [quality],
  )

  useEffect(() => () => texture.dispose(), [texture])

  return (
    <group>
      {/* Chassis base */}
      <RoundedBox args={[3.5, 0.14, 2.4]} radius={0.06} smoothness={3} position={[0, 0, 0.5]}>
        <meshStandardMaterial {...DEVICE_BODY} />
      </RoundedBox>

      {/* Deck / keyboard area */}
      <mesh position={[0, 0.076, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.16, 2.02]} />
        <meshStandardMaterial {...DEVICE_DECK} />
      </mesh>

      {/* Screen, hinged at the back edge of the base */}
      <group position={[0, 0.02, -0.7]} rotation={[-0.26, 0, 0]}>
        <RoundedBox args={[3.5, 2.1, 0.09]} radius={0.04} smoothness={3} position={[0, 1.05, 0]}>
          <meshStandardMaterial {...DEVICE_BODY} />
        </RoundedBox>

        <mesh position={[0, 1.05, 0.052]}>
          <planeGeometry args={[3.24, 1.88]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Phone                                                               */
/* ------------------------------------------------------------------ */

/** A 3D smartphone mockup showing a procedurally drawn app interface. */
export function Phone({ quality = 'high' }: { quality?: Quality }) {
  const texture = useMemo(() => createPhoneScreenTexture(quality === 'high' ? 8 : 2), [quality])

  useEffect(() => () => texture.dispose(), [texture])

  return (
    <group>
      <RoundedBox args={[1.08, 2.24, 0.13]} radius={0.05} smoothness={4}>
        <meshStandardMaterial {...DEVICE_BODY} />
      </RoundedBox>

      <mesh position={[0, 0, 0.068]}>
        <planeGeometry args={[0.99, 2.14]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>

      {/* Speaker slot */}
      <mesh position={[0, 0.98, 0.076]}>
        <boxGeometry args={[0.26, 0.035, 0.01]} />
        <meshStandardMaterial {...DEVICE_DECK} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Abstract shapes                                                     */
/* ------------------------------------------------------------------ */

/**
 * Glass sphere. On high quality it uses real transmission (physically
 * refractive); on low quality it falls back to a cheap translucent shell so
 * mobile devices do not pay for an extra render pass.
 */
export function GlassSphere({
  radius = 0.55,
  quality = 'high',
  color = '#bcd2ff',
}: {
  radius?: number
  quality?: Quality
  color?: string
}) {
  const segments = quality === 'high' ? 48 : 24

  if (quality === 'low') {
    return (
      <mesh>
        <sphereGeometry args={[radius, segments, segments]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.42}
          roughness={0.12}
          metalness={0.3}
        />
      </mesh>
    )
  }

  return (
    <mesh>
      <sphereGeometry args={[radius, segments, segments]} />
      <meshPhysicalMaterial
        color={color}
        transmission={1}
        thickness={1.1}
        roughness={0.06}
        ior={1.45}
        metalness={0}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={1.4}
      />
    </mesh>
  )
}

/** Emissive ring — the "futuristic ring" motif from the brand visuals. */
export function Ring({
  radius = 1.1,
  tube = 0.045,
  color = '#5E8CFA',
  quality = 'high',
  position,
  rotation,
}: {
  radius?: number
  tube?: number
  color?: string
  quality?: Quality
  position?: [number, number, number]
  rotation?: [number, number, number]
}) {
  const segments = quality === 'high' ? 96 : 48
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <torusGeometry args={[radius, tube, 16, segments]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.1}
          roughness={0.25}
          metalness={0.6}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}

/** Slowly tumbling brand cube. */
export function Cube({
  size = 0.4,
  spin = 0.22,
  color = '#3478F6',
  quality = 'high',
  position,
}: {
  size?: number
  spin?: number
  color?: string
  quality?: Quality
  position?: [number, number, number]
}) {
  const ref = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * spin
    ref.current.rotation.y += delta * spin * 1.3
  })

  return (
    <group position={position}>
      <group ref={ref}>
        {quality === 'high' ? (
          <RoundedBox args={[size, size, size]} radius={size * 0.14} smoothness={3}>
            <meshStandardMaterial
              color={color}
              roughness={0.18}
              metalness={0.9}
              emissive={color}
              emissiveIntensity={0.22}
            />
          </RoundedBox>
        ) : (
          <mesh>
            <boxGeometry args={[size, size, size]} />
            <meshStandardMaterial color={color} roughness={0.25} metalness={0.85} />
          </mesh>
        )}
      </group>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Particles                                                           */
/* ------------------------------------------------------------------ */

/** Soft round sprite generated once and shared by every particle. */
let motesTexture: THREE.CanvasTexture | null = null

function getMotesTexture(): THREE.CanvasTexture {
  if (motesTexture) return motesTexture

  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.4, 'rgba(197,216,255,0.7)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  motesTexture = new THREE.CanvasTexture(canvas)
  motesTexture.colorSpace = THREE.SRGBColorSpace
  return motesTexture
}

/**
 * Loose field of drifting light motes. Rendered as a single additive
 * `<points>` draw call, so the count stays cheap even on mobile.
 */
export function Motes({
  count = 160,
  spread = 11,
  animate = true,
}: {
  count?: number
  spread?: number
  animate?: boolean
}) {
  const ref = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.72
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.6
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [count, spread])

  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame((state, delta) => {
    const points = ref.current
    if (!points) return
    if (!animate) return

    // Slow drift plus a whisper of pointer parallax.
    points.rotation.y += delta * 0.018
    points.position.x = THREE.MathUtils.lerp(points.position.x, state.pointer.x * 0.35, 0.02)
    points.position.y = THREE.MathUtils.lerp(points.position.y, state.pointer.y * 0.25, 0.02)
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        map={getMotesTexture()}
        size={0.09}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  )
}

/** Twinkling highlight dust that adds depth without visual noise. */
export function Twinkle({
  count = 34,
  scale = 9,
  animate = true,
}: {
  count?: number
  scale?: number
  animate?: boolean
}) {
  return (
    <Sparkles
      count={count}
      scale={[scale, scale * 0.6, scale * 0.5]}
      size={2.2}
      speed={animate ? 0.28 : 0}
      opacity={0.6}
      color="#9E7BFA"
    />
  )
}

/* ------------------------------------------------------------------ */
/* Connection lines                                                    */
/* ------------------------------------------------------------------ */

/**
 * Faint constellation lines linking nearby nodes, echoing the "connected
 * systems" idea behind the brand. Drawn as one additive line-segment mesh.
 */
export function ConnectionLines({ nodeCount = 16, spread = 9 }) {
  const geometry = useMemo(() => {
    const nodes: THREE.Vector3[] = []
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread * 0.7,
          (Math.random() - 0.5) * 3 - 0.5,
        ),
      )
    }

    // Connect each node to its nearest neighbour, and keep segments short.
    const maxDistance = 2.6
    const points: number[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < maxDistance) {
          points.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z)
        }
      }
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return geo
  }, [nodeCount, spread])

  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color="#5E8CFA"
        transparent
        opacity={0.28}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </lineSegments>
  )
}
