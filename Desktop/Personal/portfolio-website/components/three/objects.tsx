"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { fbm } from "@/lib/noise"
import { sceneState } from "@/lib/scene-state"

/**
 * The asteroid behind the contact form: a solid, pitted mass rather than a
 * wireframe, so the page ends on something with weight after all the line
 * work above it.
 */
export function Asteroid({ scale = 1 }: { scale?: number }) {
  const ref = useRef<THREE.Group>(null)

  const geometry = useMemo(() => {
    const g = new THREE.IcosahedronGeometry(1, 48)
    const pos = g.attributes.position as THREE.BufferAttribute
    const v = new THREE.Vector3()

    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)
      const n = v.clone().normalize()
      // Big lumps, then craters, then surface tooth.
      const lumps = fbm(n.x * 1.25, n.y * 1.25, n.z * 1.25, 3, 2.1, 0.55)
      const craters = fbm(n.x * 3.3, n.y * 3.3, n.z * 3.3, 3, 2.3, 0.5)
      const grit = fbm(n.x * 11, n.y * 11, n.z * 11, 2, 2.5, 0.5)
      const r = 1 + lumps * 0.34 + craters * 0.13 + grit * 0.03
      v.copy(n).multiplyScalar(r)
      v.x *= 1.18
      v.z *= 0.92
      pos.setXYZ(i, v.x, v.y, v.z)
    }

    pos.needsUpdate = true
    g.computeVertexNormals()
    return g
  }, [])

  useFrame((_, delta) => {
    if (!ref.current || !sceneState.animate) return
    const dt = Math.min(delta, 0.05)
    ref.current.rotation.y += dt * 0.035
    ref.current.rotation.x += dt * 0.008
  })

  return (
    <group ref={ref} scale={scale}>
      <mesh geometry={geometry} frustumCulled={false}>
        <meshStandardMaterial color="#2a2a29" roughness={1} metalness={0} flatShading={false} />
      </mesh>
    </group>
  )
}

/**
 * Floating wireframe polyhedra — the small shapes that drift around the
 * projects section in the reference.
 */
export function Shards({ count = 9 }: { count?: number }) {
  const group = useRef<THREE.Group>(null)

  const shards = useMemo(() => {
    let s = 8191
    const rand = () => {
      s = (s * 1664525 + 1013904223) % 4294967296
      return s / 4294967296
    }
    return Array.from({ length: count }, () => ({
      position: [(rand() - 0.5) * 26, (rand() - 0.5) * 14, (rand() - 0.5) * 12 - 4] as [
        number,
        number,
        number,
      ],
      scale: 0.5 + rand() * 1.1,
      detail: rand() > 0.55 ? 1 : 0,
      speed: 0.1 + rand() * 0.22,
      phase: rand() * Math.PI * 2,
    }))
  }, [count])

  useFrame((_, delta) => {
    if (!group.current || !sceneState.animate) return
    const dt = Math.min(delta, 0.05)
    const t = performance.now() * 0.001
    group.current.children.forEach((child, i) => {
      const s = shards[i]
      child.rotation.x += dt * s.speed * 0.5
      child.rotation.y += dt * s.speed
      child.position.y = s.position[1] + Math.sin(t * 0.35 + s.phase) * 0.7
    })
  })

  return (
    <group ref={group}>
      {shards.map((s, i) => (
        <lineSegments key={i} position={s.position} scale={s.scale} frustumCulled={false}>
          <wireframeGeometry args={[new THREE.IcosahedronGeometry(1, s.detail)]} />
          <lineBasicMaterial
            color="#cfcecb"
            transparent
            opacity={0.2}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </lineSegments>
      ))}
    </group>
  )
}

/** Sparse binary digits drifting in the dark, as in the reference hero. */
export function BinaryDust({ count = 26 }: { count?: number }) {
  const group = useRef<THREE.Group>(null)

  const items = useMemo(() => {
    let s = 5150
    const rand = () => {
      s = (s * 1664525 + 1013904223) % 4294967296
      return s / 4294967296
    }
    return Array.from({ length: count }, () => {
      const bits = Array.from({ length: 4 }, () => (rand() > 0.5 ? "1" : "0")).join("")
      return {
        text: bits,
        position: [(rand() - 0.5) * 42, (rand() - 0.5) * 22, (rand() - 0.5) * 14 - 5] as [
          number,
          number,
          number,
        ],
        opacity: 0.12 + rand() * 0.3,
        phase: rand() * Math.PI * 2,
      }
    })
  }, [count])

  const texture = useMemo(() => {
    // One canvas atlas is overkill for this; each item gets a tiny texture.
    return null
  }, [])

  useFrame(() => {
    if (!group.current || !sceneState.animate) return
    const t = performance.now() * 0.001
    group.current.children.forEach((child, i) => {
      const mat = (child as THREE.Sprite).material as THREE.SpriteMaterial
      mat.opacity = items[i].opacity * (0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * 0.8 + items[i].phase)))
    })
  })

  const makeTexture = (text: string) => {
    const canvas = document.createElement("canvas")
    canvas.width = 128
    canvas.height = 32
    const ctx = canvas.getContext("2d")!
    ctx.clearRect(0, 0, 128, 32)
    ctx.fillStyle = "#ffffff"
    ctx.font = "600 22px ui-monospace, monospace"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, 64, 17)
    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
  }

  const textures = useMemo(() => items.map((i) => makeTexture(i.text)), [items])

  return (
    <group ref={group}>
      {items.map((item, i) => (
        <sprite key={i} position={item.position} scale={[1.5, 0.38, 1]}>
          <spriteMaterial
            map={textures[i]}
            transparent
            opacity={item.opacity}
            depthWrite={false}
            toneMapped={false}
          />
        </sprite>
      ))}
    </group>
  )
}
