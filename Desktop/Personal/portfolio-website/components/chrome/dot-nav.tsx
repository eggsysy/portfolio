"use client"

import { useEffect, useState } from "react"

export type Section = { id: string; label: string }

/**
 * The vertical section indicator down the right edge.
 *
 * The dots are real navigation — each one scrolls to its section and reports
 * where you are — rather than decoration, which is the only reason a device
 * this quiet earns a permanent place on screen.
 */
export function DotNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // The section covering the middle of the viewport wins.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const index = els.indexOf(visible.target as HTMLElement)
        if (index >= 0) setActive(index)
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 1] }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav
      aria-label="Sections"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex"
    >
      {sections.map((section, i) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          aria-label={section.label}
          aria-current={active === i ? "true" : undefined}
          className="group relative flex h-3 w-3 items-center justify-center"
        >
          <span
            className={`block rounded-full transition-all duration-500 ${
              active === i ? "h-2 w-2 bg-chalk" : "h-1 w-1 bg-chalk-faint group-hover:bg-chalk-dim"
            }`}
          />
          <span className="label pointer-events-none absolute right-6 whitespace-nowrap text-[0.6rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {section.label}
          </span>
        </a>
      ))}
    </nav>
  )
}
