"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface StickerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  color?: "bright-aqua" | "deep-violet" | "white" | "yellow"
  className?: string
  rotation?: number
}

export const Sticker = ({
  children,
  color = "bright-aqua",
  className,
  rotation = 0,
  ...props
}: StickerProps) => {
  const bgColor = {
    "bright-aqua": "bg-bright-aqua/90",
    "deep-violet": "bg-deep-violet/90",
    white: "bg-white/90 dark:bg-gray-800/90",
    yellow: "bg-yellow-200/90 dark:bg-yellow-900/40",
  }[color]

  const textColor = {
    "bright-aqua": "text-black",
    "deep-violet": "text-white",
    white: "text-gray-800 dark:text-gray-100",
    yellow: "text-yellow-900 dark:text-yellow-100",
  }[color]

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: rotation + 5 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "absolute inline-flex items-center justify-center px-3 py-1 rounded-md shadow-md cursor-default select-none z-20 font-kalam text-sm md:text-base",
        bgColor,
        textColor,
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
      {...props}
    >
      {children}
      {/* Tape Effect */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-white/30 backdrop-blur-sm -rotate-2 pointer-events-none" />
    </motion.div>
  )
}
