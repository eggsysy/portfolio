"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { sceneState } from "@/lib/scene-state"
import { graphite, hairline, edgesOf, makeRandom } from "./shared"

/**
 * Faceless bust — a digital identity sculpture.
 *
 * Built as a loft through hand-authored cross-sections rather than sculpted
 * from a primitive, so the silhouette is exactly the silhouette I specified:
 * a small skull, a neck far longer than anatomy allows, and shoulders that
 * flare late and hard. The face is left as bare geometry — no eyes, no mouth —
 * and a scatter of faces is dropped outright so the mesh reads as unfinished.
 */

/** [y, half-width, half-depth] up the figure. The long neck is deliberate. */
const SECTIONS: [number, number, number][] = [
  [1.02, 0.03, 0.03], // crown
  [0.97, 0.17, 0.19],
  [0.9, 0.27, 0.31],
  [0.8, 0.33, 0.38],
  [0.68, 0.35, 0.41], // widest of the skull
  [0.56, 0.34, 0.4],
  [0.46, 0.3, 0.36],
  [0.37, 0.25, 0.3], // jaw
  [0.29, 0.17, 0.2], // under the chin
  [0.21, 0.13, 0.145], // neck begins
  [0.0, 0.122, 0.135],
  [-0.22, 0.128, 0.142],
  [-0.38, 0.16, 0.175], // trapezius
  [-0.5, 0.31, 0.225],
  [-0.6, 0.53, 0.285],
  [-0.7, 0.67, 0.315],
  [-0.86, 0.71, 0.335],
  [-1.06, 0.73, 0.345], // cut of the bust
]

const SEGMENTS = 15 // low, so the facets stay visible

function buildBust() {
  const rand = makeRandom(90210)
  const rings: THREE.Vector3[][] = []

  for (let s = 0; s < SECTIONS.length; s++) {
    const [y, rx, rz] = SECTIONS[s]
    const ring: THREE.Vector3[] = []

    // The whole figure leans and drifts off-axis as it rises — the asymmetry
    // is what stops it reading as a lathe-turned vase.
    const lean = Math.sin(y * 1.6 + 0.4) * 0.055 + y * 0.03
    const drift = Math.cos(y * 2.2) * 0.022

    for (let i = 0; i < SEGMENTS; i++) {
      const a = (i / SEGMENTS) * Math.PI * 2
      // Per-vertex wobble, biased so one side of the figure is heavier.
      const wobble = 1 + (rand() - 0.5) * 0.075 + Math.sin(a * 2 + y) * 0.03
      ring.push(
        new THREE.Vector3(
          Math.cos(a) * rx * wobble + lean,
          y,
          Math.sin(a) * rz * wobble * (1 + Math.cos(a) * 0.09) + drift
        )
      )
    }
    rings.push(ring)
  }

  // Non-indexed triangles, so faces can simply be omitted and flat shading
  // gives every facet its own normal.
  const positions: number[] = []
  const dropRand = makeRandom(5150)

  for (let s = 0; s < rings.length - 1; s++) {
    const lower = rings[s]
    const upper = rings[s + 1]

    for (let i = 0; i < SEGMENTS; i++) {
      const j = (i + 1) % SEGMENTS

      // Missing sections: gaps cluster on the upper-left of the figure so they
      // read as damage to one area rather than as even static.
      const bias = SECTIONS[s][0] > 0.2 && Math.cos((i / SEGMENTS) * Math.PI * 2) < 0.1 ? 0.22 : 0.045
      if (dropRand() < bias) continue

      const a = lower[i]
      const b = lower[j]
      const c = upper[j]
      const d = upper[i]

      positions.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z)
      positions.push(a.x, a.y, a.z, c.x, c.y, c.z, d.x, d.y, d.z)
    }
  }

  const g = new THREE.BufferGeometry()
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
  g.computeVertexNormals()
  return g
}

export function Bust({ scale = 1 }: { scale?: number }) {
  const group = useRef<THREE.Group>(null)

  const geometry = useMemo(() => buildBust(), [])
  const edges = useMemo(() => edgesOf(geometry, 24), [geometry])
  const body = useMemo(() => graphite({ color: "#1c1c1f", roughness: 0.44, metalness: 0.66 }), [])
  const lines = useMemo(() => hairline(0.5), [])

  useFrame(() => {
    if (!group.current || !sceneState.animate) return
    const t = performance.now() * 0.001
    group.current.rotation.y = -0.5 + Math.sin(t * 0.14) * 0.42 + sceneState.pointerX * 0.16
    group.current.rotation.x = Math.sin(t * 0.1) * 0.04 + sceneState.pointerY * 0.05
  })

  return (
    <group ref={group} scale={scale * 2.4} position={[0, -0.2, 0]}>
      <mesh geometry={geometry} material={body} frustumCulled={false} />
      <lineSegments geometry={edges} material={lines} frustumCulled={false} />
    </group>
  )
}
