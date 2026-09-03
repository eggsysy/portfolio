"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { sceneState, damp } from "@/lib/scene-state"
import { graphite, hairline } from "./shared"

/**
 * An impossible knot — a mathematical artifact.
 *
 * A rectangular section swept along an asymmetric closed curve, with the
 * section rotating as it travels so the band turns through itself the way a
 * Möbius strip does. A second interlocked loop supplies the crossings that
 * make it read as impossible rather than merely twisted.
 *
 * The twist is applied in the vertex shader rather than baked into the
 * positions, so scroll can wind and unwind the ribbon without rebuilding
 * geometry every frame. That means the wireframe has to be generated here too
 * and carry the same attributes — EdgesGeometry works on baked positions and
 * would detach from the body the moment the twist moved.
 */

const TAU = Math.PI * 2

/** Asymmetric trefoil. The extra harmonics are what break the symmetry. */
function curvePoint(t: number, out: THREE.Vector3) {
  const a = t * TAU
  return out.set(
    Math.sin(a) + 2 * Math.sin(2 * a) + 0.28 * Math.sin(5 * a),
    Math.cos(a) - 2 * Math.cos(2 * a) - 0.22 * Math.cos(4 * a),
    -Math.sin(3 * a) * 1.16
  )
}

/** The band is not a constant extrusion — it swells and narrows as it runs. */
function taperAt(t: number) {
  return 0.78 + 0.34 * Math.sin(t * TAU * 2 + 0.7) + 0.1 * Math.sin(t * TAU * 5)
}

interface KnotBuffers {
  body: THREE.BufferGeometry
  lines: THREE.BufferGeometry
}

/**
 * Build body and wireframe together.
 *
 * Every vertex carries the curve point it belongs to, its local frame, its
 * position within the section, and its parameter along the curve — everything
 * the shader needs to re-sweep the ribbon at any twist.
 */
function buildKnot(steps: number, width: number, height: number, ringEvery: number): KnotBuffers {
  const p = new THREE.Vector3()
  const next = new THREE.Vector3()
  const tangent = new THREE.Vector3()
  const normal = new THREE.Vector3()
  const binormal = new THREE.Vector3()
  const up = new THREE.Vector3(0, 0, 1)

  // Corner offsets, and the outward normal at each corner in section space.
  const corners: [number, number][] = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1],
  ]
  const inv = 1 / Math.SQRT2

  const position: number[] = []
  const aCurve: number[] = []
  const aN: number[] = []
  const aB: number[] = []
  const aSec: number[] = []
  const aSecN: number[] = []
  const aT: number[] = []

  for (let s = 0; s < steps; s++) {
    const t = s / steps
    curvePoint(t, p)
    curvePoint((s + 1) / steps, next)

    tangent.subVectors(next, p).normalize()
    normal.crossVectors(tangent, up)
    // Degenerate wherever the tangent runs parallel to `up`; pick another axis.
    if (normal.lengthSq() < 1e-6) normal.set(1, 0, 0)
    normal.normalize()
    binormal.crossVectors(tangent, normal).normalize()

    const k = taperAt(t)

    for (const [cu, cv] of corners) {
      const u = cu * width * k
      const v = cv * height * k
      // Base (untwisted) position — kept so bounding volumes stay sane.
      position.push(
        p.x + normal.x * u + binormal.x * v,
        p.y + normal.y * u + binormal.y * v,
        p.z + normal.z * u + binormal.z * v
      )
      aCurve.push(p.x, p.y, p.z)
      aN.push(normal.x, normal.y, normal.z)
      aB.push(binormal.x, binormal.y, binormal.z)
      aSec.push(u, v)
      aSecN.push(cu * inv, cv * inv)
      aT.push(t)
    }
  }

  const attach = (g: THREE.BufferGeometry) => {
    g.setAttribute("position", new THREE.Float32BufferAttribute(position.slice(), 3))
    g.setAttribute("aCurve", new THREE.Float32BufferAttribute(aCurve.slice(), 3))
    g.setAttribute("aN", new THREE.Float32BufferAttribute(aN.slice(), 3))
    g.setAttribute("aB", new THREE.Float32BufferAttribute(aB.slice(), 3))
    g.setAttribute("aSec", new THREE.Float32BufferAttribute(aSec.slice(), 2))
    g.setAttribute("aSecN", new THREE.Float32BufferAttribute(aSecN.slice(), 2))
    g.setAttribute("aT", new THREE.Float32BufferAttribute(aT.slice(), 1))
    return g
  }

  // Solid: stitch consecutive sections into quads, wrapping at the seam.
  const bodyIndex: number[] = []
  for (let s = 0; s < steps; s++) {
    const a = s * 4
    const b = ((s + 1) % steps) * 4
    for (let i = 0; i < 4; i++) {
      const j = (i + 1) % 4
      bodyIndex.push(a + i, b + i, b + j, a + i, b + j, a + j)
    }
  }
  const body = attach(new THREE.BufferGeometry())
  body.setIndex(bodyIndex)
  body.computeBoundingSphere()

  // Wireframe: four longitudinal rails, plus occasional cross-rings.
  const lineIndex: number[] = []
  for (let s = 0; s < steps; s++) {
    const a = s * 4
    const b = ((s + 1) % steps) * 4
    for (let i = 0; i < 4; i++) lineIndex.push(a + i, b + i)
    if (s % ringEvery === 0) {
      for (let i = 0; i < 4; i++) lineIndex.push(a + i, a + ((i + 1) % 4))
    }
  }
  const lines = attach(new THREE.BufferGeometry())
  lines.setIndex(lineIndex)
  lines.computeBoundingSphere()

  return { body, lines }
}

