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
  /** The sculpture on About — currently the impossible knot. */
  | "sculpture"
  /** Drifting wireframe polyhedra. */
  | "shards"
  /** The transmitting instrument behind the contact form. */
  | "signal"
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
  /**
   * How far a section-scoped assembly has come together, 0..1.
   *
   * Separate from `scroll`, which is whole-page: an object that builds itself
   * needs to know how far through *its own* section the reader is, or it would
   * finish assembling before it was even on screen.
   */
  assembly: 0,
  assemblyTarget: 0,
  /**
   * The contact form's grip on the scheduler.
   *
   * `nudge` is a decaying impulse — every keystroke adds to it and the rings
   * speed up briefly. `ready` goes to 1 once the form is valid, which stops the
   * rings spinning, aligns them and releases the payload.
   */
  schedulerNudge: 0,
  schedulerNudgeTarget: 0,
  schedulerReady: 0,
  schedulerReadyTarget: 0,
  /** False when the user has asked for reduced motion. */
  animate: true,
}

/** One keystroke's worth of spin. Capped, so holding a key cannot run away. */
export function nudgeScheduler() {
  sceneState.schedulerNudgeTarget = Math.min(1, sceneState.schedulerNudgeTarget + 0.3)
}

/** True once every field is filled and valid. */
export function setSchedulerReady(ready: boolean) {
  sceneState.schedulerReadyTarget = ready ? 1 : 0
}

export function setAssemblyProgress(next: number) {
  sceneState.assemblyTarget = Math.min(1, Math.max(0, next))
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
