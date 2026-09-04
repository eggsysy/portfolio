"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { sceneState, damp } from "@/lib/scene-state"
import { hairline } from "./shared"

/**
 * A task scheduler, drawn as a stack of priority queues.
 *
 * Each ring is one queue. Blocks arrive from above, sit at a ring until their
 * turn, then drop to the next one down and finally out through the chute — a
 * stepped descent rather than a fall, because a scheduler holds work before it
 * releases it, and the holding is the part worth showing.
 *
 * The form drives it. Every keystroke is an interrupt: it adds to a decaying
 * impulse and the rings spin up. Once every field is valid the rings stop,
 * align on a single axis, and a payload drops clean through the middle.
 *
 * The whole stack assembles as the reader scrolls in, ring by ring from the top
 * down. That is a pure function of scroll position rather than a one-shot
 * trigger, so scrolling back up takes it apart again.
 */

const TAU = Math.PI * 2
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t)
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}

function makeRandom(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

const RING_COUNT = 6
const TOP_Y = 3.1
const RING_GAP = 0.98
const CHUTE_TOP = -2.34
const CHUTE_BOTTOM = -4.7
const SPAWN_Y = 4.7

const ringY = (i: number) => TOP_Y - i * RING_GAP

/**
 * The levels a block visits: the spawn point, every ring, then the chute floor.
 * A block's descent is one segment of this list at a time.
 */
const LEVELS = [
  SPAWN_Y,
  ...Array.from({ length: RING_COUNT }, (_, i) => ringY(i)),
  CHUTE_BOTTOM,
]

/**
 * One queue: a flat annular band, drawn as the cell grid its wireframe implies
 * — two rims top and bottom, uprights at every division, and radial ties across
 * both faces. Built by hand rather than from EdgesGeometry so the divisions are
 * exactly the ones chosen, not whatever survives an angle threshold.
 */
function ringGeometry(inner: number, outer: number, height: number, divisions: number) {
  const p: number[] = []
  const h = height / 2
  const push = (
    x1: number, y1: number, z1: number,
    x2: number, y2: number, z2: number
  ) => p.push(x1, y1, z1, x2, y2, z2)

  for (let i = 0; i < divisions; i++) {
    const a0 = (i / divisions) * TAU
    const a1 = ((i + 1) / divisions) * TAU
    const c0 = Math.cos(a0), s0 = Math.sin(a0)
    const c1 = Math.cos(a1), s1 = Math.sin(a1)

    for (const r of [inner, outer]) {
      for (const y of [-h, h]) push(c0 * r, y, s0 * r, c1 * r, y, s1 * r)
      // Upright at this division, joining the two rims.
      push(c0 * r, -h, s0 * r, c0 * r, h, s0 * r)
    }
    // Radial ties across the top and bottom faces.
    for (const y of [-h, h]) push(c0 * inner, y, s0 * inner, c0 * outer, y, s0 * outer)
  }

  const g = new THREE.BufferGeometry()
  g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3))
  return g
}

/** The rails the processed blocks leave down, with ties every so often. */
function chuteGeometry() {
  const p: number[] = []
  const r = 0.34
  const posts: [number, number][] = [
    [r, r], [-r, r], [-r, -r], [r, -r],
  ]
  for (const [x, z] of posts) p.push(x, CHUTE_TOP, z, x, CHUTE_BOTTOM, z)

  for (let y = CHUTE_TOP; y > CHUTE_BOTTOM; y -= 0.58) {
    for (let i = 0; i < posts.length; i++) {
      const a = posts[i]
      const b = posts[(i + 1) % posts.length]
      p.push(a[0], y, a[1], b[0], y, b[1])
    }
  }

  const g = new THREE.BufferGeometry()
  g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3))
  return g
}

/** The twelve edges of a unit cube, as endpoint pairs. */
const CUBE_EDGES = (() => {
  const c: [number, number, number][] = []
  for (let i = 0; i < 8; i++) {
    c.push([(i & 1 ? 0.5 : -0.5), (i & 2 ? 0.5 : -0.5), (i & 4 ? 0.5 : -0.5)])
  }
  const out: number[] = []
  for (let i = 0; i < 8; i++) {
    for (let j = i + 1; j < 8; j++) {
      const diff = i ^ j
      if ((diff & (diff - 1)) === 0) out.push(...c[i], ...c[j])
    }
  }
  return new Float32Array(out)
})()

const CUBE_VERTS = CUBE_EDGES.length / 3

