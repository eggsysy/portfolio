"use client"

import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Work } from "@/components/sections/work"
import { Contact } from "@/components/sections/contact"
import { DotNav } from "@/components/chrome/dot-nav"

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Projects" },
  { id: "contact", label: "Contact" },
]

export default function HomePage() {
  return (
    <>
      <DotNav sections={sections} />
      <Hero />
      <About />
      <Work />
      <Contact />
    </>
  )
}
