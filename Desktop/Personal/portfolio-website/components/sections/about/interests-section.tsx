"use client"

import { motion } from "framer-motion"
import { Coffee, Code, Zap, Music, Heart } from "lucide-react"
import { PaperCard } from "@/components/paper-ui/paper-card"
import { SectionHeader } from "@/components/paper-ui/section-header"

const interests = [
  { name: "Coffee", icon: Coffee, color: "bright-aqua" as const },
  { name: "Coding", icon: Code, color: "deep-violet" as const },
  { name: "Football", icon: Zap, color: "bright-aqua" as const },
  { name: "Music", icon: Music, color: "deep-violet" as const },
  { name: "Psychology", icon: Heart, color: "bright-aqua" as const },
]

export const InterestsSection = () => {
  return (
    <section>
      <SectionHeader title="Beyond Code" color="deep-violet" rotation={-1} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {interests.map((interest, index) => (
          <PaperCard
            key={interest.name}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            shadowColor={interest.color}
            innerClassName="p-6 text-center"
            containerClassName="group"
          >
            {/* Icon with Colored Background */}
            <div
              className={`w-16 h-16 bg-${interest.color === "bright-aqua" ? "bright-aqua" : "deep-violet"}/20 rounded-full flex items-center justify-center mx-auto mb-4 transform -rotate-3 shadow-sm`}
            >
              <interest.icon
                className={`text-${interest.color === "bright-aqua" ? "bright-aqua" : "deep-violet"}`}
                size={32}
              />
            </div>
            <p className="text-gray-800 dark:text-gray-200 font-medium">{interest.name}</p>
          </PaperCard>
        ))}
      </div>
    </section>
  )
}
