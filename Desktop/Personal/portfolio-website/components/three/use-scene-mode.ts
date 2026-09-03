"use client"

import { useEffect, useRef } from "react"
import { setSceneMode, setSceneIntensity, type SceneMode } from "@/lib/scene-state"

/**
 * Hands a section control of the lattice while it is on screen.
 *
 * `intensity` is how loud the world may be behind this particular section —
 * a hero can afford 1, a wall of body copy cannot. Anything reading-heavy
 * should sit at 0.3 or below or the edges compete with the text.
 */
export function useSceneMode(mode: SceneMode, intensity = 1) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSceneMode(mode)
          setSceneIntensity(intensity)
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
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
