import * as THREE from "three"

/**
 * The material language shared by every About-section model: graphite bodies
 * that catch a hard rim highlight, overlaid with hairline wireframe.
 *
 * Keeping these in one place is what makes the three models feel like variants
 * of one object rather than three unrelated downloads.
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

/** Polished, for lens glass and precision parts. */
export function polished(overrides: THREE.MeshStandardMaterialParameters = {}) {
  return new THREE.MeshStandardMaterial({
    color: "#0b0b0d",
    metalness: 0.95,
    roughness: 0.12,
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

/** Deterministic PRNG, so a shape is identical on every load. */
export function makeRandom(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

/** Edges of a geometry, as a line-segment geometry. */
export function edgesOf(geometry: THREE.BufferGeometry, threshold = 18) {
  return new THREE.EdgesGeometry(geometry, threshold)
}
