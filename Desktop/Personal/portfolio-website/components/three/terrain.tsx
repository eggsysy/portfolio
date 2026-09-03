"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { fbm } from "@/lib/noise"
import { sceneState } from "@/lib/scene-state"

/**
 * The hero landscape: a wireframe ridge running across the lower half of the
 * frame, drawn only as lines so it reads as contour rather than surface.
 *
 * Only the long axis of each quad is drawn (rows and columns, not diagonals),
 * because a triangulated wireframe reads as noise at this density while a grid
 * reads as topography.
 */
const SEG_X = 150
const SEG_Y = 74
const WIDTH = 78
const DEPTH = 44

function heightAt(x: number, y: number, t: number) {
  // A ridge that rises toward the back of the plane.
  const ridge = Math.exp(-((y - 0.15) * (y - 0.15)) / 0.16)
  const base = fbm(x * 1.15, y * 1.15 + t * 0.05, t * 0.08, 4, 2.1, 0.5)
  const detail = fbm(x * 3.6, y * 3.6, t * 0.05, 3, 2.3, 0.45)
  return (base * 7.6 + detail * 1.7) * (0.28 + ridge * 1.8)
}

export function Terrain() {
  const linesRef = useRef<THREE.LineSegments>(null)
  const time = useRef(0)

  const { geometry, positions, index } = useMemo(() => {
    const cols = SEG_X + 1
    const rows = SEG_Y + 1
    const positions = new Float32Array(cols * rows * 3)

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const o = (j * cols + i) * 3
        positions[o] = (i / SEG_X - 0.5) * WIDTH
        positions[o + 1] = 0
        positions[o + 2] = (j / SEG_Y - 0.5) * DEPTH
      }
    }

    // Grid edges only — horizontals and verticals, no diagonals.
    const idx: number[] = []
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const a = j * cols + i
        if (i < cols - 1) idx.push(a, a + 1)
        if (j < rows - 1) idx.push(a, a + cols)
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setIndex(idx)
    return { geometry, positions, index: idx }
  }, [])

  useFrame((_, delta) => {
    if (sceneState.animate) time.current += Math.min(delta, 0.05)
    const t = time.current
    const cols = SEG_X + 1
    const rows = SEG_Y + 1

    for (let j = 0; j < rows; j++) {
      const ny = j / SEG_Y - 0.5
      for (let i = 0; i < cols; i++) {
        const nx = i / SEG_X - 0.5
        positions[(j * cols + i) * 3 + 1] = heightAt(nx * 2.2, ny * 2.2, t)
      }
    }
    geometry.attributes.position.needsUpdate = true
  })

  return (
    <lineSegments ref={linesRef} geometry={geometry} position={[0, -9.5, -10]} frustumCulled={false}>
      <lineBasicMaterial
        color="#d6d5d1"
        transparent
        opacity={0.085}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </lineSegments>
  )
}

/**
 * The soft light above the ridge. A sprite with a radial falloff painted into
 * a canvas — cheaper and softer than bloom alone, and it survives on machines
 * where postprocessing is switched off.
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