interface Block {
  /** Where in its cycle this block starts, and how long the cycle runs. */
  offset: number
  period: number
  /** Seat within the queue — blocks wait off-axis and only the payload is centred. */
  radius: number
  angle: number
  size: number
  spin: number
  tilt: number
}

function makeBlocks(count: number): Block[] {
  const rand = makeRandom(4242)
  return Array.from({ length: count }, () => ({
    offset: rand(),
    period: 11 + rand() * 7,
    radius: 0.12 + rand() * 0.5,
    angle: rand() * TAU,
    size: 0.17 + rand() * 0.1,
    spin: 0.4 + rand() * 0.9,
    tilt: rand() * TAU,
  }))
}

/**
 * Where a block sits at cycle position `u`.
 *
 * It holds at each level for the first part of the segment, then drops to the
 * next — the stepped motion that reads as queueing rather than falling.
 */
function descend(u: number) {
  const segments = LEVELS.length - 1
  const scaled = clamp01(u) * segments
  const i = Math.min(segments - 1, Math.floor(scaled))
  const local = scaled - i
  return { y: LEVELS[i] + (LEVELS[i + 1] - LEVELS[i]) * smoothstep(0.42, 1, local), level: i }
}

export function Scheduler({ scale = 1, low = false }: { scale?: number; low?: boolean }) {
  const group = useRef<THREE.Group>(null)
  const ringRefs = useRef<(THREE.LineSegments | null)[]>([])
  const angles = useRef<number[]>(Array.from({ length: RING_COUNT }, () => 0))

  const rings = useMemo(
    () =>
      Array.from({ length: RING_COUNT }, (_, i) => {
        const outer = 2.05 - i * 0.12
        return {
          geometry: ringGeometry(outer - 0.44, outer, 0.26, low ? 14 : 22 - i),
          y: ringY(i),
          // Alternating, and quicker further down: the deeper queues are the
          // ones under pressure.
          rate: (i % 2 ? -1 : 1) * (0.17 + i * 0.05),
          delay: i * 0.1,
        }
      }),
    [low]
  )

  const chute = useMemo(() => chuteGeometry(), [])

  const blockCount = low ? 8 : 14
  const blocks = useMemo(() => makeBlocks(blockCount), [blockCount])
  const blockBuf = useMemo(() => {
    const positions = new Float32Array(blockCount * CUBE_VERTS * 3)
    const colors = new Float32Array(blockCount * CUBE_VERTS * 3)
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return { geometry: g, positions, colors }
  }, [blockCount])

  const payloadBuf = useMemo(() => {
    const positions = new Float32Array(CUBE_VERTS * 3)
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return { geometry: g, positions }
  }, [])

  const ringMat = useMemo(() => hairline(0.34), [])
  const chuteMat = useMemo(() => hairline(0.22), [])
  const blockMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
    []
  )
  const payloadMat = useMemo(() => hairline(0.95), [])

  const matrix = useMemo(() => new THREE.Matrix4(), [])
  const quat = useMemo(() => new THREE.Quaternion(), [])
  const euler = useMemo(() => new THREE.Euler(), [])
  const scratch = useMemo(() => new THREE.Vector3(), [])
  const scaleVec = useMemo(() => new THREE.Vector3(), [])
  const position = useMemo(() => new THREE.Vector3(), [])

  /** Runs 0→1 once the form goes valid, then holds. Drives the payload drop. */
  const payload = useRef(-1)
  const payloadRef = useRef<THREE.LineSegments>(null)

  /** Writes one cube's edges into `out` at `offset`, transformed. */
  const writeCube = (out: Float32Array, offset: number) => {
    for (let v = 0; v < CUBE_VERTS; v++) {
      scratch
        .set(CUBE_EDGES[v * 3], CUBE_EDGES[v * 3 + 1], CUBE_EDGES[v * 3 + 2])
        .applyMatrix4(matrix)
      const o = offset + v * 3
      out[o] = scratch.x
      out[o + 1] = scratch.y
      out[o + 2] = scratch.z
    }
  }

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05)

    sceneState.assembly = damp(sceneState.assembly, sceneState.assemblyTarget, 3.2, dt)
    const p = easeOut(clamp01(sceneState.assembly))
    const t = sceneState.animate ? performance.now() * 0.001 : 0

    // Keystroke impulses bleed off on their own, so the stack settles back to
    // its resting speed a moment after typing stops.
    sceneState.schedulerNudgeTarget *= Math.exp(-dt * 1.1)
    sceneState.schedulerNudge = damp(sceneState.schedulerNudge, sceneState.schedulerNudgeTarget, 7, dt)
    sceneState.schedulerReady = damp(sceneState.schedulerReady, sceneState.schedulerReadyTarget, 2.4, dt)

    const nudge = sceneState.schedulerNudge
    const ready = sceneState.schedulerReady

    if (group.current) {
      group.current.position.x = (1 - p) * 15
      group.current.rotation.y = sceneState.pointerX * 0.12
      group.current.rotation.x = sceneState.pointerY * 0.06
    }

    // Rings spin while there is work outstanding, and pull onto a common axis
    // once the form is complete. The pull is toward the nearest whole turn, so
    // a ring settles where it is rather than unwinding.
    for (let i = 0; i < RING_COUNT; i++) {
      const ring = rings[i]
      const mesh = ringRefs.current[i]
      if (!mesh) continue

      angles.current[i] += dt * ring.rate * (1 + nudge * 5) * (1 - ready)
      const wrapped = (((angles.current[i] + Math.PI) % TAU) + TAU) % TAU - Math.PI
      angles.current[i] -= wrapped * (1 - Math.exp(-5 * dt)) * ready
      mesh.rotation.y = angles.current[i]

      // Each ring drops into place in turn, top first.
      const local = easeOut(clamp01((p - ring.delay) / (1 - ring.delay)))
      mesh.position.y = ring.y + (1 - local) * 5.5
      mesh.scale.setScalar(0.6 + local * 0.4)
      mesh.visible = local > 0.01
    }

    // Blocks work their way down the stack, holding at each queue in turn.
    {
      const { positions, colors, geometry } = blockBuf
      for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i]
        const u = (((t / b.period + b.offset) % 1) + 1) % 1
        const { y } = descend(u)

        // Below the last ring they are in the chute, so pull them onto its axis.
        const inChute = smoothstep(CHUTE_TOP + 0.5, CHUTE_TOP - 0.4, y)
        const r = b.radius * (1 - inChute)
        const a = b.angle + t * 0.25

        position.set(Math.cos(a) * r, y, Math.sin(a) * r)
        euler.set(b.tilt + t * b.spin, b.tilt * 1.7 + t * b.spin * 0.7, 0)
        quat.setFromEuler(euler)
        scaleVec.setScalar(b.size)
        matrix.compose(position, quat, scaleVec)
        writeCube(positions, i * CUBE_VERTS * 3)

        // Fade in above the first ring and out at the chute floor, so nothing
        // pops into or out of existence.
        const k =
          smoothstep(0, 0.06, u) * (1 - smoothstep(0.9, 1, u)) * p * (0.55 + 0.45 * (1 - inChute))
        for (let v = 0; v < CUBE_VERTS; v++) {
          const o = (i * CUBE_VERTS + v) * 3
          colors[o] = k
          colors[o + 1] = k
          colors[o + 2] = k * 0.97
        }
      }
      geometry.attributes.position.needsUpdate = true
      geometry.attributes.color.needsUpdate = true
    }

    // The payload: released the moment the form goes valid, and it does not
    // queue — it drops straight through the aligned rings.
    if (sceneState.schedulerReadyTarget > 0.5 && payload.current < 0) payload.current = 0
    if (sceneState.schedulerReadyTarget < 0.5 && payload.current >= 1) payload.current = -1

    if (payloadRef.current) {
      const live = payload.current >= 0 && payload.current < 1
      payloadRef.current.visible = live && p > 0.2
      if (live) {
        payload.current = Math.min(1, payload.current + dt * 0.42)
        const u = easeOut(payload.current)
        position.set(0, SPAWN_Y + (CHUTE_BOTTOM - SPAWN_Y) * u, 0)
        euler.set(t * 0.6, t * 0.9, 0)
        quat.setFromEuler(euler)
        scaleVec.setScalar(0.44)
        matrix.compose(position, quat, scaleVec)
        writeCube(payloadBuf.positions, 0)
        payloadBuf.geometry.attributes.position.needsUpdate = true
      }
    }
  })

  return (
    <group ref={group} scale={scale}>
      {rings.map((ring, i) => (
        <lineSegments
          key={i}
          ref={(el) => {
            ringRefs.current[i] = el
          }}
          geometry={ring.geometry}
          material={ringMat}
          position={[0, ring.y, 0]}
          frustumCulled={false}
        />
      ))}

      <lineSegments geometry={chute} material={chuteMat} frustumCulled={false} />
      <lineSegments geometry={blockBuf.geometry} material={blockMat} frustumCulled={false} />
      <lineSegments
        ref={payloadRef}
        geometry={payloadBuf.geometry}
        material={payloadMat}
        frustumCulled={false}
      />
    </group>
  )
}
