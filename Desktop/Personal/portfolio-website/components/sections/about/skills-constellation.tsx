"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "@/components/paper-ui/section-header"

type Cat = "lang" | "ai" | "web3"

const CAT = {
  lang: { color: "#5a5dff", label: "Languages & Web" },
  ai: { color: "#00f2c3", label: "AI / ML" },
  web3: { color: "#f59e0b", label: "Web3 & More" },
} as const

const SKILLS: { short: string; name: string; cat: Cat }[] = [
  { short: "TypeScript", name: "JavaScript / TypeScript", cat: "lang" },
  { short: "React", name: "React / Next.js", cat: "lang" },
  { short: "Python", name: "Python", cat: "lang" },
  { short: "Java", name: "Java", cat: "lang" },
  { short: "C / C++", name: "C / C++", cat: "lang" },
  { short: "DSA", name: "Data Structures & Algorithms", cat: "lang" },
  { short: "ML", name: "Machine Learning", cat: "ai" },
  { short: "AI Frameworks", name: "AI / ML Frameworks", cat: "ai" },
  { short: "Blockchain", name: "Blockchain Technology", cat: "web3" },
  { short: "Game Dev", name: "Game Development", cat: "web3" },
]

// Deterministic jitter so server and client agree (no hydration drift).
const seeded = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

const CENTER = { x: 50, y: 50 }

export const SkillsConstellation = () => {
  const [hovered, setHovered] = useState<number | null>(null)

  // Radial layout around the hub, with a little organic jitter.
  const nodes = useMemo(
    () =>
      SKILLS.map((s, i) => {
        const angle = (i / SKILLS.length) * Math.PI * 2 - Math.PI / 2
        const rx = 34 + seeded(i * 3.1) * 5
        const ry = 30 + seeded(i * 7.7) * 6
        const x = CENTER.x + rx * Math.cos(angle)
        const y = CENTER.y + ry * Math.sin(angle)
        // Hand-drawn wobble: bow the line via a perpendicular control point.
        const mx = (CENTER.x + x) / 2
        const my = (CENTER.y + y) / 2
        const off = (seeded(i * 5.5) - 0.5) * 10
        const dx = x - CENTER.x
        const dy = y - CENTER.y
        const len = Math.hypot(dx, dy) || 1
        const ctrl = { x: mx + (-dy / len) * off, y: my + (dx / len) * off }
        return { ...s, x, y, ctrl, i }
      }),
    []
  )

  const active = hovered !== null ? SKILLS[hovered] : null

  return (
    <section className="mb-20">
      <SectionHeader title="Skills & Expertise" color="bright-aqua" />

      {/* Legend */}
      <div className="mb-6 flex flex-wrap justify-center gap-4">
        {(Object.keys(CAT) as Cat[]).map((c) => (
          <span key={c} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: CAT[c].color }} />
            {CAT[c].label}
          </span>
        ))}
      </div>

      <div className="relative mx-auto h-[520px] w-full max-w-4xl md:h-[600px]">
        {/* Connection lines */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          {nodes.map((n) => {
            const isActive = hovered === n.i
            const dim = hovered !== null && !isActive
            return (
              <motion.path
                key={n.i}
                d={`M${CENTER.x},${CENTER.y} Q${n.ctrl.x},${n.ctrl.y} ${n.x},${n.y}`}
                fill="none"
                stroke={CAT[n.cat].color}
                strokeWidth={isActive ? 2 : 1.2}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: dim ? 0.15 : isActive ? 0.9 : 0.4 }}
                viewport={{ once: true }}
                animate={{ opacity: dim ? 0.15 : isActive ? 0.9 : 0.4 }}
                transition={{ pathLength: { duration: 1, delay: 0.1 + n.i * 0.05 }, opacity: { duration: 0.25 } }}
              />
            )
          })}
        </svg>

        {/* Center hub */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 14 }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-bright-aqua to-deep-violet text-center font-kalam text-lg font-bold text-white shadow-xl"
            style={{ clipPath: "polygon(8% 4%, 92% 0%, 100% 88%, 4% 100%)" }}
          >
            My Stack
          </motion.div>
        </div>

        {/* Skill nodes */}
        {nodes.map((n) => {
          const isActive = hovered === n.i
          const dim = hovered !== null && !isActive
          return (
            <div
              key={n.i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%`, zIndex: isActive ? 20 : 15 }}
            >
              <motion.button
                type="button"
                onMouseEnter={() => setHovered(n.i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(n.i)}
                onBlur={() => setHovered(null)}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.4 + n.i * 0.06 }}
                animate={{ opacity: dim ? 0.45 : 1, scale: isActive ? 1.12 : 1 }}
                className="whitespace-nowrap rounded-xl bg-white px-3 py-2 text-xs font-semibold shadow-md transition-colors dark:bg-gray-800 md:text-sm"
                style={{
                  border: `2px solid ${CAT[n.cat].color}`,
                  color: CAT[n.cat].color,
                  clipPath: "polygon(4% 0%, 96% 5%, 100% 96%, 0% 100%)",
                }}
              >
                {n.short}
              </motion.button>
            </div>
          )
        })}
      </div>

      {/* Hover caption */}
      <div className="mt-4 text-center">
        <p className="font-kalam text-lg text-gray-600 dark:text-gray-300">
          {active ? (
            <>
              <span className="font-semibold" style={{ color: CAT[active.cat].color }}>
                {active.name}
              </span>{" "}
              · {CAT[active.cat].label}
            </>
          ) : (
            "hover a node to explore →"
          )}
        </p>
      </div>
    </section>
  )
}
