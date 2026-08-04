"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { useTheme } from "next-themes"
import { AnimatePresence, motion } from "framer-motion"

/* ─── Context ─── */
type TearCtx = { toggle: (e?: React.MouseEvent) => void; tearing: boolean }
const Ctx = createContext<TearCtx>({ toggle: () => {}, tearing: false })
export const useThemeTear = () => useContext(Ctx)

/* ─── Constants ─── */
const BURN_DURATION = 1400 // ms — total burn animation
const THEME_FLIP_AT = 550 // ms — flip theme mid-burn
const EMBER_COUNT = 40
const SPARK_COUNT = 24

/* ─── Component ─── */

/**
 * Paper-Burn theme provider. When toggled:
 * 1. A burning circle expands from the click origin (or screen center)
 * 2. Irregular ember edges eat through the current "page" with an orange glow
 * 3. Tiny ember/spark particles float upward along the burn front
 * 4. Theme flips mid-burn so the new theme is revealed underneath
 * 5. Burn completes, overlay fades, sparks drift away
 */
export const ThemeTearProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { resolvedTheme, setTheme } = useTheme()
  const [burn, setBurn] = useState<{
    active: boolean
    originX: number
    originY: number
    seed: number
  } | null>(null)
  const busy = useRef(false)

  const toggle = useCallback(
    (e?: React.MouseEvent) => {
      if (busy.current) return
      const next = resolvedTheme === "dark" ? "light" : "dark"

      // Respect reduced-motion
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setTheme(next)
        return
      }

      // Get origin from click position or fallback to top-right (where toggle lives)
      let ox = window.innerWidth - 60
      let oy = 32
      if (e) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        ox = rect.left + rect.width / 2
        oy = rect.top + rect.height / 2
      }

      busy.current = true
      setBurn({ active: true, originX: ox, originY: oy, seed: Date.now() })

      // Flip theme mid-burn
      window.setTimeout(() => setTheme(next), THEME_FLIP_AT)

      // Clean up after animation completes
      window.setTimeout(() => {
        setBurn(null)
        busy.current = false
      }, BURN_DURATION + 400)
    },
    [resolvedTheme, setTheme]
  )

  return (
    <Ctx.Provider value={{ toggle, tearing: burn?.active ?? false }}>
      {children}
      <AnimatePresence>
        {burn?.active && (
          <BurnOverlay
            key={burn.seed}
            originX={burn.originX}
            originY={burn.originY}
            seed={burn.seed}
            isDark={resolvedTheme === "dark"}
          />
        )}
      </AnimatePresence>
    </Ctx.Provider>
  )
}

/* ─── Burn Overlay ─── */

function BurnOverlay({
  originX,
  originY,
  seed,
  isDark,
}: {
  originX: number
  originY: number
  seed: number
  isDark: boolean
}) {
  const [dims, setDims] = useState({ w: 1920, h: 1080 })

  useEffect(() => {
    setDims({ w: window.innerWidth, h: window.innerHeight })
  }, [])

  // Max radius needed to cover entire viewport from origin
  const maxRadius = useMemo(() => {
    const dx = Math.max(originX, dims.w - originX)
    const dy = Math.max(originY, dims.h - originY)
    return Math.sqrt(dx * dx + dy * dy) + 80
  }, [originX, originY, dims])

  // The "sheet" color matches the CURRENT theme (what's being burned away)
  const sheetColor = isDark ? "#0d0d18" : "#eaeaf5"

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[200]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* SVG burn mask */}
      <svg
        width={dims.w}
        height={dims.h}
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <defs>
          {/* Fractal noise for irregular burn edge */}
          <filter id={`burn-noise-${seed}`} x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015"
              numOctaves={5}
              seed={seed % 1000}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={55}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Glow filter for the ember ring */}
          <filter id={`ember-glow-${seed}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Gradient for the glowing ember ring stroke */}
          <radialGradient id="ember-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff4500" stopOpacity="0" />
            <stop offset="70%" stopColor="#ff6a00" stopOpacity="0.9" />
            <stop offset="85%" stopColor="#ff8c00" stopOpacity="1" />
            <stop offset="95%" stopColor="#ffb347" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ff4500" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* The unburned sheet — a full rect with a growing circular hole */}
        <BurnMask
          cx={originX}
          cy={originY}
          maxRadius={maxRadius}
          sheetColor={sheetColor}
          filterId={`burn-noise-${seed}`}
          seed={seed}
          dims={dims}
        />

        {/* Ember ring — glowing orange edge around the burn hole */}
        <EmberRing
          cx={originX}
          cy={originY}
          maxRadius={maxRadius}
          filterId={`ember-glow-${seed}`}
          seed={seed}
        />
      </svg>

      {/* Floating ember/spark particles */}
      <EmberParticles
        originX={originX}
        originY={originY}
        maxRadius={maxRadius}
        seed={seed}
        dims={dims}
      />
    </motion.div>
  )
}

/* ─── Burn Mask: the sheet with a growing burnt hole ─── */

function BurnMask({
  cx,
  cy,
  maxRadius,
  sheetColor,
  filterId,
  seed,
  dims,
}: {
  cx: number
  cy: number
  maxRadius: number
  sheetColor: string
  filterId: string
  seed: number
  dims: { w: number; h: number }
}) {
  const maskId = `burn-mask-${seed}`

  return (
    <>
      <defs>
        <mask id={maskId}>
          {/* White = visible (the sheet), black = burnt away (transparent) */}
          <rect width={dims.w} height={dims.h} fill="white" />
          <motion.circle
            cx={cx}
            cy={cy}
            fill="black"
            initial={{ r: 0 }}
            animate={{ r: maxRadius }}
            transition={{
              duration: BURN_DURATION / 1000,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            filter={`url(#${filterId})`}
          />
        </mask>
      </defs>

      {/* The unburned sheet */}
      <g mask={`url(#${maskId})`}>
        <rect width={dims.w} height={dims.h} fill={sheetColor} />
        {/* Paper grain texture */}
        <rect
          width={dims.w}
          height={dims.h}
          fill="url(#paper-grain-burn)"
          opacity="0.05"
        />
      </g>

      {/* Paper grain pattern */}
      <defs>
        <pattern
          id="paper-grain-burn"
          width="140"
          height="140"
          patternUnits="userSpaceOnUse"
        >
          <image
            href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"
            width="140"
            height="140"
          />
        </pattern>
      </defs>
    </>
  )
}

