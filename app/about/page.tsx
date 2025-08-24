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
  { name: "Coffee", icon: Coffee, color: "bright-aqua" },
  { name: "Coding", icon: Code, color: "deep-violet" },
  { name: "Football", icon: Zap, color: "bright-aqua" },
  { name: "Music", icon: Music, color: "deep-violet" },
  { name: "Psychology", icon: Heart, color: "bright-aqua" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-soft-lavender pt-20 pb-16 relative overflow-hidden">
      {/* Floating Paper Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ x: -50, rotate: -10 }}
          animate={{ x: 0, rotate: -5 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-32 -left-16 w-64 h-48 bg-white rounded-3xl shadow-lg transform rotate-12 opacity-60"
          style={{ clipPath: "polygon(5% 0%, 95% 3%, 97% 95%, 3% 100%)" }}
        />

        <motion.div
          initial={{ x: 50, rotate: 10 }}
          animate={{ x: 0, rotate: 8 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          className="absolute top-96 -right-20 w-72 h-72 bg-bright-aqua/20 rounded-full shadow-md transform -rotate-6"
        />

        <motion.div
          initial={{ y: 50, rotate: -15 }}
          animate={{ y: 0, rotate: -8 }}
          transition={{ duration: 2.2, ease: "easeOut", delay: 0.6 }}
          className="absolute bottom-40 left-8 w-48 h-64 bg-deep-violet/20 shadow-lg transform rotate-12"
          style={{ clipPath: "polygon(8% 0%, 92% 5%, 95% 92%, 5% 98%)", borderRadius: "25px" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Paper Cut-out Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-8">
            <h1 className="text-5xl md:text-7xl font-black text-gray-800 relative z-10">
              <span className="relative inline-block">
                About Me
                <div
                  className="absolute -inset-6 bg-white shadow-xl transform -rotate-2 -z-10 rounded-2xl"
                  style={{ clipPath: "polygon(3% 0%, 97% 2%, 98% 97%, 2% 100%)" }}
                />
              </span>
            </h1>
          </div>

          {/* Paper Card Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative inline-block max-w-4xl"
          >
            <div
              className="bg-white px-8 py-6 shadow-lg transform rotate-1 rounded-xl relative"
              style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 98%, 1% 100%)" }}
            >
              <p className="text-xl text-gray-700 leading-relaxed">
                Enthusiastic and determined B.Tech Computer Science student with a strong interest in{" "}
                <span className="text-bright-aqua font-semibold">blockchain technology</span> and{" "}
                <span className="text-deep-violet font-semibold">decentralized systems</span>. Passionate about learning
                new technologies and building practical, real-world solutions.
              </p>
              <div className="absolute -bottom-2 -right-2 w-full h-full bg-bright-aqua/10 -z-10 rounded-xl transform -rotate-1" />
            </div>
          </motion.div>
        </motion.div>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          {/* Section Title */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <h2 className="text-4xl font-bold text-gray-800 relative z-10">Skills & Expertise</h2>
              <div
                className="absolute -inset-4 bg-bright-aqua/30 shadow-md transform rotate-1 -z-10 rounded-xl"
                style={{ clipPath: "polygon(5% 0%, 100% 3%, 95% 100%, 0% 97%)" }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -30, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotate: 1 }}
                className="relative group"
              >
                <Card
                  className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden transform hover:-rotate-1"
                  style={{ clipPath: "polygon(2% 0%, 98% 2%, 97% 98%, 3% 100%)", borderRadius: "15px" }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      {/* Icon with Paper Background */}
                      <div className="w-12 h-12 bg-deep-violet/20 rounded-full flex items-center justify-center mr-4 transform -rotate-2 shadow-sm">
                        <skill.icon className="text-deep-violet" size={24} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
                    </div>
                  </CardContent>
                  {/* Card Shadow */}
                  <div
                    className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/10 -z-10 transform rotate-1"
                    style={{ clipPath: "polygon(2% 0%, 98% 2%, 97% 98%, 3% 100%)", borderRadius: "15px" }}
                  />
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
          {/* Section Title */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <h2 className="text-4xl font-bold text-gray-800 relative z-10">Beyond Code</h2>
              <div
                className="absolute -inset-4 bg-deep-violet/30 shadow-md transform -rotate-1 -z-10 rounded-xl"
                style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.name}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="text-center relative group"
              >
                <Card
                  className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative overflow-hidden transform group-hover:-rotate-1"
                  style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)", borderRadius: "20px" }}
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
                  <p className="text-gray-800 font-medium">{interest.name}</p>

                  {/* Card Shadow */}
                  <div
                    className={`absolute -bottom-1 -right-1 w-full h-full bg-${interest.color === "bright-aqua" ? "bright-aqua" : "deep-violet"}/10 -z-10 transform rotate-2`}
                    style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)", borderRadius: "20px" }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
