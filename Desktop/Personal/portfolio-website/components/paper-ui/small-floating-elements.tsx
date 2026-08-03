"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SmallFloatingElementsProps {
  count?: number
}

// Deterministic pseudo-random in [0, 1) seeded by n, so the server and client
// render identical values and hydration stays stable (no Math.random() drift).
const seeded = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

export const SmallFloatingElements = ({ count = 8 }: SmallFloatingElementsProps) => {
  // These are decorative, randomly-scattered sparkles. Framer Motion rounds
  // numeric style values differently on the server vs client, so rendering them
  // during SSR causes hydration mismatches. Mount them client-side instead.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const elements = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r = (k: number) => seeded(i * 17.13 + k)
        return {
          initialX: r(1) * 100 - 50,
          initialY: r(2) * 100 - 50,
          duration: 2 + r(3),
          delay: r(4) * 2,
          size: 8 + Math.floor(r(5) * 16),
          left: 10 + r(6) * 80,
          top: 10 + r(7) * 80,
          bg: i % 3 === 0 ? "#00f2c3" : i % 3 === 1 ? "#5a5dff" : "#ffffff",
          opacity: 0.3 + r(8) * 0.4,
          radius: r(9) > 0.5 ? "50%" : "15px",
          rotate: r(10) * 30 - 15,
          clip: r(11) > 0.7 ? "polygon(0% 15%, 85% 0%, 100% 85%, 15% 100%)" : "none",
        }
      }),
    [count]
  )

  if (!mounted) return null

  return (
    <>
      {elements.map((el, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, x: el.initialX, y: el.initialY }}
          animate={{ opacity: el.opacity, scale: 1, x: 0, y: 0 }}
          transition={{ duration: el.duration, delay: el.delay, ease: "easeOut" }}
          className={cn("absolute shadow-md pointer-events-none")}
          style={{
            width: `${el.size}px`,
            height: `${el.size}px`,
            left: `${el.left}%`,
            top: `${el.top}%`,
            backgroundColor: el.bg,
            borderRadius: el.radius,
            rotate: el.rotate,
            clipPath: el.clip,
          }}
        />
      ))}
    </>
  )
}