/* ─── Ember Ring: glowing orange border around the burn edge ─── */

function EmberRing({
  cx,
  cy,
  maxRadius,
  filterId,
  seed,
}: {
  cx: number
  cy: number
  maxRadius: number
  filterId: string
  seed: number
}) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      fill="none"
      strokeWidth={18}
      filter={`url(#${filterId})`}
      initial={{ r: 0, opacity: 1 }}
      animate={{
        r: maxRadius,
        opacity: [1, 1, 0.8, 0],
      }}
      transition={{
        r: {
          duration: BURN_DURATION / 1000,
          ease: [0.25, 0.1, 0.25, 1],
        },
        opacity: {
          duration: BURN_DURATION / 1000,
          times: [0, 0.5, 0.8, 1],
        },
      }}
      style={{
        stroke: "url(#ember-gradient)",
      }}
    >
      {/* Inline gradient def */}
    </motion.circle>
  )
}

/* ─── Ember Particles ─── */

function EmberParticles({
  originX,
  originY,
  maxRadius,
  seed,
  dims,
}: {
  originX: number
  originY: number
  maxRadius: number
  seed: number
  dims: { w: number; h: number }
}) {
  const rng = useMemo(() => mulberry32(seed + 777), [seed])

  const particles = useMemo(() => {
    const result = []
    for (let i = 0; i < EMBER_COUNT; i++) {
      const angle = rng() * Math.PI * 2
      const spawnRadius = maxRadius * (0.15 + rng() * 0.7)
      const x = originX + Math.cos(angle) * spawnRadius
      const y = originY + Math.sin(angle) * spawnRadius
      const size = 2 + rng() * 5
      const isEmber = rng() > 0.4
      result.push({
        x,
        y,
        size,
        isEmber,
        delay: 0.15 + rng() * 0.8,
        driftX: (rng() - 0.5) * 80,
        driftY: -(30 + rng() * 100), // float upward
        duration: 0.6 + rng() * 0.8,
        rotation: rng() * 360,
      })
    }
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, maxRadius, originX, originY])

  const sparks = useMemo(() => {
    const result = []
    for (let i = 0; i < SPARK_COUNT; i++) {
      const angle = rng() * Math.PI * 2
      const spawnRadius = maxRadius * (0.1 + rng() * 0.5)
      result.push({
        x: originX + Math.cos(angle) * spawnRadius,
        y: originY + Math.sin(angle) * spawnRadius,
        delay: 0.1 + rng() * 0.6,
        driftX: (rng() - 0.5) * 120,
        driftY: -(40 + rng() * 140),
        duration: 0.4 + rng() * 0.5,
        size: 1 + rng() * 2.5,
      })
    }
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, maxRadius, originX, originY])

  return (
    <>
      {/* Ember particles — orange/red glowing dots */}
      {particles.map((p, i) => (
        <motion.div
          key={`ember-${i}`}
          className="absolute rounded-full"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            background: p.isEmber
              ? `radial-gradient(circle, #ff8c00 0%, #ff4500 50%, rgba(180,40,0,0.8) 100%)`
              : `radial-gradient(circle, #ffb347 0%, #ff6f00 100%)`,
            boxShadow: p.isEmber
              ? `0 0 ${p.size * 2}px ${p.size}px rgba(255,140,0,0.5), 0 0 ${p.size * 4}px rgba(255,69,0,0.3)`
              : `0 0 ${p.size}px rgba(255,140,0,0.4)`,
          }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 0.8, 0],
            x: p.driftX,
            y: p.driftY,
            rotate: p.rotation,
          }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            ease: "easeOut",
            opacity: { times: [0, 0.1, 0.7, 1] },
            scale: { times: [0, 0.15, 0.7, 1] },
          }}
        />
      ))}

      {/* Sparks — tiny bright white/yellow streaks */}
      {sparks.map((s, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size * 3,
            borderRadius: "50%",
            background: "linear-gradient(to bottom, #fff9c4, #ffcc02, #ff8f00)",
            boxShadow: `0 0 4px 1px rgba(255,204,2,0.6)`,
          }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: s.driftX,
            y: s.driftY,
          }}
          transition={{
            delay: s.delay,
            duration: s.duration,
            ease: "easeOut",
            opacity: { times: [0, 0.2, 1] },
          }}
        />
      ))}
    </>
  )
}

/* ─── PRNG ─── */
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
