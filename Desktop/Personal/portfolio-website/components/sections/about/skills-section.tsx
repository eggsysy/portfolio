"use client"

import { motion } from "framer-motion"
import { Code, Rocket, Palette } from "lucide-react"
import { PaperCard } from "@/components/paper-ui/paper-card"
import { SectionHeader } from "@/components/paper-ui/section-header"

const skills = [
  { name: "JavaScript/TypeScript", icon: Code },
  { name: "React/Next.js", icon: Code },
  { name: "Python", icon: Code },
  { name: "Java", icon: Code },
  { name: "C/C++", icon: Code },
  { name: "Machine Learning", icon: Rocket },
  { name: "AI/ML Frameworks", icon: Rocket },
  { name: "Game Development", icon: Palette },
  { name: "Blockchain Technology", icon: Rocket },
  { name: "Data Structures & Algorithms", icon: Code },
]

export const SkillsSection = () => {
  return (
    <section className="mb-20">
      <SectionHeader title="Skills & Expertise" color="bright-aqua" />

      <div className="grid md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <PaperCard
            key={skill.name}
            initial={{ opacity: 0, x: -30, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            shadowColor="deep-violet"
            innerClassName="p-6"
          >
            <div className="flex items-center">
              {/* Icon with Paper Background */}
              <div className="w-12 h-12 bg-deep-violet/20 rounded-full flex items-center justify-center mr-4 transform -rotate-2 shadow-sm">
                <skill.icon className="text-deep-violet" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{skill.name}</h3>
            </div>
          </PaperCard>
        ))}
      </div>
    </section>
  )
}
