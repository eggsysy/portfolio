"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingShapeProps {
  className?: string
  style?: React.CSSProperties
  initial?: any
  animate?: any
  transition?: any
  /**
   * Scroll-linked parallax depth. Positive drifts down, negative drifts up, as
   * the page scrolls. Only use on shapes whose `animate` does not set `y`.
   */
  parallax?: number
}

export const FloatingShape = ({
  className,
  style,
  initial,
  animate,
  transition,
  parallax,
}: FloatingShapeProps) => {
  const { scrollY } = useScroll()
  // Map the first ~1200px of scroll to the parallax offset.
  const y = useTransform(scrollY, [0, 1200], [0, parallax ?? 0])

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={cn("absolute pointer-events-none", className)}
      style={parallax != null ? { ...style, y } : style}
    />
  )
}

export const BackgroundShapes = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {children}
    </div>
  )
}
