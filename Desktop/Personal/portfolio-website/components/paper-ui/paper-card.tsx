"use client"

import React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface PaperCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  containerClassName?: string
  innerClassName?: string
  shadowClassName?: string
  shadowColor?: "bright-aqua" | "deep-violet" | "gray"
  clipPath?: string
  shadowClipPath?: string
  hasHoverEffect?: boolean
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

    return (
      <motion.div
        ref={ref}
        className={cn("relative group", containerClassName)}
        {...hoverProps}
        {...props}
      >
        <div
          className={cn(
            "bg-white dark:bg-gray-900 p-8 shadow-xl relative overflow-hidden transition-all duration-300",
            innerClassName
          )}
          style={{
            clipPath,
            borderRadius: "20px",
          }}
        >
          {children}
        </div>

        {/* Shadow Layer */}
        <div
          className={cn(
            "absolute -bottom-2 -right-2 w-full h-full -z-10 transform rotate-1 transition-all duration-300",
            shadowBg,
            shadowClassName
          )}
          style={{
            clipPath: shadowClipPath || clipPath,
            borderRadius: "20px",
          }}
        />
      </motion.div>
    )
  }
)

PaperCard.displayName = "PaperCard"
