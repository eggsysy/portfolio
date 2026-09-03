"use client"

import Link from "next/link"

export const SiteFooter = () => {
  return (
    <footer className="relative border-t border-line px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="font-display text-[0.72rem] tracking-widest2 text-chalk-faint">
          © {new Date().getFullYear()} Aryan Badmera
        </p>
        <nav className="flex gap-8" aria-label="Footer">
          <Link href="/" className="label transition-colors hover:text-chalk">Home</Link>
          <Link href="/resume" className="label transition-colors hover:text-chalk">Resume</Link>
          <a href="mailto:aryanbadmera@gmail.com" className="label transition-colors hover:text-chalk">Email</a>
        </nav>
      </div>
    </footer>
  )
}
