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
 * Three things read the state of that machine rather than just decorating it:
 * a ring brightens while it is holding a block, a slot marker steps around each
 * ring one division at a time like a pointer walking its queue, and a clock
 * tick sweeps down the whole stack on a fixed period, lighting each ring as it
 * passes. Nothing here is on a loop of its own — it is all driven by where the
 * blocks actually are.
 *
 * The form drives the rest. Every keystroke is an interrupt: it adds to a
 * decaying impulse and the rings spin up. Once every field is valid the rings
 * stop, align on a single axis, and a payload drops clean through the middle.
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

const RING_COUNT = 5
const TOP_Y = 3.1
const RING_GAP = 0.96
const CHUTE_TOP = -1.25
const CHUTE_BOTTOM = -3.9
const SPAWN_Y = 4.6
/** The floor the column stands on, and everything the base plate is drawn at. */
const BASE_Y = CHUTE_BOTTOM
/** Seconds for one clock tick to sweep the stack. */
const TICK_PERIOD = 4.2

const ringY = (i: number) => TOP_Y - i * RING_GAP
const ringOuter = (i: number) => 2.15 - i * 0.1
const RING_BAND = 0.5
const RING_HEIGHT = 0.22
/**
 * Target arc length of one cell.
 *
 * Divisions are derived from this rather than fixed per ring, so every cell is
 * the same physical size all the way down. With a fixed count the lower rings
 * — being smaller — packed their cells tighter, and any ring that happened to
 * sit near eye level collapsed into a hatch of uprights instead of reading as
 * a band.
 */
const CELL_ARC = 0.72

/**
 * The levels a block visits: the spawn point, every ring, then the chute floor.
 * A block's descent is one segment of this list at a time.
 */
const LEVELS = [
  SPAWN_Y,
  ...Array.from({ length: RING_COUNT }, (_, i) => ringY(i)),
  CHUTE_BOTTOM,
]

type Seg = [number, number, number, number, number, number]

/** One cell of an annular band: its four arcs, four uprights and four ties. */
function cellSegments(
  inner: number, outer: number, h: number, a0: number, a1: number
): Seg[] {
  const c0 = Math.cos(a0), s0 = Math.sin(a0)
  const c1 = Math.cos(a1), s1 = Math.sin(a1)
  const out: Seg[] = []

  for (const r of [inner, outer]) {
    for (const y of [-h, h]) out.push([c0 * r, y, s0 * r, c1 * r, y, s1 * r])
    for (const [c, s] of [[c0, s0], [c1, s1]]) out.push([c * r, -h, s * r, c * r, h, s * r])
  }
  for (const y of [-h, h]) {
    for (const [c, s] of [[c0, s0], [c1, s1]]) {
      out.push([c * inner, y, s * inner, c * outer, y, s * outer])
    }
  }
  return out
}

function geometryFrom(segments: Seg[]) {
  const p: number[] = []
  for (const s of segments) p.push(...s)
  const g = new THREE.BufferGeometry()
  g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3))
  return g
}

/**
 * One queue: a flat annular band drawn as the cell grid its wireframe implies.
 * Built by hand rather than from EdgesGeometry so the divisions are exactly the
 * ones chosen, not whatever survives an angle threshold.
 */
function ringGeometry(inner: number, outer: number, height: number, divisions: number) {
  const segments: Seg[] = []
  for (let i = 0; i < divisions; i++) {
    // Each cell contributes only its leading edges; the trailing ones belong to
    // the next cell along, so nothing is drawn twice.
    const a0 = (i / divisions) * TAU
    const a1 = ((i + 1) / divisions) * TAU
    const c0 = Math.cos(a0), s0 = Math.sin(a0)
    const c1 = Math.cos(a1), s1 = Math.sin(a1)
    const h = height / 2

    for (const r of [inner, outer]) {
      for (const y of [-h, h]) segments.push([c0 * r, y, s0 * r, c1 * r, y, s1 * r])
    }
    // Uprights on the outer wall only. Doubling them on the inner wall reads
    // fine from above but turns any ring near eye level into solid hatching,
    // and the cell is already closed by its rims and ties.
    segments.push([c0 * outer, -h, s0 * outer, c0 * outer, h, s0 * outer])
    for (const y of [-h, h]) {
      segments.push([c0 * inner, y, s0 * inner, c0 * outer, y, s0 * outer])
    }
  }
  return geometryFrom(segments)
}