/** Nodes on the curve, lifted clear of the band, with a tether back to it. */
function buildNodes(count: number) {
  const p = new THREE.Vector3()
  const positions: [number, number, number][] = []
  const tether: number[] = []

  for (let i = 0; i < count; i++) {
    const t = i / count
    curvePoint(t, p)
    const lift = 1.15
    positions.push([p.x * lift, p.y * lift, p.z * lift])
    // A hairline from the node back to the spine it belongs to.
    tether.push(p.x * lift, p.y * lift, p.z * lift, p.x, p.y, p.z)
  }

  const tetherGeo = new THREE.BufferGeometry()
  tetherGeo.setAttribute("position", new THREE.Float32BufferAttribute(tether, 3))
  return { positions, tetherGeo }
}

/** Shared GLSL for re-sweeping the ribbon at an arbitrary twist. */
const SWEEP_ATTRS = /* glsl */ `
  attribute vec3 aCurve;
  attribute vec3 aN;
  attribute vec3 aB;
  attribute vec2 aSec;
  attribute float aT;
  uniform float uTwist;
`

/**
 * The wireframe. Its own shader, because it needs the same vertex deformation
 * as the body plus the travelling pulse and the depth fade.
 */
function railMaterial(uniforms: Record<string, THREE.IUniform>) {
  return new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */ `
      ${SWEEP_ATTRS}
      uniform float uProgress;
      uniform float uFadeNear;
      uniform float uFadeFar;
      varying float vGlow;
      varying float vFade;

      void main() {
        float tw = aT * 3.141592653589793 * uTwist;
        float c = cos(tw), s = sin(tw);
        vec2 sec = vec2(aSec.x * c - aSec.y * s, aSec.x * s + aSec.y * c);
        vec3 pos = aCurve + aN * sec.x + aB * sec.y;

        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mv;

        // Travelling pulse: distance around the loop from the pulse head,
        // measured cyclically so it wraps cleanly at the seam.
        float d = abs(fract(aT - uProgress + 0.5) - 0.5);
        vGlow = smoothstep(0.055, 0.0, d);

        vFade = clamp((-mv.z - uFadeNear) / (uFadeFar - uFadeNear), 0.0, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform vec3 uPulse;
      uniform float uOpacity;
      varying float vGlow;
      varying float vFade;

      void main() {
        // Far side of the knot recedes, so the crossings read.
        float a = uOpacity * mix(1.0, 0.12, vFade);
        vec3 col = mix(uColor, uPulse, vGlow) + vGlow * 0.9;
        gl_FragColor = vec4(col, a + vGlow * 0.55);
      }
    `,
  })
}

