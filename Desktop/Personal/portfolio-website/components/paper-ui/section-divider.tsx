"use client"

import { cn } from "@/lib/utils"
import { PaperTexture } from "@/components/paper-ui/paper-defs"

const TONES = {
  white: "bg-white dark:bg-gray-800",
  aqua: "bg-bright-aqua/25 dark:bg-bright-aqua/10",
  violet: "bg-deep-violet/25 dark:bg-deep-violet/15",
  lavender: "bg-soft-lavender dark:bg-gray-900",
} as const

interface SectionDividerProps {
  /** Paper colour of the strip. */
  tone?: keyof typeof TONES
  /** Which torn-edge seed to use (0..2) for variety between dividers. */
  variant?: 0 | 1 | 2
  /** Organic tilt in degrees. */
  rotate?: number
  /** Strip thickness in px. */
  height?: number
  className?: string
}

/**
 * A torn strip of paper laid across the seam between two sections, so the page
 * reads as layered pages instead of flat blocks. Purely decorative.
 *
 * Sides bleed off-screen (mx negative) so only the ragged top/bottom edges show;
 * the parent must clip horizontal overflow (the page roots already do).
 */
export const SectionDivider = ({
  tone = "white",
  variant = 1,
  rotate = -1,
  height = 44,
  className,
}: SectionDividerProps) => {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none relative z-[1] -my-5 select-none", className)}
    >
      <div
        className={cn("relative mx-[-6%] overflow-hidden shadow-md", TONES[tone])}
        style={{
          height,
          filter: `url(#paper-torn-${variant})`,
          transform: `rotate(${rotate}deg)`,
        }}
      >
        <PaperTexture />
      </div>
    </div>
  )
}
