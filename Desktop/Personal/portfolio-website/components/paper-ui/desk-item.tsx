"use client"

import React, { useState } from "react"
import { motion, useSpring, useTransform, type MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface DeskItemProps {
  /** Normalized pointer position (-0.5..0.5) from the hero. */
  mx: MotionValue<number>
  my: MotionValue<number>
  /** Ref of the desk area used to bound dragging. */
  constraintRef: React.RefObject<HTMLDivElement | null>
  /** Parallax travel in px — larger reads as "closer" to the viewer. */
  depth?: number
  /** Resting rotation in degrees. */
  rotate?: number
  /** Entrance delay. */
  delay?: number
  className?: string
  /** Returns the next top z-index so a grabbed item jumps to the front. */
  bringToFront: () => number
  draggable?: boolean
  children: React.ReactNode
}

/**
 * A scattered object on the "desk": it drifts with the cursor (parallax by
 * depth) and, when draggable, can be picked up and thrown with physics, staying
 * where it lands and rising above its neighbours.
 */
export const DeskItem = ({
  mx,
  my,
  constraintRef,
  depth = 24,
  rotate = 0,
  delay = 0,
  className,
  bringToFront,
  draggable = true,
  children,
}: DeskItemProps) => {
  const spring = { stiffness: 90, damping: 18, mass: 0.6 }
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [-depth, depth]), spring)
  const py = useSpring(useTransform(my, [-0.5, 0.5], [-depth, depth]), spring)
  const [z, setZ] = useState<number | undefined>(undefined)

  return (
    <motion.div className={cn("absolute", className)} style={{ x: px, y: py, zIndex: z }}>
      <motion.div
        drag={draggable}
        dragConstraints={constraintRef}
        dragElastic={0.18}
        dragMomentum
        onDragStart={() => setZ(bringToFront())}
        initial={{ opacity: 0, scale: 0.5, rotate: rotate - 12 }}
        animate={{ opacity: 1, scale: 1, rotate }}
        transition={{ type: "spring", stiffness: 180, damping: 16, delay }}
        whileHover={draggable ? { scale: 1.06 } : undefined}
        whileDrag={{ scale: 1.12 }}
        className={cn(
          "will-change-transform",
          draggable && "cursor-grab touch-none active:cursor-grabbing"
        )}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
