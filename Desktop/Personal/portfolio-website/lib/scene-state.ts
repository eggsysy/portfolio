"use client"

/**
 * A tiny module-level store shared between the DOM and the WebGL scene.
 *
 * The canvas is mounted once in the root layout and persists across routes, so
 * it cannot read scroll position through React state without re-rendering the
 * tree every frame. The DOM writes here; the render loop reads here.
 */

/** Which object the world is showing. */
export type SceneMode =
  /** Ridge, light and drifting binary — the landing state. */
  | "hero"
  /** The wireframe brain with its mechanism. */
  | "brain"
  /** Drifting wireframe polyhedra. */
  | "shards"
  /** The solid pitted mass behind the contact form. */
  | "asteroid"
  /** Nothing but dust — for pages that are only text. */
  | "quiet"

export const sceneState = {
  /** 0..1 down the current page, already smoothed. */
  scroll: 0,
  scrollTarget: 0,
  /** Pointer in normalised device coords, smoothed. */
  pointerX: 0,
  pointerY: 0,
  pointerTargetX: 0,
  pointerTargetY: 0,
  /** Which object is on stage. */
  mode: "hero" as SceneMode,
  /**
   * How loud the world may be, 0..1. Sections full of body copy turn this
   * down; a hero turns it up. A backdrop that competes with text is noise.
   */
  intensity: 1,
  intensityTarget: 1,
  /** False when the user has asked for reduced motion. */
  animate: true,
}

export function setSceneMode(next: SceneMode) {
  sceneState.mode = next
}

export function setSceneIntensity(next: number) {
  sceneState.intensityTarget = Math.min(1, Math.max(0, next))
}

let listening = false

/** Attach scroll and pointer listeners once, from the client. */
export function startSceneInput() {
  if (listening || typeof window === "undefined") return
  listening = true

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
  sceneState.animate = !reduce.matches
  reduce.addEventListener("change", (e) => {
    sceneState.animate = !e.matches
  })

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    sceneState.scrollTarget = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
  }

  const onPointer = (e: PointerEvent) => {
    sceneState.pointerTargetX = (e.clientX / window.innerWidth) * 2 - 1
    sceneState.pointerTargetY = -((e.clientY / window.innerHeight) * 2 - 1)
  }

  onScroll()
  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("resize", onScroll, { passive: true })
  window.addEventListener("pointermove", onPointer, { passive: true })
}

/** Frame-rate independent damping. */
export function damp(current: number, target: number, lambda: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt))
}
