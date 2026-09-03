import * as THREE from "three"

/**
 * The material language for the About-section sculpture: a graphite body
 * that catches a hard rim highlight, overlaid with hairline wireframe.
 *
 * Kept separate from the geometry so the look can be retuned in one place
 * without touching the sweep maths.
 */

/** Near-black body with enough metalness to pick up the rim light. */
export function graphite(overrides: THREE.MeshStandardMaterialParameters = {}) {
  return new THREE.MeshStandardMaterial({
    color: "#141416",
    metalness: 0.72,
    roughness: 0.42,
    flatShading: true,
    ...overrides,
  })
}

/** Hairline overlay. Additive so crossings brighten rather than flatten. */
export function hairline(opacity = 0.3) {
  return new THREE.LineBasicMaterial({
    color: "#e6e5e1",
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
  })
}

/** Edges of a geometry, as a line-segment geometry. */
export function edgesOf(geometry: THREE.BufferGeometry, threshold = 18) {
  return new THREE.EdgesGeometry(geometry, threshold)
}
