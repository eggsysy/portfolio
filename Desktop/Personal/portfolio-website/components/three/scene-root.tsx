"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const Scene = dynamic(() => import("@/components/three/scene"), { ssr: false })

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas")
    return Boolean(
      window.WebGLRenderingContext && (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    )
  } catch {
    return false
  }
}

/**
 * Mounts the WebGL scene once, behind everything, for the life of the session.
 * A static wash is always painted underneath, so a machine without WebGL gets
 * a deliberate look rather than an empty black rectangle.
 */
export function SceneRoot() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (supportsWebGL()) setReady(true)
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 bg-ink">
      <div className="absolute inset-0 bg-[radial-gradient(105%_75%_at_50%_8%,#1b1b1b_0%,#111111_42%,#0e0e0e_100%)]" />
      {ready && (
        <div className="absolute inset-0 animate-[fadein_1.6s_ease-out_both]">
          <Scene />
        </div>
      )}
      <style>{`@keyframes fadein { from { opacity: 0 } to { opacity: 1 } }`}</style>
    </div>
  )
}
