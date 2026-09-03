"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { sceneState } from "@/lib/scene-state"
import { graphite, polished, hairline, edgesOf } from "./shared"

/**
 * A giant optical machine — an eye built as instrumentation rather than
 * anatomy: a deep lens sunk into a housing, an aperture of overlapping blades,
 * nested gimbal rings on three axes, and armature reaching in from outside.
 *
 * The rings run at different rates and on different axes, so the whole thing
 * reads as tracking something rather than idling.
 */

/** One aperture blade: a thin tapered plate. */
function bladeGeometry() {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.lineTo(0.86, 0.13)
  shape.lineTo(0.95, 0.02)
  shape.lineTo(0.9, -0.12)
  shape.lineTo(0.05, -0.15)
  shape.closePath()
  return new THREE.ExtrudeGeometry(shape, { depth: 0.028, bevelEnabled: false })
}

/** A gimbal ring with a squared-off section, so it reads machined. */
function ringGeometry(radius: number, thickness: number) {
  return new THREE.TorusGeometry(radius, thickness, 4, 96)
}

export function MechanicalEye({ scale = 1 }: { scale?: number }) {
  const group = useRef<THREE.Group>(null)
  const gimbalA = useRef<THREE.Group>(null)
  const gimbalB = useRef<THREE.Group>(null)
  const gimbalC = useRef<THREE.Group>(null)
  const aperture = useRef<THREE.Group>(null)

  const blade = useMemo(() => bladeGeometry(), [])
  const bladeEdges = useMemo(() => edgesOf(blade, 30), [blade])

  const rings = useMemo(
    () => ({
      a: ringGeometry(1.62, 0.045),
      b: ringGeometry(1.34, 0.038),
      c: ringGeometry(1.08, 0.032),
    }),
    []
  )
  const ringEdges = useMemo(
    () => ({
      a: edgesOf(rings.a, 24),
      b: edgesOf(rings.b, 24),
      c: edgesOf(rings.c, 24),
    }),
    [rings]
  )

  const housing = useMemo(() => new THREE.CylinderGeometry(0.94, 0.82, 0.34, 32, 1, true), [])
  const housingEdges = useMemo(() => edgesOf(housing, 20), [housing])

  const lens = useMemo(() => new THREE.SphereGeometry(0.72, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.42), [])
  const iris = useMemo(() => new THREE.RingGeometry(0.3, 0.72, 64), [])

  const bodyMat = useMemo(() => graphite(), [])
  const glassMat = useMemo(() => polished({ color: "#08080a", roughness: 0.06, metalness: 1 }), [])
  const irisMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#1b1e20", side: THREE.DoubleSide, toneMapped: false }),
    []
  )
  const lineMat = useMemo(() => hairline(0.52), [])
  const brightLine = useMemo(() => hairline(0.72), [])

  /** Armature: struts reaching in from beyond the outer ring. */
  const arms = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2 + 0.28
        return { angle: a, length: 0.62 + (i % 3) * 0.16 }
      }),
    []
  )

  useFrame((_, delta) => {
    if (!sceneState.animate) return
    const dt = Math.min(delta, 0.05)
    const t = performance.now() * 0.001

    if (group.current) {
      // The whole instrument turns to follow the pointer, like a mount tracking.
      group.current.rotation.y = sceneState.pointerX * 0.42 + Math.sin(t * 0.12) * 0.1
      group.current.rotation.x = -sceneState.pointerY * 0.3 + Math.sin(t * 0.09) * 0.05
    }

    if (gimbalA.current) gimbalA.current.rotation.z += dt * 0.16
    if (gimbalB.current) {
      gimbalB.current.rotation.z -= dt * 0.25
      gimbalB.current.rotation.x = 0.5 + Math.sin(t * 0.22) * 0.16
    }
    if (gimbalC.current) {
      gimbalC.current.rotation.z += dt * 0.34
      gimbalC.current.rotation.y = 0.62 + Math.cos(t * 0.19) * 0.2
    }

    // The aperture breathes — a slow dilation rather than a blink.
    if (aperture.current) {
      const open = 0.82 + Math.sin(t * 0.42) * 0.16
      aperture.current.scale.setScalar(open)
      aperture.current.rotation.z = t * 0.06
    }
  })

  return (
    <group ref={group} scale={scale * 1.5}>
      {/* Nested gimbal rings, each on its own axis. */}
      <group ref={gimbalA}>
        <mesh geometry={rings.a} material={bodyMat} frustumCulled={false} />
        <lineSegments geometry={ringEdges.a} material={lineMat} frustumCulled={false} />
      </group>

      <group ref={gimbalB} rotation={[0.5, 0, 0]}>
        <mesh geometry={rings.b} material={bodyMat} frustumCulled={false} />
        <lineSegments geometry={ringEdges.b} material={lineMat} frustumCulled={false} />
      </group>

      <group ref={gimbalC} rotation={[0, 0.62, 0]}>
        <mesh geometry={rings.c} material={bodyMat} frustumCulled={false} />
        <lineSegments geometry={ringEdges.c} material={lineMat} frustumCulled={false} />
      </group>

      {/* Armature reaching in from outside the rings, with joints. */}
      {arms.map((arm, i) => (
        <group key={i} rotation={[0, 0, arm.angle]}>
          <mesh
            geometry={new THREE.BoxGeometry(arm.length, 0.035, 0.05)}
            material={bodyMat}
            position={[1.62 + arm.length / 2, 0, 0]}
            frustumCulled={false}
          />
          <mesh
            geometry={new THREE.OctahedronGeometry(0.062, 0)}
            material={bodyMat}
            position={[1.62 + arm.length, 0, 0]}
            frustumCulled={false}
          />
        </group>
      ))}

      {/* Housing the lens sits in. */}
      <group rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.16]}>
        <mesh geometry={housing} material={bodyMat} frustumCulled={false} />
        <lineSegments geometry={housingEdges} material={lineMat} frustumCulled={false} />
      </group>

      {/* Aperture blades, overlapping around the pupil. */}
      <group ref={aperture} position={[0, 0, 0.2]}>
        {Array.from({ length: 11 }, (_, i) => {
          const a = (i / 11) * Math.PI * 2
          return (
            <group key={i} rotation={[0, 0, a]}>
              <mesh
                geometry={blade}
                material={bodyMat}
                position={[0.26, 0, 0]}
                rotation={[0, 0, 0.42]}
                frustumCulled={false}
              />
              <lineSegments
                geometry={bladeEdges}
                material={lineMat}
                position={[0.26, 0, 0]}
                rotation={[0, 0, 0.42]}
                frustumCulled={false}
              />
            </group>
          )
        })}
      </group>

      {/* Iris plate and the deep lens itself. */}
      <mesh geometry={iris} material={irisMat} position={[0, 0, 0.16]} frustumCulled={false} />
      {/* Recessed. The cap's apex sits 0.72 ahead of its centre, so at z −0.1
          the dome bulged out past the aperture and blacked out the pupil; at
          −0.66 the apex lands around z 0.06, sunk inside the housing where a
          lens belongs. */}
      <mesh
        geometry={lens}
        material={glassMat}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, -0.66]}
        frustumCulled={false}
      />

      {/* The focal point. The blades sit at z 0.2, so the pupil ring has to
          clear them or the centre reads as an unlit hole. */}
      <mesh position={[0, 0, 0.34]} frustumCulled={false}>
        <ringGeometry args={[0.3, 0.325, 64]} />
        <meshBasicMaterial color="#eef2f0" transparent opacity={0.95} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>

      {/* A dim lit core behind the ring, so the lens looks powered. */}
      <mesh position={[0, 0, 0.24]} frustumCulled={false}>
        <circleGeometry args={[0.3, 48]} />
        <meshBasicMaterial color="#5c6b66" transparent opacity={0.34} toneMapped={false} />
      </mesh>

      <lineSegments frustumCulled={false} position={[0, 0, 0.22]}>
        <edgesGeometry args={[new THREE.RingGeometry(0.72, 0.74, 96)]} />
        <primitive object={brightLine} attach="material" />
      </lineSegments>
    </group>
  )
}
