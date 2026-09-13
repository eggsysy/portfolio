"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { sceneState } from "@/lib/scene-state"

/**
 * The hero landscape: a wireframe grid running out to the horizon.
 *
 * Rows *and* columns, so the surface is made of legible quads with a marked
 * vertex at every intersection — a topological map of pure lines rather than a
 * texture. The density is deliberately low: pack the lines any tighter and the
 * grid stops reading as geometry and starts reading as a soft wash, which is
 * the one thing this must not do.
 *
 * Three clean swells lift it, and nothing else. High-frequency chop is what
 * turns a mesh cloudy, so there is none — the motion has to come from long
 * wavelengths so that every line stays a line while it moves.
 *
 * Displacement runs in the vertex shader. Both the lines and the intersection
 * points read from the same geometry and the same shader, so they cannot drift
 * apart.
 */

const WIDTH = 230
const DEPTH = 108
/**
 * Rows and columns of the mesh.
 *
 * High enough to be intricate, held back from the density where the lines stop
 * resolving and the whole thing turns to fog. Every cell is still tens of
 * pixels across in the near field.
 */
const ROWS = 72
const COLS = 118
/** Every Nth line is drawn as a major one, giving the mesh a read order. */
const MAJOR = 6

/** Long, clean swells. Nothing short enough to blur a cell. */
const WAVES = /* glsl */ `
  h += 2.6 * sin(p.x * 0.079 + p.z * 0.042 + t * 0.5);
  h += 1.8 * sin(p.x * 0.036 - p.z * 0.098 + t * 0.36);
  h += 0.9 * sin(p.x * 0.131 + p.z * 0.112 + t * 0.72);
`

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uFadeNear;
  uniform float uFadeFar;
  uniform float uSize;
  varying float vBright;

  void main() {
    vec3 p = position;
    float t = uTime;
    float h = 0.0;
    ${WAVES}
    p.y = h;

    // A floor under the height ramp, so troughs stay drawn. A grid that fades
    // out in the low ground reads as broken rather than as depth.
    float crest = clamp(h / 5.3, -1.0, 1.0);
    float lit = 0.4 + 0.6 * smoothstep(-0.7, 0.95, crest);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    // Faded by distance here rather than by scene fog, which would need the
    // whole lighting chunk set pulled in for one multiply.
    vBright = lit * (1.0 - smoothstep(uFadeNear, uFadeFar, -mv.z));

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize;
  }
`

const FRAGMENT = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uCrest;
  uniform float uOpacity;
  varying float vBright;

  void main() {
    if (vBright <= 0.002) discard;
    // Low ground keeps the grid's own colour; crests wash out toward white.
    vec3 col = mix(uDeep, uCrest, pow(clamp(vBright, 0.0, 1.0), 2.0));
    gl_FragColor = vec4(col, vBright * uOpacity);
  }
`

export function DataGrid({ low = false }: { low?: boolean }) {
  const rows = low ? 46 : ROWS
  const cols = low ? 76 : COLS

  /**
   * One lattice of points, drawn three times.
   *
   * Minor lines, major lines and nodes are separate index buffers over a single
   * shared position attribute. A line's weight depends on which row or column
   * it belongs to, not on its endpoints, and endpoints are shared between a row
   * and a column — so the distinction cannot live on the vertices. Splitting
   * the indices is what lets the mesh have a read order at all.
   */
  const parts = useMemo(() => {
    const positions = new Float32Array(rows * cols * 3)
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const o = (j * cols + i) * 3
        positions[o] = (i / (cols - 1) - 0.5) * WIDTH
        positions[o + 2] = (j / (rows - 1) - 0.5) * DEPTH
      }
    }
    const attribute = new THREE.BufferAttribute(positions, 3)

    const minor: number[] = []
    const major: number[] = []
    const nodes: number[] = []

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const a = j * cols + i
        if (i < cols - 1) (j % MAJOR === 0 ? major : minor).push(a, a + 1)
        if (j < rows - 1) (i % MAJOR === 0 ? major : minor).push(a, a + cols)
        // Nodes only where two major lines cross. One at every intersection at
        // this density is a dot screen, not a set of markers.
        if (i % MAJOR === 0 && j % MAJOR === 0) nodes.push(a)
      }
    }

    const build = (index: number[]) => {
      const g = new THREE.BufferGeometry()
      g.setAttribute("position", attribute)
      g.setIndex(index)
      return g
    }
    return { minor: build(minor), major: build(major), nodes: build(nodes) }
  }, [rows, cols])

  /** Shared by reference, so one write per frame drives all three draws. */
  const shared = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeep: { value: new THREE.Color(0.3, 0.66, 0.63) },
      uCrest: { value: new THREE.Color(0.93, 1, 1) },
    }),
    []
  )

  /**
   * Detail drops out with distance, structure does not.
   *
   * Minor lines fade first: toward the horizon their spacing falls below a
   * pixel and they alias into a bright silt band. Retiring them early leaves
   * the majors and nodes carrying the far field, which is both cleaner and how
   * a drawing would handle it.
   */
  const minorUniforms = useMemo(
    () => ({
      ...shared,
      uFadeNear: { value: 34 },
      uFadeFar: { value: 80 },
      uSize: { value: 1 },
      uOpacity: { value: 0.46 },
    }),
    [shared]
  )

  const majorUniforms = useMemo(
    () => ({
      ...shared,
      uFadeNear: { value: 40 },
      uFadeFar: { value: 98 },
      uSize: { value: 1 },
      uOpacity: { value: 0.95 },
    }),
    [shared]
  )

  /** Brighter and larger than the lines, so the crossings read as nodes. */
  const nodeUniforms = useMemo(
    () => ({
      ...shared,
      uFadeNear: { value: 34 },
      uFadeFar: { value: 86 },
      uSize: { value: low ? 3.2 : 4 },
      uOpacity: { value: 1 },
    }),
    [shared, low]
  )

  const make = (uniforms: Record<string, THREE.IUniform>) =>
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      // Normal blending, not additive. Additive piles overlapping lines into a
      // glow, and a glowing lattice is exactly the soft look being avoided.
      blending: THREE.NormalBlending,
    })

  const minorMaterial = useMemo(() => make(minorUniforms), [minorUniforms])
  const majorMaterial = useMemo(() => make(majorUniforms), [majorUniforms])
  const nodeMaterial = useMemo(() => make(nodeUniforms), [nodeUniforms])

  const clock = useRef(0)

  useFrame((_, delta) => {
    if (sceneState.animate) clock.current += Math.min(delta, 0.05)
    shared.uTime.value = clock.current
  })

  return (
    <group position={[0, -16, -42]}>
      <lineSegments geometry={parts.minor} material={minorMaterial} frustumCulled={false} />
      <lineSegments geometry={parts.major} material={majorMaterial} frustumCulled={false} />
      <points geometry={parts.nodes} material={nodeMaterial} frustumCulled={false} />
    </group>
  )
}
