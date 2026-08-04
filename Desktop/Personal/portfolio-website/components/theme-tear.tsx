"use client"

import { createContext, useCallback, useContext, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { AnimatePresence, motion } from "framer-motion"
import { PaperTexture } from "@/components/paper-ui/paper-defs"

type TearCtx = { toggle: () => void }
const Ctx = createContext<TearCtx>({ toggle: () => {} })
export const useThemeTear = () => useContext(Ctx)

/**
 * Wraps the app and turns the light/dark toggle into a "paper tear": a torn
 * sheet of paper sweeps down across the screen and the theme flips underneath
 * it (hidden), so you never see a hard colour snap — just a page tearing away.
 */
export const ThemeTearProvider = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme, setTheme } = useTheme()
  const [active, setActive] = useState(false)
  const busy = useRef(false)

  const toggle = useCallback(() => {
    if (busy.current) return
    const next = resolvedTheme === "dark" ? "light" : "dark"

    // Respect reduced motion — switch instantly, no sweep.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(next)
      return
    }

    busy.current = true
    setActive(true)
    // Flip the theme while the sheet is covering the screen (~mid-sweep).
    window.setTimeout(() => setTheme(next), 430)
  }, [resolvedTheme, setTheme])

  return (
    <Ctx.Provider value={{ toggle }}>
      {children}
      <AnimatePresence>
        {active && (
          <motion.div
            key="tear"
            aria-hidden="true"
            className="pointer-events-none fixed left-[-6%] right-[-6%] z-[200] overflow-hidden"
            style={{
              top: "-25vh",
              height: "150vh",
              background: "#f3efe6",
              filter: "url(#paper-torn-1)",
              boxShadow: "0 30px 70px rgba(0,0,0,0.35)",
            }}
            initial={{ y: "-165vh", rotate: -2 }}
            animate={{ y: "165vh", rotate: 2 }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            onAnimationComplete={() => {
              setActive(false)
              busy.current = false
            }}
          >
            <PaperTexture />
            {/* faint torn-edge shading top & bottom */}
            <div className="absolute inset-x-0 top-0 h-3 bg-black/10" />
            <div className="absolute inset-x-0 bottom-0 h-3 bg-black/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  )
}
