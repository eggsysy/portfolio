"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Hand-drawn SVG doodles that sketch themselves in when scrolled into view
 * (animated `pathLength`). Reinforces the "someone drew this by hand" feel.
 *
 * <SketchDoodle variant="arrow" color="deep-violet" className="w-24 h-24" />
 */

type Variant = "arrow" | "star" | "squiggle" | "circle" | "underline" | "spark"
type Color = "bright-aqua" | "deep-violet" | "gray"

const STROKE: Record<Color, string> = {
  "bright-aqua": "#00f2c3",
  "deep-violet": "#5a5dff",
  gray: "#9ca3af",
}

// Each variant is a list of stroke paths drawn in sequence.
const DOODLES: Record<Variant, string[]> = {
  arrow: ["M8,72 C28,30 60,22 84,44", "M84,44 L70,40", "M84,44 L80,58"],
  star: ["M50,10 L61,38 L92,40 L67,59 L76,90 L50,72 L24,90 L33,59 L8,40 L39,38 Z"],
  squiggle: ["M6,50 C20,20 34,80 50,50 C66,20 80,80 94,50"],
  circle: ["M78,30 C96,52 80,86 48,88 C18,90 6,60 20,36 C32,14 66,10 82,34"],
  underline: ["M6,30 C30,16 70,16 94,26", "M10,44 C34,34 68,36 90,44"],
  spark: ["M50,12 L50,40", "M50,60 L50,88", "M12,50 L40,50", "M60,50 L88,50", "M26,26 L40,40", "M60,60 L74,74"],
}

interface SketchDoodleProps {
  variant?: Variant
  color?: Color
  className?: string
  strokeWidth?: number
  duration?: number
  delay?: number
}

export const SketchDoodle = ({
  variant = "arrow",
  color = "deep-violet",
  className,
  strokeWidth = 3,
  duration = 1.1,
  delay = 0,
}: SketchDoodleProps) => {
  const paths = DOODLES[variant]
  const stroke = STROKE[color]

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none overflow-visible", className)}
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{
            pathLength: { duration, ease: "easeInOut", delay: delay + i * (duration * 0.55) },
            opacity: { duration: 0.2, delay: delay + i * (duration * 0.55) },
          }}
        />
      ))}
    </svg>
  )
}
