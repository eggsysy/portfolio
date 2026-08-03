"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Replaces the native cursor with a pencil that leaves a fading graphite trail.
 * Only activates on devices with a fine pointer (mouse) and when the user has
 * not requested reduced motion — otherwise the native cursor is left untouched.
 */
export const PencilCursor = () => {
  const [active, setActive] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)

  // Decide whether the custom cursor should run at all.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const fine = window.matchMedia("(pointer: fine)").matches
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setActive(fine && !reduced)
  }, [])

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    const tip = tipRef.current
    if (!canvas || !tip) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const LIFE = 480 // ms a trail point stays visible
    let points: { x: number; y: number; t: number }[] = []
    let mouseX = -100
    let mouseY = -100
    let raf = 0

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
    }
    resize()

    document.documentElement.classList.add("pencil-cursor-active")

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      points.push({ x: e.clientX, y: e.clientY, t: performance.now() })
      tip.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      tip.style.opacity = "1"
    }
    const onLeave = () => {
      if (tip) tip.style.opacity = "0"
    }
    const onDown = () => tip && (tip.style.transform += " scale(0.85)")

    const draw = () => {
      const now = performance.now()
      points = points.filter((p) => now - p.t < LIFE)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const graphite = document.documentElement.classList.contains("dark")
        ? "180, 180, 205"
        : "90, 93, 120"
      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1]
        const p1 = points[i]
        const alpha = 1 - (now - p1.t) / LIFE
        ctx.strokeStyle = `rgba(${graphite}, ${alpha * 0.55})`
        ctx.lineWidth = alpha * 2.4 + 0.4
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.stroke()
      }
      raf = requestAnimationFrame(draw)
    }

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mousedown", onDown)
    document.addEventListener("mouseleave", onLeave)
    window.addEventListener("resize", resize)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mousedown", onDown)
      document.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("resize", resize)
      document.documentElement.classList.remove("pencil-cursor-active")
    }
  }, [active])

  if (!active) return null

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9998]"
      />
      {/* Pencil — the writing tip (0,5) is rotated up-left and anchored to the cursor */}
      <div
        ref={tipRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 will-change-transform"
        style={{ transform: "translate(-100px, -100px)" }}
      >
        <svg width="44" height="44" viewBox="0 0 44 44" style={{ overflow: "visible" }}>
          <g transform="translate(0,-5) rotate(-45 0 5)" stroke="#3a3a3a" strokeWidth="1" strokeLinejoin="round">
            {/* graphite tip (anchored at 0,5) */}
            <path d="M0 5 L4 2.5 L4 7.5 Z" fill="#3a3a3a" />
            {/* sharpened wood */}
            <path d="M4 2.5 L7 2 L7 8 L4 7.5 Z" fill="#e8b95a" />
            {/* yellow body */}
            <path d="M7 2 L24 2 L24 8 L7 8 Z" fill="#f7c948" />
            {/* metal ferrule */}
            <path d="M24 2 L26.5 2 L26.5 8 L24 8 Z" fill="#c9ccd6" />
            {/* eraser */}
            <path d="M26.5 2 L29 2 Q30.5 5 29 8 L26.5 8 Z" fill="#ef8f8f" />
          </g>
        </svg>
      </div>
    </>
  )
}
