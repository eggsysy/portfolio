"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { AnimatePresence, motion } from "framer-motion"
import {
  Home,
  User,
  FileText,
  Award,
  FolderGit2,
  Mail,
  Moon,
  Sun,
  Copy,
  Command as CommandIcon,
  Search,
  CornerDownLeft,
} from "lucide-react"
import { PaperTexture } from "@/components/paper-ui/paper-defs"
import { useThemeTear } from "@/components/theme-tear"

type CommandItem = {
  id: string
  label: string
  hint: string
  group: "Navigate" | "Actions"
  keywords: string
  icon: React.ComponentType<{ size?: number | string; className?: string }>
  run: () => void
}

const EMAIL = "aryanbadmera@gmail.com"

export const CommandPalette = () => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { toggle: tearToggle } = useThemeTear()

  useEffect(() => setMounted(true), [])

  const close = useCallback(() => {
    setOpen(false)
    setQuery("")
    setActive(0)
  }, [])

  const go = useCallback(
    (href: string) => {
      router.push(href)
      close()
    },
    [router, close]
  )

  const items = useMemo<CommandItem[]>(() => {
    const nav: CommandItem[] = [
      { id: "home", label: "Home", hint: "/", group: "Navigate", keywords: "start landing", icon: Home, run: () => go("/") },
      { id: "about", label: "About", hint: "/about", group: "Navigate", keywords: "bio me story", icon: User, run: () => go("/about") },
      { id: "resume", label: "Resume", hint: "/resume", group: "Navigate", keywords: "cv experience", icon: FileText, run: () => go("/resume") },
      { id: "certs", label: "Certifications", hint: "/certifications", group: "Navigate", keywords: "awards courses", icon: Award, run: () => go("/certifications") },
      { id: "projects", label: "Projects", hint: "/projects", group: "Navigate", keywords: "work builds portfolio", icon: FolderGit2, run: () => go("/projects") },
      { id: "contact", label: "Contact", hint: "/contact", group: "Navigate", keywords: "reach message hire", icon: Mail, run: () => go("/contact") },
    ]
    const actions: CommandItem[] = [
      {
        id: "theme",
        label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        hint: "theme",
        group: "Actions",
        keywords: "dark light theme toggle appearance",
        icon: theme === "dark" ? Sun : Moon,
        run: () => {
          close()
          // Small delay so the palette closes before the tear starts
          requestAnimationFrame(() => tearToggle())
        },
      },
      {
        id: "copy-email",
        label: copied ? "Email copied!" : "Copy email address",
        hint: EMAIL,
        group: "Actions",
        keywords: "email mail contact copy",
        icon: Copy,
        run: () => {
          navigator.clipboard?.writeText(EMAIL).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
          })
        },
      },
    ]
    return [...nav, ...actions]
  }, [go, theme, setTheme, copied, tearToggle, close])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (i) => i.label.toLowerCase().includes(q) || i.keywords.includes(q) || i.hint.toLowerCase().includes(q)
    )
  }, [items, query])

  // Keep the highlighted row in range as the list filters.
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, filtered.length - 1)))
  }, [filtered.length])

  // Global open shortcut (Cmd/Ctrl+K).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Focus the input when the palette opens.
  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus())
  }, [open])

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => (a + 1) % Math.max(1, filtered.length))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => (a - 1 + filtered.length) % Math.max(1, filtered.length))
    } else if (e.key === "Enter") {
      e.preventDefault()
      filtered[active]?.run()
    } else if (e.key === "Escape") {
      e.preventDefault()
      close()
    }
  }

  // Scroll the active row into view.
  useEffect(() => {
    if (!open) return
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`)
    el?.scrollIntoView({ block: "nearest" })
  }, [active, open])

  if (!mounted) return null

  let lastGroup = ""

  return (
    <>
      {/* Floating trigger — discoverable, and the only way in on touch devices */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-deep-violet/30 bg-white/90 px-4 py-2 text-sm font-medium text-gray-700 shadow-lg shadow-deep-violet/10 backdrop-blur-md transition-all hover:scale-105 hover:text-bright-aqua dark:border-gray-600 dark:bg-gray-900/90 dark:text-gray-200"
      >
        <Search size={16} />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden items-center gap-0.5 rounded bg-soft-lavender px-1.5 py-0.5 font-kalam text-xs text-gray-600 sm:flex dark:bg-gray-800 dark:text-gray-300">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[15vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onKeyDown={onListKeyDown}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            {/* Recipe / index card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, y: -16, scale: 0.97, rotate: -1 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: -0.4 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="relative w-full max-w-xl overflow-hidden bg-white shadow-2xl dark:bg-gray-900"
              style={{
                clipPath: "polygon(1% 0%, 99% 1.5%, 100% 98%, 0.5% 100%)",
                borderRadius: "18px",
                filter: "url(#paper-torn-0)",
              }}
            >
              <PaperTexture />

              {/* Red index-card rule + tape */}
              <div className="pointer-events-none absolute left-12 top-0 z-10 h-full w-px bg-red-300/40 dark:bg-red-400/20" />
              <div className="pointer-events-none absolute -top-2 left-1/2 z-20 h-5 w-16 -translate-x-1/2 -rotate-2 bg-bright-aqua/25 backdrop-blur-sm" />

              {/* Search row */}
              <div className="relative z-10 flex items-center gap-3 border-b border-soft-lavender px-5 py-4 dark:border-gray-700">
                <Search size={18} className="text-deep-violet" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setActive(0)
                  }}
                  placeholder="Jump to a page or run a command…"
                  className="w-full bg-transparent font-kalam text-lg text-gray-800 placeholder:text-gray-400 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-500"
                  aria-label="Search commands"
                />
                <kbd className="hidden items-center gap-1 rounded bg-soft-lavender px-2 py-1 font-kalam text-xs text-gray-500 sm:flex dark:bg-gray-800 dark:text-gray-400">
                  esc
                </kbd>
              </div>

              {/* Results */}
              <div ref={listRef} className="relative z-10 max-h-72 overflow-y-auto py-2">
                {filtered.length === 0 && (
                  <p className="px-6 py-8 text-center font-kalam text-gray-500 dark:text-gray-400">
                    Nothing matches “{query}” ✏️
                  </p>
                )}
                {filtered.map((item, idx) => {
                  const showGroup = item.group !== lastGroup
                  lastGroup = item.group
                  const Icon = item.icon
                  const isActive = idx === active
                  return (
                    <div key={item.id}>
                      {showGroup && (
                        <p className="px-5 pb-1 pt-3 font-kalam text-xs uppercase tracking-wider text-deep-violet/70">
                          {item.group}
                        </p>
                      )}
                      <button
                        data-idx={idx}
                        onClick={item.run}
                        onMouseMove={() => setActive(idx)}
                        className={`flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                          isActive
                            ? "bg-bright-aqua/15 text-gray-900 dark:bg-bright-aqua/10 dark:text-white"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                            isActive ? "bg-bright-aqua/25 text-deep-violet" : "bg-soft-lavender text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                          }`}
                        >
                          <Icon size={16} />
                        </span>
                        <span className="flex-1 font-medium">{item.label}</span>
                        <span className="font-kalam text-xs text-gray-400">{item.hint}</span>
                        {isActive && <CornerDownLeft size={14} className="text-deep-violet" />}
                      </button>
                    </div>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="relative z-10 flex items-center justify-between border-t border-soft-lavender px-5 py-2.5 font-kalam text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <CommandIcon size={12} /> command palette
                </span>
                <span className="flex items-center gap-2">
                  <span>↑↓ move</span>
                  <span>↵ select</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
