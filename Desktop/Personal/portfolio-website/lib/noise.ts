/**
 * Small deterministic 3D gradient noise, plus fbm on top of it.
 *
 * Used to sculpt the geometry in the scene — the folds of the brain, the
 * ridges of the terrain, the pitting on the asteroid. Deterministic so the
 * shapes are identical on every load rather than reshuffling on refresh.
 */

const P = new Uint8Array(512)

;(() => {
  const perm = new Uint8Array(256)
  for (let i = 0; i < 256; i++) perm[i] = i
  // Fisher–Yates with a fixed LCG seed.
  let s = 1337
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    const t = perm[i]
    perm[i] = perm[j]
    perm[j] = t
  }
  for (let i = 0; i < 512; i++) P[i] = perm[i & 255]
})()

const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
const lerp = (a: number, b: number, t: number) => a + t * (b - a)

function grad(hash: number, x: number, y: number, z: number) {
  const h = hash & 15
  const u = h < 8 ? x : y
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
}

/** Classic Perlin noise in 3D, roughly -1..1. */
export function noise3(x: number, y: number, z: number): number {
  const X = Math.floor(x) & 255
  const Y = Math.floor(y) & 255
  const Z = Math.floor(z) & 255
  x -= Math.floor(x)
  y -= Math.floor(y)
  z -= Math.floor(z)

  const u = fade(x)
  const v = fade(y)
  const w = fade(z)

  const A = P[X] + Y
  const AA = P[A] + Z
  const AB = P[A + 1] + Z
  const B = P[X + 1] + Y
  const BA = P[B] + Z
  const BB = P[B + 1] + Z

  return lerp(
    lerp(
      lerp(grad(P[AA], x, y, z), grad(P[BA], x - 1, y, z), u),
      lerp(grad(P[AB], x, y - 1, z), grad(P[BB], x - 1, y - 1, z), u),
      v
    ),
    lerp(
      lerp(grad(P[AA + 1], x, y, z - 1), grad(P[BA + 1], x - 1, y, z - 1), u),
      lerp(grad(P[AB + 1], x, y - 1, z - 1), grad(P[BB + 1], x - 1, y - 1, z - 1), u),
      v
    ),
    w
  )
}

/** Fractional Brownian motion — stacked octaves of noise3. */
export function fbm(x: number, y: number, z: number, octaves = 4, lacunarity = 2, gain = 0.5) {
  let sum = 0
  let amp = 1
  let freq = 1
  let norm = 0
  for (let i = 0; i < octaves; i++) {
    sum += amp * noise3(x * freq, y * freq, z * freq)
    norm += amp
    amp *= gain
    freq *= lacunarity
  }
  return sum / norm
}
