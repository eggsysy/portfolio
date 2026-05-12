"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface FloatingShapeProps {
  className?: string
  style?: React.CSSProperties
  initial?: any
  animate?: any
  transition?: any
}

export const FloatingShape = ({
  className,
  style,
  initial,
  animate,
  transition,
}: FloatingShapeProps) => (
  <motion.div
    initial={initial}
    animate={animate}
    transition={transition}
    className={cn("absolute pointer-events-none", className)}
    style={style}
  />
)

export const BackgroundShapes = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {children}
    </div>
  )
}
