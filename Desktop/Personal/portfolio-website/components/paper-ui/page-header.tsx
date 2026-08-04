"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: React.ReactNode
  /** Optional paragraph rendered in a torn paper card below the title. */
  description?: React.ReactNode
  /** Absolutely-positioned decorations (e.g. <Sticker/>) inside the header. */
  decorations?: React.ReactNode
  /** Extra content rendered below the title/description (e.g. a download button). */
  children?: React.ReactNode
  className?: string
}

/**
 * Shared page header: an animated title on torn paper with an optional
 * description card. Replaces the near-identical header markup that was
 * copy-pasted across About / Resume / Projects / Certifications / Contact.
 */
export const PageHeader = ({
  title,
  description,
  decorations,
  children,
  className,
}: PageHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={cn("relative mb-16 text-center", className)}
    >
      {decorations}

      {/* Title on torn paper */}
      <div className="relative mb-8 inline-block">
        <h1 className="relative z-10 text-5xl font-black text-gray-800 dark:text-gray-100 md:text-7xl">
          <span className="relative inline-block">
            {title}
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-2xl bg-white shadow-xl transform -rotate-2 dark:bg-gray-800"
              style={{
                clipPath: "polygon(3% 0%, 97% 2%, 98% 97%, 2% 100%)",
                filter: "url(#paper-torn-0)",
              }}
            />
          </span>
        </h1>
      </div>

      {/* Optional description card */}
      {description && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative inline-block max-w-4xl"
        >
          <div
            className="relative rounded-xl bg-white px-8 py-6 shadow-lg transform rotate-1 dark:bg-gray-800"
            style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 98%, 1% 100%)" }}
          >
            <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">{description}</p>
            <div className="absolute -bottom-2 -right-2 -z-10 h-full w-full rounded-xl bg-bright-aqua/10 transform -rotate-1" />
          </div>
        </motion.div>
      )}

      {children}
    </motion.div>
  )
}
