"use client"

import { BackgroundShapes, FloatingShape } from "@/components/paper-ui/background-shapes"
import { AboutHeader } from "@/components/sections/about/about-header"
import { SkillsSection } from "@/components/sections/about/skills-section"
import { InterestsSection } from "@/components/sections/about/interests-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-soft-lavender dark:bg-[#0d0d18] pt-20 pb-16 relative overflow-hidden transition-colors duration-300">
      {/* Background Elements */}
      <BackgroundShapes>
        <FloatingShape
          initial={{ x: -50, rotate: -10 }}
          animate={{ x: 0, rotate: -5 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="top-32 -left-16 w-64 h-48 bg-white dark:bg-gray-800 rounded-3xl shadow-lg transform rotate-12 opacity-60 dark:opacity-10"
          style={{ clipPath: "polygon(5% 0%, 95% 3%, 97% 95%, 3% 100%)" }}
        />

        <FloatingShape
          initial={{ x: 50, rotate: 10 }}
          animate={{ x: 0, rotate: 8 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          className="top-96 -right-20 w-72 h-72 bg-bright-aqua/20 rounded-full shadow-md transform -rotate-6"
        />

        <FloatingShape
          initial={{ y: 50, rotate: -15 }}
          animate={{ y: 0, rotate: -8 }}
          transition={{ duration: 2.2, ease: "easeOut", delay: 0.6 }}
          className="bottom-40 left-8 w-48 h-64 bg-deep-violet/20 shadow-lg transform rotate-12"
          style={{ clipPath: "polygon(8% 0%, 92% 5%, 95% 92%, 5% 98%)", borderRadius: "25px" }}
        />
      </BackgroundShapes>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AboutHeader />
        <SkillsSection />
        <InterestsSection />
      </div>
    </div>
  )
}
