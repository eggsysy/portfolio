"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Resume", href: "/resume" },
  { name: "Certifications", href: "/certifications" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-lg shadow-deep-violet/10 dark:shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-bright-aqua hover:text-deep-violet transition-colors">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-bright-aqua hover:bg-soft-lavender/50 dark:hover:bg-gray-800/60 ${
                  pathname === item.href
                    ? "text-bright-aqua bg-soft-lavender/30 dark:bg-gray-800/40"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Dark mode toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative p-2 rounded-xl border border-deep-violet/30 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-soft-lavender/50 dark:hover:bg-gray-800/60 hover:text-bright-aqua transition-all duration-300 overflow-hidden group"
                aria-label="Toggle dark mode"
              >
                <span className={`block transition-all duration-300 ${theme === "dark" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0 absolute"}`}>
                  <Sun size={18} />
                </span>
                <span className={`block transition-all duration-300 ${theme !== "dark" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0 absolute"}`}>
                  <Moon size={18} />
                </span>
              </button>
            )}
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-bright-aqua hover:bg-soft-lavender/50 dark:hover:bg-gray-800/60 transition-colors"
                aria-label="Toggle dark mode"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-bright-aqua hover:bg-soft-lavender/50 dark:hover:bg-gray-800/60 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-md rounded-lg mt-2 p-4 border border-soft-lavender dark:border-gray-700 shadow-lg">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-bright-aqua hover:bg-soft-lavender/50 dark:hover:bg-gray-800/60 ${
                  pathname === item.href
                    ? "text-bright-aqua bg-soft-lavender/30 dark:bg-gray-800/40"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
