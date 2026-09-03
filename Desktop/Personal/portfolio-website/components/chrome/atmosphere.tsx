"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Film grain and vignette over the whole frame.
 *
 * This is doing more work than it looks like it is. A dark page rendered in
 * flat CSS reads as switched-off; the same page under moving grain reads as a
 * photographed room, and every edge in the 3D behind it softens into it.
 */
export function Atmosphere() {
  return (
    <>
      <div className="grain animate-grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
    </>
  )
}

/**
 * A ring that trails the pointer.
 *
 * It augments the system cursor rather than replacing it — no `cursor: none`.
 * Hiding the real cursor is the thing that makes a site feel like a toy, and
 * it costs a visitor the one piece of UI they actually rely on.
 */
export function CursorRing() {
  const ring = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!fine || reduced) return
    setEnabled(true)

    let x = -100
    let y = -100
    let tx = -100
    let ty = -100
    let raf = 0

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
    }

    const loop = () => {
      x += (tx - x) * 0.16
      y += (ty - y) * 0.16
      if (ring.current) {
        ring.current.style.transform = `translate3d(${x - 13}px, ${y - 13}px, 0)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[45] h-[26px] w-[26px] rounded-full border border-chalk/40 mix-blend-difference"
    />
  )
}
