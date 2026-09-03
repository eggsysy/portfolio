"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

/**
 * Serif caps over a short rule. The rule is set narrower than the word so it
 * reads as an underscore drawn beneath it rather than a divider across the
 * column — that difference is most of why the reference feels engraved.
 */
export function SectionTitle({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode
  className?: string
  align?: "left" | "center"
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={cn("inline-block", align === "center" && "text-center", className)}
    >
      <h2 className="section-title text-[1.7rem] sm:text-[2.1rem]">{children}</h2>
      <div className="title-rule mt-2.5 w-[85%]" style={align === "center" ? { margin: "10px auto 0" } : undefined} />
    </motion.div>
  )
}
