"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SmallFloatingElementsProps {
  count?: number
}

export const SmallFloatingElements = ({ count = 8 }: SmallFloatingElementsProps) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
          }}
          animate={{
            opacity: 0.6,
            scale: 1,
            x: 0,
            y: 0,
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
          className={cn("absolute shadow-md transform pointer-events-none")}
          style={{
            width: `${8 + Math.floor(Math.random() * 16)}px`,
            height: `${8 + Math.floor(Math.random() * 16)}px`,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            backgroundColor: i % 3 === 0 ? "#00f2c3" : i % 3 === 1 ? "#5a5dff" : "#ffffff",
            opacity: 0.3 + Math.random() * 0.4,
            borderRadius: Math.random() > 0.5 ? "50%" : "15px",
            transform: `rotate(${Math.random() * 30 - 15}deg)`,
            clipPath: Math.random() > 0.7 ? "polygon(0% 15%, 85% 0%, 100% 85%, 15% 100%)" : "none",
          }}
        />
      ))}
    </>
  )
}
