"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

/**
 * About, Work and Contact are sections of the landing page rather than routes
 * of their own — the site is a single scroll, as the reference is. Resume is
 * the exception: a résumé is its own document and deserves its own URL.
 */
const navItems = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/#work" },
  { name: "About", href: "/#about" },
  { name: "Resume", href: "/resume" },
  { name: "Contact", href: "/#contact" },
]

const socials = [
  { name: "GitHub", href: "https://github.com/eggsysy" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/aryan-badmera-377978288/" },
  { name: "Email", href: "mailto:aryanbadmera@gmail.com" },
]

/**
 * A hairline mark top-left and a hamburger top-right, both of which stay put.
 * Everything else lives behind the overlay — the reference keeps the frame
 * almost empty so the 3D has the whole screen.
 */
export default function Navigation() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between p-6 sm:p-8">
        <Link
          href="/"
          className="pointer-events-auto flex items-end gap-[3px] pt-1"
          aria-label="Aryan Badmera — home"
        >
          {[9, 15, 7, 18, 11].map((h, i) => (
            <span
              key={i}
              className="block w-[2px] bg-chalk-dim transition-colors duration-500 hover:bg-chalk"
              style={{ height: h }}
            />
          ))}
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="pointer-events-auto flex h-9 w-10 flex-col items-end justify-center gap-[7px]"
        >
          <span
            className={`block h-px bg-chalk transition-all duration-500 ${
              open ? "w-8 translate-y-[8px] rotate-45" : "w-8"
            }`}
          />
          <span
            className={`block h-px bg-chalk transition-all duration-500 ${open ? "w-0 opacity-0" : "w-8"}`}
          />
          <span
            className={`block h-px bg-chalk transition-all duration-500 ${
              open ? "w-8 -translate-y-[8px] -rotate-45" : "w-6"
            }`}
          />
        </button>
      </header>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-[49] transition-[opacity,visibility] duration-700 ${
          open ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        {/* The blurred backdrop is mounted only while the menu is open.
            Chrome will happily keep painting a descendant's backdrop-filter
            even when an ancestor sits at zero opacity — which blurred the
            entire page behind a menu nobody had opened. `invisible` above
            suppresses it in current Chrome, but not rendering the element at
            all is the only version that cannot regress. */}
        {open && (
          <div className="absolute inset-0 bg-ink/94 backdrop-blur-md" onClick={() => setOpen(false)} />
        )}

        <div className="relative flex h-full flex-col items-center justify-center gap-1 px-6">
          {navItems.map((item, i) => (
            <Link
              key={item.name}
              href={item.href}
              className={`display block py-2 text-3xl transition-all duration-500 sm:text-5xl ${
                pathname === item.href ? "text-chalk" : "text-chalk-faint hover:text-chalk"
              }`}
              style={{
                transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
                transform: open ? "translateY(0)" : "translateY(14px)",
                opacity: open ? 1 : 0,
              }}
            >
              {item.name}
            </Link>
          ))}

          <div
            className="mt-14 flex gap-8 transition-all duration-500"
            style={{ transitionDelay: open ? "440ms" : "0ms", opacity: open ? 1 : 0 }}
          >
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="label transition-colors duration-300 hover:text-chalk"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