/** A full circle in the XZ plane, at a height. */
function circleSegments(radius: number, y: number, divisions: number): Seg[] {
  const out: Seg[] = []
  for (let i = 0; i < divisions; i++) {
    const a0 = (i / divisions) * TAU
    const a1 = ((i + 1) / divisions) * TAU
    out.push([
      Math.cos(a0) * radius, y, Math.sin(a0) * radius,
      Math.cos(a1) * radius, y, Math.sin(a1) * radius,
    ])
  }
  return out
}

/**
 * A circle drawn as dashes rather than a solid line.
 *
 * `duty` is the fraction of each step that is drawn. Real dashed lines need a
 * shader; at this weight, emitting short segments with gaps is the same thing
 * and costs nothing.
 */
function dashedCircle(
  radius: number, y: number, dashes: number, duty: number, tilt?: THREE.Euler
): Seg[] {
  const q = tilt ? new THREE.Quaternion().setFromEuler(tilt) : null
  const a = new THREE.Vector3()
  const b = new THREE.Vector3()
  const out: Seg[] = []

  for (let i = 0; i < dashes; i++) {
    const t0 = (i / dashes) * TAU
    const t1 = ((i + duty) / dashes) * TAU
    a.set(Math.cos(t0) * radius, y, Math.sin(t0) * radius)
    b.set(Math.cos(t1) * radius, y, Math.sin(t1) * radius)
    if (q) {
      a.applyQuaternion(q)
      b.applyQuaternion(q)
    }
    out.push([a.x, a.y, a.z, b.x, b.y, b.z])
  }
  return out
}

/** A vertical run of dashes — the centre axis and the perimeter guides. */
function dashedColumn(x: number, z: number, y0: number, y1: number, dashes: number, duty: number): Seg[] {
  const out: Seg[] = []
  const step = (y1 - y0) / dashes
  for (let i = 0; i < dashes; i++) {
    const a = y0 + step * i
    out.push([x, a, z, x, a + step * duty, z])
  }
  return out
}

/** A soft round pool of light, for the glow the column stands in. */
function makeGlowTexture() {
  const size = 128
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, "rgba(255,255,255,0.5)")
  g.addColorStop(0.35, "rgba(255,255,255,0.16)")
  g.addColorStop(0.7, "rgba(255,255,255,0.03)")
  g.addColorStop(1, "rgba(255,255,255,0)")
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/**
 * The wide paths that sweep around the whole tower.
 *
 * Each is a tilted circle far outside the rings. They are what give the stack
 * a system around it rather than leaving it floating — and the satellite that
 * rides each one is the only thing in the piece that moves right across the
 * frame.
 */
const ORBITS: { radius: number; tilt: THREE.Euler; dashes: number; duty: number; rate: number }[] = [
  { radius: 3.75, tilt: new THREE.Euler(0.34, 0, 0.12), dashes: 150, duty: 1, rate: 0.05 },
  { radius: 3.2, tilt: new THREE.Euler(-0.42, 0.7, 0.2), dashes: 150, duty: 1, rate: -0.07 },
  { radius: 4.15, tilt: new THREE.Euler(0.2, -0.5, -0.28), dashes: 62, duty: 0.45, rate: 0.04 },
]

