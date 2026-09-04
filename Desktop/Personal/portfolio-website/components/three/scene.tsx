"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"
import { ImpossibleKnot } from "@/components/three/models/knot"
import { Terrain, Orb } from "@/components/three/terrain"
import { Shards, BinaryDust } from "@/components/three/objects"
import { Scheduler } from "@/components/three/models/scheduler"
import { sceneState, damp, startSceneInput, type SceneMode } from "@/lib/scene-state"

/**
 * Cross-fades a group in and out by scaling every material's opacity.
 *
 * Base opacities are captured on the first frame so the fade multiplies the
 * value the object was authored with, rather than flattening everything to the
 * same alpha — the brain's tissue is meant to be far fainter than its gears.
 */
function FadeGroup({
  when,
  children,
  ...props
}: {
  when: SceneMode
  children: React.ReactNode
} & React.ComponentProps<"group">) {
  const ref = useRef<THREE.Group>(null)
  const base = useRef<Map<THREE.Material, number>>(new Map())
  const alpha = useRef(0)

  useFrame((_, delta) => {
    const g = ref.current
    if (!g) return
    const dt = Math.min(delta, 0.05)

    const target = sceneState.mode === when ? 1 : 0
    alpha.current = damp(alpha.current, target, 3, dt)

    // Below a threshold, stop drawing entirely — a hidden brain should not
    // cost anything to render.
    g.visible = alpha.current > 0.01
    if (!g.visible) return

    const k = alpha.current * sceneState.intensity

    g.traverse((child) => {
      const mat = (child as THREE.Mesh).material as THREE.Material | THREE.Material[] | undefined
      if (!mat) return
      const list = Array.isArray(mat) ? mat : [mat]
      for (const m of list) {
        if (!("opacity" in m)) continue
        if (!base.current.has(m)) base.current.set(m, (m as THREE.Material & { opacity: number }).opacity)
        ;(m as THREE.Material & { opacity: number }).opacity = (base.current.get(m) ?? 1) * k
        m.transparent = true
      }
    })
  })

  return (
    <group ref={ref} {...props}>
      {children}
    </group>
  )
}

/** Camera: a slow drift with scroll, and a small lean toward the pointer. */
function Rig() {
  const { camera } = useThree()
  const look = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)

    sceneState.scroll = damp(sceneState.scroll, sceneState.scrollTarget, 4, dt)
    sceneState.pointerX = damp(sceneState.pointerX, sceneState.pointerTargetX, 2.5, dt)
    sceneState.pointerY = damp(sceneState.pointerY, sceneState.pointerTargetY, 2.5, dt)
    sceneState.intensity = damp(sceneState.intensity, sceneState.intensityTarget, 2.6, dt)

    const s = sceneState.scroll

    camera.position.x = damp(camera.position.x, sceneState.pointerX * 1.1, 2, dt)
    camera.position.y = damp(camera.position.y, 0.4 + sceneState.pointerY * 0.7 - s * 0.8, 2, dt)
    camera.position.z = damp(camera.position.z, 12, 2, dt)

    look.current.set(0, 0, 0)
    camera.lookAt(look.current)
  })

  return null
}

/** A faint field of dust that is present under everything, always. */
function Dust({ count = 260 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    let s = 77
    const rand = () => {
      s = (s * 1664525 + 1013904223) % 4294967296
      return s / 4294967296
    }
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 80
      positions[i * 3 + 1] = (rand() - 0.5) * 46
      positions[i * 3 + 2] = (rand() - 0.5) * 50 - 8
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return g
  }, [count])

  useFrame((_, delta) => {
    if (ref.current && sceneState.animate) ref.current.rotation.y += delta * 0.006
  })

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <pointsMaterial size={0.05} color="#b9b8b4" transparent opacity={0.34} sizeAttenuation depthWrite={false} />
    </points>
  )
}

export default function Scene() {
  const [tier, setTier] = useState<"high" | "low" | null>(null)

  useEffect(() => {
    startSceneInput()
    const small = window.matchMedia("(max-width: 900px)").matches
    const cores = navigator.hardwareConcurrency ?? 8
    setTier(small || cores <= 4 ? "low" : "high")
  }, [])

  if (tier === null) return null
  const low = tier === "low"

  return (
    <Canvas
      className="!fixed inset-0"
      dpr={low ? [1, 1.25] : [1, 1.75]}
      gl={{ antialias: !low, powerPreference: "high-performance", alpha: false }}
      camera={{ fov: 50, near: 0.1, far: 260, position: [0, 0.4, 12] }}
      onCreated={({ gl }) => gl.setClearColor("#0e0e0e", 1)}
    >
      <fog attach="fog" args={["#0e0e0e", 30, 96]} />
      <ambientLight intensity={0.28} />
      <directionalLight position={[6, 8, 10]} intensity={1.5} color="#efeeea" />
      <directionalLight position={[-9, -3, -6]} intensity={0.4} color="#9aa6a0" />

      <Rig />
      <Dust count={low ? 130 : 260} />

      {/* Hero: the ridge, the light above it, drifting binary. */}
      <FadeGroup when="hero">
        <Terrain />
        <Orb />
        {!low && <BinaryDust count={22} />}
      </FadeGroup>

      {/* About: the knot, sat left of the text column. */}
      <FadeGroup when="sculpture" position={[-3.6, -0.2, 0]}>
        <ImpossibleKnot scale={low ? 0.85 : 1} />
      </FadeGroup>

      {/* Work: drifting polyhedra. */}
      <FadeGroup when="shards">
        <Shards count={low ? 6 : 10} />
      </FadeGroup>

      {/* Contact: the task scheduler, assembling ring by ring as the reader
          scrolls in and driven by the form itself. */}
      <FadeGroup when="signal" position={[5.2, -0.2, -1]}>
        <Scheduler scale={low ? 0.85 : 1} low={low} />
      </FadeGroup>

      {!low && (
        <EffectComposer enableNormalPass={false}>
          <Bloom intensity={0.75} luminanceThreshold={0.22} luminanceSmoothing={0.5} mipmapBlur />
        </EffectComposer>
      )}
    </Canvas>
  )
}
