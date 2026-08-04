"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Resume", href: "/resume" },
  { name: "Certifications", href: "/certifications" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
]

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/eggsysy" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/aryan-badmera-377978288/" },
  { icon: Mail, label: "Email", href: "mailto:aryanbadmera@gmail.com" },
]

export const SiteFooter = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer className="relative z-10 mt-24">
      <div className="relative">
        {/* Stacked decorative paper strips */}
        <div
          className="bg-white dark:bg-gray-800 shadow-lg transform rotate-1 h-16 mx-4"
          style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 100%, 1% 99%)" }}
        />
        <div
          className="bg-soft-lavender dark:bg-gray-900 shadow-md transform -rotate-1 h-12 mx-8 -mt-8"
          style={{ clipPath: "polygon(1% 0%, 99% 2%, 98% 100%, 2% 98%)" }}
        />
        <div
          className="bg-bright-aqua/20 shadow-sm transform rotate-2 h-8 mx-12 -mt-6"
          style={{ clipPath: "polygon(3% 0%, 97% 3%, 96% 100%, 4% 97%)" }}
        />

        {/* Main footer panel */}
        <div
          className="bg-gray-800 text-white pt-12 pb-8 px-6 transform -rotate-1 shadow-2xl"
          style={{ clipPath: "polygon(1% 0%, 99% 1%, 98% 100%, 2% 99%)" }}
        >
          <div className="max-w-6xl mx-auto transform rotate-1">
            <div className="grid gap-10 md:grid-cols-3 md:gap-8">
              {/* Identity */}
              <div>
                <p className="font-display text-3xl text-bright-aqua">Aryan Badmera</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  Software &amp; Blockchain Developer. Building practical, real-world
                  solutions with a bit of paper-craft creativity.
                </p>
              </div>

              {/* Quick nav */}
              <div className="md:justify-self-center">
                <p className="mb-4 font-kalam text-lg text-gray-200">Explore</p>
                <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-400 transition-colors hover:text-bright-aqua"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Socials + back to top */}
              <div className="md:justify-self-end">
                <p className="mb-4 font-kalam text-lg text-gray-200">Connect</p>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={s.label}
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-700/60 text-gray-300 shadow-md transition-all hover:-translate-y-0.5 hover:bg-bright-aqua hover:text-black"
                      style={{ clipPath: "polygon(6% 0%, 94% 5%, 100% 95%, 0% 100%)" }}
                    >
                      <s.icon size={20} />
                    </a>
                  ))}
                </div>
                <button
                  onClick={scrollToTop}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-bright-aqua"
                >
                  <ArrowUp size={16} /> Back to top
                </button>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
              © {new Date().getFullYear()} Aryan Badmera. Crafted with passion and
              paper-inspired creativity.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
