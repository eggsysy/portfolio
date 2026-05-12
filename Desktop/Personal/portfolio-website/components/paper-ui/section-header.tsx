"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
  titleClassName?: string
  backgroundClassName?: string
  color?: "bright-aqua" | "deep-violet"
  rotation?: number
}

export const SectionHeader = ({
  title,
  subtitle,
  className,
  titleClassName,
  backgroundClassName,
  color = "bright-aqua",
  rotation = 2,
}: SectionHeaderProps) => {
  const bgColor = color === "bright-aqua" ? "bg-bright-aqua/30" : "bg-deep-violet/30"

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={cn("text-center mb-16", className)}
    >
      <div className="relative inline-block">
        <h2 className={cn("text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 relative z-10", titleClassName)}>
          {title}
        </h2>
        <div
          className={cn(
            "absolute -inset-6 shadow-md -z-10 rounded-2xl",
            bgColor,
            backgroundClassName
          )}
          style={{
            transform: `rotate(${rotation}deg)`,
            clipPath: "polygon(5% 0%, 100% 5%, 95% 100%, 0% 95%)",
          }}
        />
      </div>
      {subtitle && (
        <div className="mt-8">
           {/* You can add more styling here if needed */}
           {subtitle}
        </div>
      )}
    </motion.div>
  )
}
