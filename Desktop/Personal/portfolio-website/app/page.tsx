"use client"

import { BackgroundShapes, FloatingShape } from "@/components/paper-ui/background-shapes"
import { SmallFloatingElements } from "@/components/paper-ui/small-floating-elements"
import { HeroSection } from "@/components/sections/home/hero-section"
import { MissionSection } from "@/components/sections/home/mission-section"
import { CTASection } from "@/components/sections/home/cta-section"
import { MathDoodle } from "@/components/sections/home/math-doodle"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-soft-lavender dark:bg-[#0d0d18] transition-colors duration-300">
      {/* Background Elements */}
      <BackgroundShapes>
        {/* Large Background Waves */}
        <FloatingShape
          parallax={220}
          initial={{ x: -100, rotate: -5 }}
          animate={{ x: 0, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="top-20 -left-20 w-96 h-64 bg-white dark:bg-gray-800 rounded-[40px] shadow-lg transform rotate-12 opacity-80 dark:opacity-10"
          style={{
            clipPath: "polygon(0% 20%, 100% 0%, 100% 80%, 0% 100%)",
          }}
        />

        <FloatingShape
          parallax={-160}
          initial={{ x: 100, rotate: 5 }}
          animate={{ x: 0, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          className="top-40 -right-32 w-80 h-80 bg-bright-aqua/20 rounded-full shadow-md transform -rotate-12"
        />

        <FloatingShape
          initial={{ y: 100, rotate: -10 }}
          animate={{ y: 0, rotate: -5 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
          className="bottom-32 left-10 w-64 h-48 bg-deep-violet/30 shadow-lg transform rotate-6"
          style={{
            clipPath: "polygon(10% 0%, 90% 5%, 95% 90%, 5% 95%)",
            borderRadius: "20px",
          }}
        />

        <SmallFloatingElements count={8} />
      </BackgroundShapes>

      {/* Sections */}
      <HeroSection />
      <MissionSection />
      <CTASection />
      
      {/* Decorative Doodles */}
      <MathDoodle />
    </div>
  )
}
