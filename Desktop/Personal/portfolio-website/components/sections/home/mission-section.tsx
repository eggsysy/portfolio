"use client"

import { motion } from "framer-motion"
import { Code, Heart, Lightbulb } from "lucide-react"
import { PaperCard } from "@/components/paper-ui/paper-card"
import { SectionHeader } from "@/components/paper-ui/section-header"

const missionItems = [
  {
    icon: Code,
    title: "Innovative Development",
    description:
      "Building cutting-edge applications with modern technologies and creative problem-solving approaches.",
    color: "bright-aqua" as const,
  },
  {
    icon: Heart,
    title: "Passionate Learning",
    description:
      "Continuously exploring blockchain, AI/ML, and emerging technologies to stay at the forefront of innovation.",
    color: "deep-violet" as const,
  },
  {
    icon: Lightbulb,
    title: "Real-World Impact",
    description:
      "Creating solutions that make a meaningful difference in people's lives and contribute to technological advancement.",
    color: "bright-aqua" as const,
  },
]

export const MissionSection = () => {
  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="My Mission" />

        <div className="grid md:grid-cols-3 gap-8">
          {missionItems.map((item, index) => (
            <PaperCard
              key={index}
              initial={{ opacity: 0, y: 50, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              shadowColor={item.color}
              innerClassName="p-8"
            >
              <div
                className={`w-16 h-16 bg-${item.color}/20 rounded-full flex items-center justify-center mb-6 transform -rotate-3 shadow-md`}
              >
                <item.icon
                  className={`text-${item.color === "bright-aqua" ? "bright-aqua" : "deep-violet"}`}
                  size={32}
                />
              </div>

              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
            </PaperCard>
          ))}
        </div>
      </div>
    </section>
  )
}
