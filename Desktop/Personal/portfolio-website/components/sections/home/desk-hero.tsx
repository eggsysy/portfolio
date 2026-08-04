"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { DeskItem } from "@/components/paper-ui/desk-item"

/* ----------------------------- desk objects ----------------------------- */

const Polaroid = () => (
  <div className="relative w-36 md:w-40 rounded-[4px] bg-white p-2.5 pb-9 shadow-2xl">
    <div className="flex h-32 items-center justify-center bg-gradient-to-br from-bright-aqua/50 to-deep-violet/50 text-4xl md:h-36">
      👨‍💻
    </div>
    <p className="mt-2 text-center font-kalam text-gray-700">that&apos;s me →</p>
    <div className="absolute -top-3 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-2 bg-white/40 backdrop-blur-sm" />
  </div>
)

const StickyNote = ({
  color,
  children,
}: {
  color: "yellow" | "aqua" | "violet"
  children: React.ReactNode
}) => {
  const bg = {
    yellow: "bg-yellow-200 text-yellow-900",
    aqua: "bg-bright-aqua/85 text-black",
    violet: "bg-deep-violet/90 text-white",
  }[color]
  return (
    <div
      className={cn(
        "relative flex h-28 w-28 items-center justify-center p-3 text-center font-kalam text-lg leading-tight shadow-lg md:h-32 md:w-32",
        bg
      )}
    >
      {children}
      {/* folded corner */}
      <div
        className="absolute bottom-0 right-0 h-6 w-6 bg-black/10"
        style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
      />
    </div>
  )
}

const Pen = () => (
  <svg width="150" height="34" viewBox="0 0 150 34" fill="none">
    <rect x="24" y="10" width="104" height="14" rx="7" fill="#5a5dff" stroke="#2b2d5e" strokeWidth="1.5" />
    <rect x="110" y="10" width="18" height="14" fill="#4547cc" />
    <path d="M128 10 L146 17 L128 24 Z" fill="#c9ccd6" stroke="#2b2d5e" strokeWidth="1.2" />
    <circle cx="146" cy="17" r="1.6" fill="#2b2d5e" />
    <rect x="13" y="9" width="12" height="16" rx="3" fill="#00f2c3" stroke="#2b2d5e" strokeWidth="1.2" />
  </svg>
)

const Paperclip = () => (
  <svg width="34" height="82" viewBox="0 0 34 82" fill="none" stroke="#9aa2ad" strokeWidth="4" strokeLinecap="round">
    <path d="M11 60 L11 18 A6 6 0 0 1 23 18 L23 64 A9 9 0 0 1 5 64 L5 26" />
  </svg>
)

const CoffeeRing = () => (
  <div className="relative h-24 w-24">
    <div className="absolute inset-0 rounded-full border-[7px] border-[#7a4a24]/25" style={{ filter: "blur(0.6px)" }} />
    <div className="absolute inset-2 rounded-full border-2 border-[#7a4a24]/15" />
  </div>
)

/* ------------------------------- notebook ------------------------------- */

const NotebookPage = () => (
  <div className="relative mx-auto max-w-2xl px-8 py-12 md:px-16 md:py-16">
    {/* torn, ruled paper surface (behind content so text stays crisp) */}
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-white shadow-2xl dark:bg-[#15151f]"
      style={{
        clipPath: "polygon(1% 0%, 99% 1.5%, 100% 98%, 0.5% 100%)",
        filter: "url(#paper-torn-0)",
        backgroundImage:
          "repeating-linear-gradient(to bottom, transparent 0px, transparent 43px, rgba(90,120,200,0.15) 44px)",
        backgroundPosition: "0 24px",
      }}
    />
    {/* red margin rule */}
    <div className="pointer-events-none absolute left-10 top-0 h-full w-px bg-red-400/40 md:left-16" />

    <div className="relative z-10">
      <h1 className="text-6xl leading-[0.95] text-gray-800 dark:text-gray-100 md:text-8xl">
        Aryan <span className="text-bright-aqua">Badmera</span>
      </h1>
      <p className="mt-6 font-sans text-xl text-gray-600 dark:text-gray-300 md:text-2xl">
        Software Developer &amp; <span className="font-semibold text-deep-violet">Blockchain Developer</span>
      </p>
    </div>
  </div>
)

/* -------------------------------- hero ---------------------------------- */

export const DeskHero = () => {
  const areaRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const zRef = useRef(20)
  const bringToFront = () => (zRef.current += 1)

  const handleMove = (e: React.MouseEvent) => {
    mx.set(e.clientX / window.innerWidth - 0.5)
    my.set(e.clientY / window.innerHeight - 0.5)
  }
  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  // Subtle parallax for the centered notebook.
  const nameX = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 80, damping: 20 })
  const nameY = useSpring(useTransform(my, [-0.5, 0.5], [-8, 8]), { stiffness: 80, damping: 20 })

  const shared = { mx, my, constraintRef: areaRef, bringToFront }

  return (
    <section
      ref={areaRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-4 py-24"
    >
      {/* Scattered draggable objects */}
      <DeskItem {...shared} depth={42} rotate={-8} delay={0.5} className="left-[4%] top-[15%] md:left-[11%]">
        <Polaroid />
      </DeskItem>

      <DeskItem {...shared} depth={34} rotate={9} delay={0.6} className="right-[6%] top-[18%] md:right-[14%]">
        <StickyNote color="aqua">Web3 Enthusiast</StickyNote>
      </DeskItem>

      <DeskItem {...shared} depth={30} rotate={-6} delay={0.7} className="bottom-[20%] left-[8%] md:left-[15%]">
        <StickyNote color="yellow">Open Source ♥</StickyNote>
      </DeskItem>

      <DeskItem
        {...shared}
        depth={46}
        rotate={6}
        delay={0.8}
        className="bottom-[16%] right-[8%] hidden md:block md:right-[16%]"
      >
        <StickyNote color="violet">🚀 Fast Learner</StickyNote>
      </DeskItem>

      <DeskItem {...shared} depth={26} rotate={24} delay={0.9} className="left-[18%] top-[62%] hidden md:block">
        <Pen />
      </DeskItem>

      <DeskItem {...shared} depth={20} rotate={-18} delay={1} className="left-[40%] top-[12%] hidden lg:block">
        <Paperclip />
      </DeskItem>

      {/* Coffee stain — ambient, not draggable */}
      <DeskItem
        {...shared}
        draggable={false}
        depth={12}
        delay={0.4}
        className="bottom-[26%] right-[24%] hidden md:block"
      >
        <CoffeeRing />
      </DeskItem>

      {/* Centerpiece: the notebook with the name */}
      <motion.div style={{ x: nameX, y: nameY }} className="relative z-20 w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <NotebookPage />
          <p className="mt-6 text-center font-kalam text-gray-500 dark:text-gray-400">
            ✎ psst — drag the notes around
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
