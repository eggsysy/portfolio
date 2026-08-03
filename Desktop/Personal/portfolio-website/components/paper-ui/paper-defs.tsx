"use client"

/**
 * Global SVG filter definitions for the paper-craft aesthetic.
 * Mounted once in the root layout. Referenced from CSS via `filter: url(#id)`.
 *
 * The torn-edge filters use fractal noise + displacement to roughen the crisp
 * polygon `clip-path` edges of paper layers so they read as hand-torn paper
 * instead of CSS shapes. Three seed variants add subtle variety between cards.
 */

const TornFilter = ({
  id,
  seed,
  scale,
  frequency,
}: {
  id: string
  seed: number
  scale: number
  frequency: string
}) => (
  <filter id={id} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
    {/* Low-frequency octave = ragged overall tear; high-frequency = paper fibers */}
    <feTurbulence
      type="fractalNoise"
      baseFrequency={frequency}
      numOctaves={5}
      seed={seed}
      result="noise"
    />
    <feDisplacementMap
      in="SourceGraphic"
      in2="noise"
      scale={scale}
      xChannelSelector="R"
      yChannelSelector="G"
    />
  </filter>
)

export const PaperDefs = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    width="0"
    height="0"
    style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
  >
    <defs>
      <TornFilter id="paper-torn-0" seed={7} scale={16} frequency="0.008 0.05" />
      <TornFilter id="paper-torn-1" seed={19} scale={14} frequency="0.01 0.06" />
      <TornFilter id="paper-torn-2" seed={42} scale={18} frequency="0.009 0.045" />
    </defs>
  </svg>
)

/** Number of torn-edge filter variants available (`paper-torn-0..N-1`). */
export const TORN_VARIANTS = 3

/**
 * Inline fractal-noise grain used as a paper-fiber texture overlay.
 * Encoded as a data URI so it needs no network request and works inside the
 * strict CSP of the deployed site.
 */
export const PAPER_GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

/**
 * Subtle paper-fiber grain overlay. Drop inside any relatively-positioned
 * paper surface. Uses multiply in light mode (darkens fibers into the white)
 * and a faint soft-light lift in dark mode.
 */
export const PaperTexture = ({ className = "" }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={`pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply dark:opacity-[0.10] dark:mix-blend-soft-light ${className}`}
    style={{ backgroundImage: PAPER_GRAIN, backgroundSize: "140px 140px" }}
  />
)
