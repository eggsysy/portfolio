"use client"

import { motion } from "framer-motion"
import { Code, Palette, Rocket, Heart, Coffee, Music, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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

const interests = [
  { name: "Coffee", icon: Coffee, color: "text-amber-400" },
  { name: "Coding", icon: Code, color: "text-blue-400" },
  { name: "Football", icon: Zap, color: "text-green-400" },
  { name: "Music", icon: Music, color: "text-purple-400" },
  { name: "Psychology", icon: Heart, color: "text-pink-400" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Enthusiastic and determined B.Tech Computer Science student with a strong interest in blockchain technology
            and decentralized systems. Passionate about learning new technologies and building practical, real-world
            solutions.
          </p>
        </motion.div>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-100">Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <skill.icon className="text-blue-400 mr-3" size={24} />
                      <h3 className="text-lg font-semibold text-slate-100">{skill.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Interests Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-100">Beyond Code</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 p-6">
                  <interest.icon className={`${interest.color} mx-auto mb-3`} size={32} />
                  <p className="text-slate-300 font-medium">{interest.name}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
