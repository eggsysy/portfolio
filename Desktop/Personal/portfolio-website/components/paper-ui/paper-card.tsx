"use client"

import React from "react"
import { motion, HTMLMotionProps, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { PaperTexture, TORN_VARIANTS } from "@/components/paper-ui/paper-defs"

interface PaperCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  containerClassName?: string
  innerClassName?: string
  shadowClassName?: string
  shadowColor?: "bright-aqua" | "deep-violet" | "gray"
  clipPath?: string
  shadowClipPath?: string
  hasHoverEffect?: boolean
  /** Roughen the paper edge with a hand-torn displacement filter. */
  torn?: boolean
  /** Overlay a subtle paper-fiber grain. */
  texture?: boolean
  /** Which torn-edge seed variant to use (0..2); adds variety between cards. */
  tornVariant?: number
  /** Lean the card toward the cursor in 3D (disabled on touch by nature). */
  tilt?: boolean
}

export const PaperCard = React.forwardRef<HTMLDivElement, PaperCardProps>(
  (
    {
      children,
      className,
      containerClassName,
      innerClassName,
      shadowClassName,
      shadowColor = "deep-violet",
      clipPath = "polygon(2% 0%, 98% 3%, 97% 97%, 3% 100%)",
      shadowClipPath,
      hasHoverEffect = true,
      torn = true,
      texture = true,
      tornVariant = 0,
      tilt = true,
      onMouseMove,
      onMouseLeave,
      style,
      ...props
    },
    ref
  ) => {
    const shadowBg = {
      "bright-aqua": "bg-bright-aqua/10",
      "deep-violet": "bg-deep-violet/10",
      gray: "bg-gray-400/20 dark:bg-gray-600/10",
    }[shadowColor]

    // Cursor-driven 3D tilt (spring-smoothed).
    const px = useMotionValue(0)
    const py = useMotionValue(0)
    const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 15 })
    const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 15 })

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (tilt) {
        const r = e.currentTarget.getBoundingClientRect()
        px.set((e.clientX - r.left) / r.width - 0.5)
        py.set((e.clientY - r.top) / r.height - 0.5)
      }
      onMouseMove?.(e)
    }
    const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      px.set(0)
      py.set(0)
      onMouseLeave?.(e)
    }

    const hoverProps = hasHoverEffect
      ? {
          whileHover: { scale: 1.05 },
          transition: { duration: 0.3 },
        }
      : {}

    const tornFilter = torn
      ? `url(#paper-torn-${((tornVariant % TORN_VARIANTS) + TORN_VARIANTS) % TORN_VARIANTS})`
      : undefined

    return (
      <motion.div
        ref={ref}
        className={cn("relative group [transform-style:preserve-3d]", containerClassName)}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          ...(tilt ? { rotateX, rotateY, transformPerspective: 900 } : {}),
          ...style,
        }}
        {...hoverProps}
        {...props}
      >
        {/* Paper surface (torn edge + grain live here so content stays crisp) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-white dark:bg-gray-900 shadow-xl overflow-hidden"
          style={{ clipPath, borderRadius: "20px", filter: tornFilter }}
        >
          {texture && <PaperTexture />}
        </div>

        {/* Content sits above the filtered paper so text never distorts */}
        <div className={cn("relative z-10 p-8 [transform:translateZ(20px)]", innerClassName)}>{children}</div>

        {/* Offset colored shadow layer */}
        <div
          className={cn(
            "absolute -bottom-2 -right-2 w-full h-full -z-10 transform rotate-1 transition-all duration-300",
            shadowBg,
            shadowClassName
          )}
          style={{
            clipPath: shadowClipPath || clipPath,
            borderRadius: "20px",
            filter: tornFilter,
          }}
        />
      </motion.div>
    )
  }
)

PaperCard.displayName = "PaperCard"
