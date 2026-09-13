"use client"

import { motion } from "framer-motion"
import { useSceneMode } from "@/components/three/use-scene-mode"

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, delay: 0.3 + i * 0.22, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export function Hero() {
  const ref = useSceneMode("hero", 1)

  return (
    <section
      id="home"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
    >
      <motion.h1
        custom={0}
        variants={rise}
        initial="hidden"
        animate="show"
        className="display-hero text-[clamp(2.1rem,7.5vw,6rem)] text-chalk"
      >
        Aryan Badmera
      </motion.h1>

      <motion.p
        custom={1}
        variants={rise}
        initial="hidden"
        animate="show"
        className="label mt-6 text-[0.7rem] sm:text-sm"
      >
        <span className="mr-4 text-chalk-faint">|</span>
        Developer
        <span className="ml-4 text-chalk-faint">|</span>
      </motion.p>

      <motion.div custom={2} variants={rise} initial="hidden" animate="show" className="mt-12">
        <a href="#contact" className="pill text-sm">
          Get in touch
        </a>
      </motion.div>

      {/*
        Corner marginalia. Decorative, so it is hidden from assistive tech and
        from narrow screens, where it would crowd the name rather than frame it.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1.4 }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden xl:block"
      >
        <ul className="label absolute left-12 top-1/2 -translate-y-[9rem] space-y-2 text-left text-[0.62rem] text-chalk-faint">
          {["Code", "Ideas", "Build", "Repeat"].map((w) => (
            <li key={w}>{w}</li>
          ))}
          <li className="!mt-5 h-px w-7 bg-chalk-faint/50" />
        </ul>

        <ul className="label absolute right-12 top-1/2 -translate-y-[9rem] space-y-2 text-right text-[0.62rem] text-chalk-faint">
          {["Turn", "Ideas", "Into", "Reality"].map((w) => (
            <li key={w}>{w}</li>
          ))}
          <li className="!mt-5 ml-auto h-px w-7 bg-chalk-faint/50" />
        </ul>

        <div className="label absolute bottom-12 left-12 flex items-center gap-4 text-[0.62rem] text-chalk-faint">
          <span className="h-8 w-px bg-chalk-faint/50" />
          Scroll
        </div>

        <div className="label absolute bottom-12 right-12 flex items-center gap-6 text-[0.62rem] text-chalk-faint">
          <span>Ideas</span>
          <span>Flow</span>
          <span>Progress</span>
          <span className="h-px w-7 bg-chalk-faint/50" />
        </div>
      </motion.div>

      {/* Scroll cue — the mouse outline from the reference. */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 1.2 }}
        aria-label="Scroll to about"
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-chalk-faint pt-2">
          <span className="block h-1.5 w-px animate-bounce bg-chalk-dim" />
        </span>
      </motion.a>
    </section>
  )
}
