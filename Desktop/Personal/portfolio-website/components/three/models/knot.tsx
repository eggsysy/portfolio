"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { sceneState } from "@/lib/scene-state"
import { graphite, hairline, edgesOf } from "./shared"

/**
 * An impossible knot — a mathematical artifact.
 *
 * A rectangular section swept along an asymmetric closed curve, with the
 * section rotating as it travels so the band turns through itself the way a
 * Möbius strip does. Two interlocked loops at different scales give the
 * crossings that make it read as impossible rather than merely twisted, and
 * connector nodes float just off the surface at intervals.
 *
 * Swept by hand rather than with TubeGeometry because the twist has to be
 * applied per-segment, which TubeGeometry's fixed frame will not do.
 */

/** Asymmetric trefoil. The extra harmonic is what breaks the symmetry. */
function curvePoint(t: number, out: THREE.Vector3) {
  const a = t * Math.PI * 2
  return out.set(
    Math.sin(a) + 2 * Math.sin(2 * a) + 0.28 * Math.sin(5 * a),
    Math.cos(a) - 2 * Math.cos(2 * a) - 0.22 * Math.cos(4 * a),
    -Math.sin(3 * a) * 1.16
  )
}

/**
 * Sweep a rectangular section along the curve, rotating it by `twists` half
 * turns over the full loop.
 */
function sweep(steps: number, width: number, height: number, twists: number) {
  const positions: number[] = []
  const indices: number[] = []

  const p = new THREE.Vector3()
  const next = new THREE.Vector3()
  const tangent = new THREE.Vector3()
  const normal = new THREE.Vector3()
  const binormal = new THREE.Vector3()
  const up = new THREE.Vector3(0, 0, 1)

  // Four corners of the rectangular section.
  const section: [number, number][] = [
    [-width, -height],
    [width, -height],
    [width, height],
    [-width, height],
  ]

  for (let s = 0; s < steps; s++) {
    const t = s / steps
    curvePoint(t, p)
    curvePoint((s + 1) / steps, next)

    tangent.subVectors(next, p).normalize()
    normal.crossVectors(tangent, up).normalize()
    // Degenerate where the tangent is parallel to `up`; nudge onto another axis.
    if (normal.lengthSq() < 0.001) normal.set(1, 0, 0)
    binormal.crossVectors(tangent, normal).normalize()

    const twist = t * Math.PI * twists

    for (const [u, v] of section) {
      const cu = u * Math.cos(twist) - v * Math.sin(twist)
      const cv = u * Math.sin(twist) + v * Math.cos(twist)
      positions.push(
        p.x + normal.x * cu + binormal.x * cv,
        p.y + normal.y * cu + binormal.y * cv,
        p.z + normal.z * cu + binormal.z * cv
      )
    }
  }

  // Stitch consecutive sections into quads, wrapping at the seam.
  for (let s = 0; s < steps; s++) {
    const a = s * 4
    const b = ((s + 1) % steps) * 4
    for (let i = 0; i < 4; i++) {
      const j = (i + 1) % 4
      indices.push(a + i, b + i, b + j)
      indices.push(a + i, b + j, a + j)
    }
  }

  const g = new THREE.BufferGeometry()
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
  g.setIndex(indices)
  g.computeVertexNormals()
  return g
}

/** Connector nodes, floating just clear of the band. */
function nodePositions(count: number) {
  const p = new THREE.Vector3()
  const out: [number, number, number][] = []
  for (let i = 0; i < count; i++) {
    const t = i / count
    curvePoint(t, p)
    const lift = 1.12
    out.push([p.x * lift, p.y * lift, p.z * lift])
  }
  return out
}

export function ImpossibleKnot({ scale = 1 }: { scale?: number }) {
  const group = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Group>(null)
  const nodesRef = useRef<THREE.Group>(null)

  const outerGeo = useMemo(() => sweep(260, 0.115, 0.032, 3), [])
  const innerGeo = useMemo(() => sweep(200, 0.07, 0.022, 5), [])
  const outerEdges = useMemo(() => edgesOf(outerGeo, 22), [outerGeo])
  const innerEdges = useMemo(() => edgesOf(innerGeo, 22), [innerGeo])

  const bodyMat = useMemo(() => graphite({ flatShading: false, roughness: 0.34 }), [])
  const lineMat = useMemo(() => hairline(0.38), [])
  const innerLineMat = useMemo(() => hairline(0.55), [])
  const nodeMat = useMemo(() => graphite({ color: "#1b1b1e", roughness: 0.3 }), [])

  const nodes = useMemo(() => nodePositions(14), [])
  const nodeGeo = useMemo(() => new THREE.OctahedronGeometry(0.058, 0), [])
  const nodeEdges = useMemo(() => edgesOf(nodeGeo, 10), [nodeGeo])

  useFrame((_, delta) => {
    if (!sceneState.animate) return
    const dt = Math.min(delta, 0.05)
    const t = performance.now() * 0.001

    if (group.current) {
      group.current.rotation.y += dt * 0.14
      group.current.rotation.x = 0.28 + Math.sin(t * 0.16) * 0.14 + sceneState.pointerY * 0.1
      group.current.rotation.z = sceneState.pointerX * 0.1
    }
    // The inner loop counter-rotates, so the crossings keep changing.
    if (inner.current) {
      inner.current.rotation.z -= dt * 0.22
      inner.current.rotation.x += dt * 0.1
    }
    if (nodesRef.current) {
      nodesRef.current.children.forEach((child, i) => {
        child.rotation.x = t * 0.4 + i
        child.rotation.y = t * 0.3 + i
      })
    }
  })

  return (
    <group ref={group} scale={scale * 0.86}>
      <mesh geometry={outerGeo} material={bodyMat} frustumCulled={false} />
      <lineSegments geometry={outerEdges} material={lineMat} frustumCulled={false} />

      {/* A second loop, smaller and more twisted, threaded through the first. */}
      <group ref={inner} scale={0.58} rotation={[0.9, 0.4, 0]}>
        <mesh geometry={innerGeo} material={bodyMat} frustumCulled={false} />
        <lineSegments geometry={innerEdges} material={innerLineMat} frustumCulled={false} />
      </group>

      <group ref={nodesRef}>
        {nodes.map((pos, i) => (
          <group key={i} position={pos}>
            <mesh geometry={nodeGeo} material={nodeMat} frustumCulled={false} />
            <lineSegments geometry={nodeEdges} material={innerLineMat} frustumCulled={false} />
          </group>
        ))}
      </group>
    </group>
  )
}
