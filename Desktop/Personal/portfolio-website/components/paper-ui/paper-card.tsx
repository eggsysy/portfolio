"use client"

import React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
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
      ...props
    },
    ref
  ) => {
    const shadowBg = {
      "bright-aqua": "bg-bright-aqua/10",
      "deep-violet": "bg-deep-violet/10",
      gray: "bg-gray-400/20 dark:bg-gray-600/10",
    }[shadowColor]

    const hoverProps = hasHoverEffect
      ? {
          whileHover: { scale: 1.05, rotate: -1 },
          transition: { duration: 0.3 },
        }
      : {}

    const tornFilter = torn
      ? `url(#paper-torn-${((tornVariant % TORN_VARIANTS) + TORN_VARIANTS) % TORN_VARIANTS})`
      : undefined

    return (
      <motion.div
        ref={ref}
        className={cn("relative group", containerClassName)}
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
        <div className={cn("relative z-10 p-8", innerClassName)}>{children}</div>

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