/** The rails the processed blocks leave down, with ties every so often. */
function chuteGeometry() {
  const segments: Seg[] = []
  // Slim enough to read as a chute rather than a box sat under the stack.
  const r = 0.22
  const posts: [number, number][] = [[r, r], [-r, r], [-r, -r], [r, -r]]

  for (const [x, z] of posts) segments.push([x, CHUTE_TOP, z, x, CHUTE_BOTTOM, z])
  for (let y = CHUTE_TOP; y > CHUTE_BOTTOM; y -= 0.8) {
    for (let i = 0; i < posts.length; i++) {
      const a = posts[i]
      const b = posts[(i + 1) % posts.length]
      segments.push([a[0], y, a[1], b[0], y, b[1]])
    }
  }
  return geometryFrom(segments)
}

/** The twelve edges of a unit cube, as endpoint pairs. */
const CUBE_EDGES = (() => {
  const c: [number, number, number][] = []
  for (let i = 0; i < 8; i++) {
    c.push([i & 1 ? 0.5 : -0.5, i & 2 ? 0.5 : -0.5, i & 4 ? 0.5 : -0.5])
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
const TRAIL_SEGMENTS = 8

/** Seconds for a block to travel the whole stack. */
const BLOCK_PERIOD = 13
/** Radius blocks wait at. Only the payload runs down the axis itself. */
const BLOCK_SEAT = 0.36
const BLOCK_SIZE = 0.17
/** 137.5°, so consecutive blocks never share a bearing. */
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))

const UP = new THREE.Vector3(0, 1, 0)

interface Block {
  /** Where in the shared cycle this block starts. */
  offset: number
  angle: number
}

/**
 * Blocks are evenly spaced around one cycle rather than randomly seeded.
 *
 * Random offsets and periods let them drift into piles — two or three landing
 * in the same queue on the same bearing and reading as one bright smear. A
 * single period with even offsets keeps the spacing fixed forever, and the
 * golden angle keeps any that do share a level on opposite sides of it.
 */
function makeBlocks(count: number): Block[] {
  return Array.from({ length: count }, (_, i) => ({
    offset: i / count,
    angle: i * GOLDEN_ANGLE,
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
  return {
    y: LEVELS[i] + (LEVELS[i + 1] - LEVELS[i]) * smoothstep(0.42, 1, local),
    level: i,
    local,
  }
}

export function Scheduler({ scale = 1, low = false }: { scale?: number; low?: boolean }) {
  const group = useRef<THREE.Group>(null)
  const ringRefs = useRef<(THREE.LineSegments | null)[]>([])
  const markerRefs = useRef<(THREE.LineSegments | null)[]>([])
  const angles = useRef<number[]>(Array.from({ length: RING_COUNT }, () => 0))

  const rings = useMemo(
    () =>
      Array.from({ length: RING_COUNT }, (_, i) => {
        const outer = ringOuter(i)
        const inner = outer - RING_BAND
        const divisions = Math.max(10, Math.round((TAU * outer) / (low ? 1.05 : CELL_ARC)))
        const cell = TAU / divisions
        return {
          geometry: ringGeometry(inner, outer, RING_HEIGHT, divisions),
          // The marker sits a hair proud of the band so it cannot z-fight with
          // the cell it is highlighting.
          marker: geometryFrom(
            cellSegments(inner * 0.995, outer * 1.005, RING_HEIGHT * 0.6, 0, cell)
          ),
          divisions,
          cell,
          y: ringY(i),
          // Alternating, and quicker further down: the deeper queues are the
          // ones under pressure.
          rate: (i % 2 ? -1 : 1) * (0.17 + i * 0.05),
          // How fast this queue's pointer walks its slots, in slots per second.
          step: 1.1 + i * 0.35,
          delay: i * 0.1,
        }
      }),
    [low]
  )

  const chute = useMemo(() => chuteGeometry(), [])

  /** The plate the column stands on: concentric rings plus a dotted perimeter. */
  const base = useMemo(() => {
    const segments: Seg[] = [
      ...circleSegments(1.15, BASE_Y, 64),
      ...circleSegments(1.85, BASE_Y, 72),
      ...circleSegments(2.6, BASE_Y, 80),
      ...dashedCircle(3.15, BASE_Y, 96, 0.42),
      ...dashedCircle(3.5, BASE_Y, 140, 0.14),
    ]
    // Spokes tying the plate together, kept sparse so it stays a floor and not
    // a sixth ring.
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * TAU
      segments.push([
        Math.cos(a) * 1.85, BASE_Y, Math.sin(a) * 1.85,
        Math.cos(a) * 2.6, BASE_Y, Math.sin(a) * 2.6,
      ])
    }
    return geometryFrom(segments)
  }, [])

  /** The dashed axis every block falls along, and guides down to the plate. */
  const guides = useMemo(() => {
    const segments: Seg[] = dashedColumn(0, 0, BASE_Y, SPAWN_Y + 0.5, 52, 0.55)
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * TAU + 0.4
      segments.push(...dashedColumn(Math.cos(a) * 2.85, Math.sin(a) * 2.85, BASE_Y, TOP_Y, 26, 0.4))
    }
    return geometryFrom(segments)
  }, [])

  const orbits = useMemo(
    () => ORBITS.map((o) => geometryFrom(dashedCircle(o.radius, 0, o.dashes, o.duty, o.tilt))),
    []
  )

  /** One satellite per orbit, riding its path. */
  const satellites = useMemo(() => {
    const positions = new Float32Array(ORBITS.length * 3)
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return {
      geometry: g,
      positions,
      quats: ORBITS.map((o) => new THREE.Quaternion().setFromEuler(o.tilt)),
    }
  }, [])

  const glowTex = useMemo(() => makeGlowTexture(), [])

  const blockCount = low ? 8 : 12
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

  /** A short streak above the payload, fading out behind it. */
  const trailBuf = useMemo(() => {
    const positions = new Float32Array(TRAIL_SEGMENTS * 6)
    const colors = new Float32Array(TRAIL_SEGMENTS * 6)
    for (let i = 0; i < TRAIL_SEGMENTS; i++) {
      const k0 = 1 - i / TRAIL_SEGMENTS
      const k1 = 1 - (i + 1) / TRAIL_SEGMENTS
      const o = i * 6
      colors[o] = colors[o + 1] = colors[o + 2] = k0 * k0
      colors[o + 3] = colors[o + 4] = colors[o + 5] = k1 * k1
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return { geometry: g, positions }
  }, [])

  // Ring and marker brightness is animated through material colour, not
  // opacity: the section cross-fader owns opacity and would overwrite it.
  const ringMats = useMemo(() => rings.map(() => hairline(0.34)), [rings])
  const markerMats = useMemo(() => rings.map(() => hairline(0.6)), [rings])
  const chuteMat = useMemo(() => hairline(0.26), [])
  const baseMat = useMemo(() => hairline(0.26), [])
  const guideMat = useMemo(() => hairline(0.12), [])
  const orbitMat = useMemo(() => hairline(0.16), [])
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
  const trailMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
    []
  )

  const matrix = useMemo(() => new THREE.Matrix4(), [])
  const quat = useMemo(() => new THREE.Quaternion(), [])
  const euler = useMemo(() => new THREE.Euler(), [])
  const scratch = useMemo(() => new THREE.Vector3(), [])
  const scaleVec = useMemo(() => new THREE.Vector3(), [])
  const position = useMemo(() => new THREE.Vector3(), [])
  /** How many blocks are being held at each ring this frame. */
  const held = useMemo(() => new Float32Array(RING_COUNT), [])

  const orbitRefs = useRef<(THREE.Group | null)[]>([])
  const payload = useRef(-1)
  const payloadRef = useRef<THREE.LineSegments>(null)
  const trailRef = useRef<THREE.LineSegments>(null)

  /** Writes one cube's edges into `out` at `offset`, transformed by `matrix`. */
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

    // Blocks first: the rings need to know what they are holding before they
    // can be lit for it.
    held.fill(0)
    {
      const { positions, colors, geometry } = blockBuf
      for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i]
        const u = (((t / BLOCK_PERIOD + b.offset) % 1) + 1) % 1
        const { y, level, local } = descend(u)

        // LEVELS[0] is the spawn point, so level n rests on ring n-1.
        if (level >= 1 && level <= RING_COUNT && local < 0.42) held[level - 1] += 1

        // Below the last ring they are in the chute, so pull them onto its axis.
        const inChute = smoothstep(CHUTE_TOP + 0.5, CHUTE_TOP - 0.4, y)
        const r = BLOCK_SEAT * (1 - inChute)
        const a = b.angle + t * 0.18

        position.set(Math.cos(a) * r, y, Math.sin(a) * r)
        // A fixed lean and one slow shared yaw. Per-block tumble rates read as
        // debris; a single rate reads as parts on a machine.
        euler.set(0.26, b.angle + t * 0.3, 0)
        quat.setFromEuler(euler)
        scaleVec.setScalar(BLOCK_SIZE)
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

    // Orbits precess slowly, and a satellite rides each one. Their speed rises
    // with the same keystroke impulse that spins the rings.
    {
      const { positions, quats, geometry } = satellites
      const v = scratch
      for (let i = 0; i < ORBITS.length; i++) {
        const o = ORBITS[i]
        const g = orbitRefs.current[i]
        if (g) g.rotation.y += dt * o.rate * (1 + nudge * 3)

        const a = t * (0.16 + i * 0.05) * (1 + nudge * 3) + i * 2.1
        v.set(Math.cos(a) * o.radius, 0, Math.sin(a) * o.radius).applyQuaternion(quats[i])
        if (g) v.applyAxisAngle(UP, g.rotation.y)
        positions[i * 3] = v.x
        positions[i * 3 + 1] = v.y
        positions[i * 3 + 2] = v.z
      }
      geometry.attributes.position.needsUpdate = true
    }

    // The clock tick: one sweep down the stack per TICK_PERIOD, lighting each
    // ring as it passes.
    const tickY = TOP_Y + 0.7 + (CHUTE_BOTTOM - TOP_Y - 0.7) * (((t / TICK_PERIOD) % 1) + 1) % 1

    for (let i = 0; i < RING_COUNT; i++) {
      const ring = rings[i]
      const mesh = ringRefs.current[i]
      if (!mesh) continue

      // Rings spin while there is work outstanding and pull onto a common axis
      // once the form is complete. The pull is toward the nearest whole turn,
      // so a ring settles where it is rather than visibly unwinding.
      angles.current[i] += dt * ring.rate * (1 + nudge * 5) * (1 - ready)
      const wrapped = ((((angles.current[i] + Math.PI) % TAU) + TAU) % TAU) - Math.PI
      angles.current[i] -= wrapped * (1 - Math.exp(-5 * dt)) * ready
      mesh.rotation.y = angles.current[i]

      // Each ring drops into place in turn, top first.
      const local = easeOut(clamp01((p - ring.delay) / (1 - ring.delay)))
      mesh.position.y = ring.y + (1 - local) * 5.5 + Math.sin(t * 9 + i) * 0.02 * nudge
      mesh.scale.setScalar(0.6 + local * 0.4)
      mesh.visible = local > 0.01

      const sweep = Math.exp(-Math.pow((ring.y - tickY) / 0.5, 2))
      const lit = 0.66 + Math.min(2, held[i]) * 0.18 + sweep * 0.5
      ringMats[i].color.setRGB(lit * 0.902, lit * 0.898, lit * 0.882)

      // The pointers walk whole slots at a time — a queue index, not a spin.
      // Two of them, a third of the ring apart, so a queue can show more than
      // one busy slot at once.
      const slot = Math.floor(t * ring.step + i * 2) % ring.divisions
      const first = markerRefs.current[i]
      if (first) first.rotation.y = slot * ring.cell
      const second = markerRefs.current[i + RING_COUNT]
      if (second) {
        second.rotation.y = ((slot + Math.floor(ring.divisions / 3)) % ring.divisions) * ring.cell
      }
      const mk = 0.6 + Math.min(1, held[i]) * 0.45 + sweep * 0.35
      markerMats[i].color.setRGB(mk * 0.902, mk * 0.898, mk * 0.882)
    }

    // The payload: released the moment the form goes valid, and it does not
    // queue — it drops straight through the aligned rings.
    if (sceneState.schedulerReadyTarget > 0.5 && payload.current < 0) payload.current = 0
    if (sceneState.schedulerReadyTarget < 0.5 && payload.current >= 1) payload.current = -1

    const live = payload.current >= 0 && payload.current < 1 && p > 0.2
    if (payloadRef.current) payloadRef.current.visible = live
    if (trailRef.current) trailRef.current.visible = live

    if (live) {
      payload.current = Math.min(1, payload.current + dt * 0.42)
      const u = easeOut(payload.current)
      const y = SPAWN_Y + (CHUTE_BOTTOM - SPAWN_Y) * u

      position.set(0, y, 0)
      euler.set(t * 0.6, t * 0.9, 0)
      quat.setFromEuler(euler)
      scaleVec.setScalar(0.44)
      matrix.compose(position, quat, scaleVec)
      writeCube(payloadBuf.positions, 0)
      payloadBuf.geometry.attributes.position.needsUpdate = true

      const { positions } = trailBuf
      for (let i = 0; i < TRAIL_SEGMENTS; i++) {
        const o = i * 6
        positions[o] = 0
        positions[o + 1] = y + (i / TRAIL_SEGMENTS) * 1.8
        positions[o + 2] = 0
        positions[o + 3] = 0
        positions[o + 4] = y + ((i + 1) / TRAIL_SEGMENTS) * 1.8
        positions[o + 5] = 0
      }
      trailBuf.geometry.attributes.position.needsUpdate = true
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
          material={ringMats[i]}
          position={[0, ring.y, 0]}
          frustumCulled={false}
        >
          {/* Children of the ring, so they inherit its place in the stack and
              only have to carry their own slot angle. */}
          <lineSegments
            ref={(el) => {
              markerRefs.current[i] = el
            }}
            geometry={ring.marker}
            material={markerMats[i]}
            frustumCulled={false}
          />
          <lineSegments
            ref={(el) => {
              markerRefs.current[i + RING_COUNT] = el
            }}
            geometry={ring.marker}
            material={markerMats[i]}
            frustumCulled={false}
          />
        </lineSegments>
      ))}

      {ORBITS.map((_, i) => (
        <group
          key={i}
          ref={(el) => {
            orbitRefs.current[i] = el
          }}
        >
          <lineSegments geometry={orbits[i]} material={orbitMat} frustumCulled={false} />
        </group>
      ))}

      <points geometry={satellites.geometry} frustumCulled={false}>
        <pointsMaterial
          size={0.09}
          color="#ffffff"
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>

      <lineSegments geometry={guides} material={guideMat} frustumCulled={false} />
      <lineSegments geometry={base} material={baseMat} frustumCulled={false} />

      {/* The pool the column stands in, laid flat on the plate. */}
      <mesh position={[0, BASE_Y + 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.2, 48]} />
        <meshBasicMaterial
          map={glowTex}
          transparent
          opacity={0.45}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      <lineSegments geometry={chute} material={chuteMat} frustumCulled={false} />
      <lineSegments geometry={blockBuf.geometry} material={blockMat} frustumCulled={false} />
      <lineSegments
        ref={payloadRef}
        geometry={payloadBuf.geometry}
        material={payloadMat}
        frustumCulled={false}
      />
      <lineSegments
        ref={trailRef}
        geometry={trailBuf.geometry}
        material={trailMat}
        frustumCulled={false}
      />
    </group>
  )
}
