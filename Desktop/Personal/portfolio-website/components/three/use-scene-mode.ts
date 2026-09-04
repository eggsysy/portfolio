"use client"

import { useEffect, useRef } from "react"
import { setSceneMode, setSceneIntensity, setAssemblyProgress, type SceneMode } from "@/lib/scene-state"

/**
 * Which section owns the world, resolved deterministically.
 *
 * This used to be one IntersectionObserver per section that fired
 * `setSceneMode` whenever its section reported `isIntersecting`. That makes
 * the winner "whichever section's callback happened to run last", which is not
 * defined behaviour — during a fast scroll or a programmatic jump two sections
 * can both report in, in either order, and the wrong object stays on stage.
 * It failed roughly half the time and looked like a rendering bug.
 *
 * Instead every section registers here, and on each scroll the one containing
 * the middle of the viewport wins. Sections do not overlap, so exactly one can
 * contain that point and the answer never depends on callback ordering.
 */
type Registration = {
  el: HTMLElement
  mode: SceneMode
  intensity: number
}

const registry = new Set<Registration>()
let listening = false
let queued = false

function resolve() {
  queued = false
  const middle = window.innerHeight / 2

  let best: Registration | null = null
  let bestDistance = Infinity

  for (const entry of registry) {
    const rect = entry.el.getBoundingClientRect()
    // Zero while the section spans the middle; otherwise how far off it is.
    const distance = rect.top > middle ? rect.top - middle : rect.bottom < middle ? middle - rect.bottom : 0
    if (distance < bestDistance) {
      bestDistance = distance
      best = entry
    }
  }

  if (best) {
    setSceneMode(best.mode)
    setSceneIntensity(best.intensity)
  }
}

function schedule() {
  if (queued) return
  queued = true
  requestAnimationFrame(resolve)
}

function ensureListener() {
  if (listening) return
  listening = true
  window.addEventListener("scroll", schedule, { passive: true })
  window.addEventListener("resize", schedule, { passive: true })
}

/**
 * Hands a section control of the world while it holds the viewport centre.
 *
 * `intensity` is how loud the scene may be behind this section — a hero can
 * afford 1, a wall of body copy cannot. Anything reading-heavy should sit at
 * 0.3 or below or the geometry competes with the text.
 */
export function useSceneMode(mode: SceneMode, intensity = 1) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const registration: Registration = { el, mode, intensity }
    registry.add(registration)
    ensureListener()
    schedule()

    return () => {
      registry.delete(registration)
      schedule()
    }
  }, [mode, intensity])

  return ref
}

/** Sets mode and intensity once on mount — for pages that hold a single state. */
export function useStaticSceneMode(mode: SceneMode, intensity = 0.3) {
  useEffect(() => {
    setSceneMode(mode)
    setSceneIntensity(intensity)
  }, [mode, intensity])
}

/**
 * Reports how far the reader has scrolled into a section, for objects that
 * build themselves as you arrive.
 *
 * Raw progress runs 0 when the section's top sits at the bottom of the
 * viewport to 1 when it reaches the top. That is remapped so assembly only
 * begins around the point the scene actually switches to this section —
 * otherwise the object would be fully built before it faded in.
 */
export function useAssemblyProgress(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const raw = 1 - rect.top / window.innerHeight
      setAssemblyProgress((raw - 0.45) / 0.5)
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update, { passive: true })
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [ref])
}
