"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { sceneState } from "@/lib/scene-state"

/**
 * The soft light above the hero landscape.
 *
 * A sprite with a radial falloff painted into a canvas — cheaper and softer
 * than bloom alone, and it survives on machines where postprocessing is
 * switched off.
 */
export function Orb({ position = [0, 6.2, -18] as [number, number, number] }) {
  const texture = useMemo(() => {
    const size = 256
    const canvas = document.createElement("canvas")
    canvas.width = canvas.height = size
    const ctx = canvas.getContext("2d")!
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    // A long, gentle falloff. Too few stops and the sprite reads as a solid
    // ball with a visible rim rather than as light in the air.
    g.addColorStop(0.0, "rgba(255,255,255,0.9)")
    g.addColorStop(0.06, "rgba(250,250,247,0.42)")
    g.addColorStop(0.14, "rgba(235,234,230,0.16)")
    g.addColorStop(0.26, "rgba(224,223,219,0.07)")
    g.addColorStop(0.42, "rgba(220,219,215,0.028)")
    g.addColorStop(0.65, "rgba(220,219,215,0.008)")
    g.addColorStop(1.0, "rgba(220,219,215,0)")
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.needsUpdate = true
    return tex
  }, [])

  const ref = useRef<THREE.Sprite>(null)

  useFrame(() => {
    if (!ref.current || !sceneState.animate) return
    const t = performance.now() * 0.001
    const pulse = 1 + Math.sin(t * 0.7) * 0.06
    ref.current.scale.set(7.5 * pulse, 7.5 * pulse, 1)
  })

  return (
    <sprite ref={ref} position={position} scale={[7.5, 7.5, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </sprite>
  )
}