export function ImpossibleKnot({ scale = 1 }: { scale?: number }) {
  const group = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Group>(null)
  const nodesRef = useRef<THREE.Group>(null)

  /**
   * Uniform objects are created once and handed to every material, so a single
   * assignment per frame drives the body and both wireframes together.
   */
  const uniforms = useMemo(
    () => ({
      uTwist: { value: 3 },
      uProgress: { value: 0 },
      uPulse: { value: new THREE.Color("#f2f6f4") },
      uColor: { value: new THREE.Color("#8d8d88") },
      uOpacity: { value: 0.42 },
      uFadeNear: { value: 9 },
      uFadeFar: { value: 19 },
    }),
    []
  )

  const innerUniforms = useMemo(
    () => ({
      ...uniforms,
      uTwist: { value: 5 },
      uColor: { value: new THREE.Color("#a5a5a0") },
      uOpacity: { value: 0.5 },
    }),
    [uniforms]
  )

  const outer = useMemo(() => buildKnot(280, 0.115, 0.032, 4), [])
  const innerGeo = useMemo(() => buildKnot(220, 0.07, 0.022, 5), [])
  const { positions: nodePos, tetherGeo } = useMemo(() => buildNodes(16), [])

  const outerRail = useMemo(() => railMaterial(uniforms), [uniforms])
  const innerRail = useMemo(() => railMaterial(innerUniforms), [innerUniforms])

  /**
   * The body reuses the standard lit material so it keeps its metal response,
   * with the sweep, the pulse and the depth fade patched in. Rotating the
   * section normal by the same angle as the section itself is what keeps the
   * lighting correct as the ribbon winds.
   *
   * Built per loop, not shared: the two loops run at different twists, and a
   * shared material would leave the inner body sweeping at the outer body's
   * angle while its own wireframe swept at the inner one — they would come
   * apart the moment scroll moved.
   */
  const makeBodyMaterial = (u: Record<string, THREE.IUniform>) => {
    const mat = graphite({ flatShading: false, roughness: 0.34, metalness: 0.8 })

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTwist = u.uTwist
      shader.uniforms.uProgress = u.uProgress
      shader.uniforms.uPulse = u.uPulse
      shader.uniforms.uFadeNear = u.uFadeNear
      shader.uniforms.uFadeFar = u.uFadeFar

      shader.vertexShader =
        `${SWEEP_ATTRS}
         attribute vec2 aSecN;
         varying float vT;
         varying float vDepth;
        ` + shader.vertexShader

      shader.vertexShader = shader.vertexShader.replace(
        "#include <beginnormal_vertex>",
        /* glsl */ `
          float _tw = aT * 3.141592653589793 * uTwist;
          float _c = cos(_tw), _s = sin(_tw);
          vec2 _sn = vec2(aSecN.x * _c - aSecN.y * _s, aSecN.x * _s + aSecN.y * _c);
          vec3 objectNormal = normalize(aN * _sn.x + aB * _sn.y);
        `
      )

      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        /* glsl */ `
          vec2 _sec = vec2(aSec.x * _c - aSec.y * _s, aSec.x * _s + aSec.y * _c);
          vec3 transformed = aCurve + aN * _sec.x + aB * _sec.y;
          vT = aT;
          vDepth = -(modelViewMatrix * vec4(transformed, 1.0)).z;
        `
      )

      shader.fragmentShader =
        `uniform float uProgress;
         uniform vec3 uPulse;
         uniform float uFadeNear;
         uniform float uFadeFar;
         varying float vT;
         varying float vDepth;
        ` + shader.fragmentShader

      // Atmospheric recession: sink the far side toward the ground colour
      // rather than fading alpha, which would need sorting on a self-crossing
      // shape and would sort badly.
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <color_fragment>",
        /* glsl */ `
          #include <color_fragment>
          float _fade = clamp((vDepth - uFadeNear) / (uFadeFar - uFadeNear), 0.0, 1.0);
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.05, 0.05, 0.055), _fade * 0.85);
        `
      )

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <emissivemap_fragment>",
        /* glsl */ `
          #include <emissivemap_fragment>
          float _d = abs(fract(vT - uProgress + 0.5) - 0.5);
          totalEmissiveRadiance += uPulse * smoothstep(0.05, 0.0, _d) * 1.5;
        `
      )
    }

    return mat
  }

  const outerBody = useMemo(() => makeBodyMaterial(uniforms), [uniforms])
  const innerBody = useMemo(() => makeBodyMaterial(innerUniforms), [innerUniforms])

  const nodeMat = useMemo(() => graphite({ color: "#1c1c20", roughness: 0.3 }), [])
  const tetherMat = useMemo(() => hairline(0.16), [])
  const nodeEdgeMat = useMemo(() => hairline(0.5), [])

  const nodeGeo = useMemo(() => new THREE.OctahedronGeometry(0.055, 0), [])
  const nodeEdges = useMemo(() => new THREE.EdgesGeometry(nodeGeo, 10), [nodeGeo])

  useFrame((_, delta) => {
    if (!sceneState.animate) return
    const dt = Math.min(delta, 0.05)
    const t = performance.now() * 0.001

    // The pulse runs the length of the loop, once every ~7 seconds.
    uniforms.uProgress.value = (uniforms.uProgress.value + dt * 0.14) % 1

    // Scroll winds the ribbon tighter as you read down the page.
    const target = 1.6 + sceneState.scroll * 5.2
    uniforms.uTwist.value = damp(uniforms.uTwist.value, target, 1.6, dt)
    innerUniforms.uTwist.value = damp(innerUniforms.uTwist.value, target * 1.7 + 1, 1.6, dt)

    if (group.current) {
      group.current.rotation.y += dt * 0.14
      group.current.rotation.x = 0.28 + Math.sin(t * 0.16) * 0.14 + sceneState.pointerY * 0.1
      group.current.rotation.z = sceneState.pointerX * 0.1
    }
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
      <mesh geometry={outer.body} material={outerBody} frustumCulled={false} />
      <lineSegments geometry={outer.lines} material={outerRail} frustumCulled={false} />

      {/* A second loop, more tightly twisted, threaded through the first. */}
      <group ref={inner} scale={0.58} rotation={[0.9, 0.4, 0]}>
        <mesh geometry={innerGeo.body} material={innerBody} frustumCulled={false} />
        <lineSegments geometry={innerGeo.lines} material={innerRail} frustumCulled={false} />
      </group>

      {/* Tethers first, so the nodes read as suspended from the spine. */}
      <lineSegments geometry={tetherGeo} material={tetherMat} frustumCulled={false} />

      <group ref={nodesRef}>
        {nodePos.map((pos, i) => (
          <group key={i} position={pos}>
            <mesh geometry={nodeGeo} material={nodeMat} frustumCulled={false} />
            <lineSegments geometry={nodeEdges} material={nodeEdgeMat} frustumCulled={false} />
          </group>
        ))}
      </group>
    </group>
  )
}
