"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BackgroundShapes, FloatingShape } from "@/components/paper-ui/background-shapes"
import { ProjectsHeader } from "@/components/sections/projects/projects-header"
import { ProjectFilters } from "@/components/sections/projects/project-filters"
import { ProjectCard } from "@/components/sections/projects/project-card"
import { ProjectModal } from "@/components/sections/projects/project-modal"

const projects = [
  {
    id: 1,
    title: "Stock Market Trend Prediction",
    category: "AI/ML",
    description:
      "Developed a machine learning model to predict stock market trends using historical data and technical indicators. Applied KAN based LSTM algorithms. Authored a research paper detailing the methodology and findings.",
    technologies: ["Python", "LSTM", "Machine Learning", "Research"],
    liveUrl: "https://github.com/eggsysy/Stat-a-thon",
    githubUrl: "https://github.com/eggsysy/Stat-a-thon",
    featured: true,
  },
  {
    id: 2,
    title: "Proof-of-Skill",
    category: "Web3/Blockchain",
    description:
      "Developed a Web3 platform on Ethereum Sepolia enabling fans to back creators for a share of future revenue. Engineered Solidity smart contracts with Superfluid IDA for real-time, single-transaction revenue distribution. Built a responsive Next.js and TailwindCSS dashboard to track backing goals and user portfolios.",
    technologies: ["Solidity", "Next.js", "TailwindCSS", "Superfluid IDA"],
    liveUrl: "https://github.com/eggsysy/proof-of-skill",
    githubUrl: "https://github.com/eggsysy/proof-of-skill",
    featured: true,
  },
]

const categories = ["All", "AI/ML", "Web3/Blockchain"]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  return (
    <div className="min-h-screen bg-soft-lavender dark:bg-[#0d0d18] pt-20 pb-16 relative overflow-hidden transition-colors duration-300">
      {/* Background Elements */}
      <BackgroundShapes>
        <FloatingShape
          initial={{ x: -40, rotate: -12 }}
          animate={{ x: 0, rotate: -6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="top-32 -left-20 w-72 h-48 bg-white dark:bg-gray-800 rounded-3xl shadow-lg transform rotate-15 opacity-40 dark:opacity-10"
          style={{ clipPath: "polygon(8% 0%, 92% 5%, 95% 92%, 5% 98%)" }}
        />

        <FloatingShape
          initial={{ y: -40, rotate: 15 }}
          animate={{ y: 0, rotate: 8 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          className="top-96 -right-24 w-64 h-64 bg-bright-aqua/20 dark:bg-bright-aqua/10 rounded-full shadow-md transform -rotate-12"
        />

        <FloatingShape
          initial={{ x: 40, rotate: -18 }}
          animate={{ x: 0, rotate: -10 }}
          transition={{ duration: 2.2, ease: "easeOut", delay: 0.6 }}
          className="bottom-32 left-12 w-56 h-72 bg-deep-violet/20 dark:bg-deep-violet/10 shadow-lg transform rotate-18"
          style={{ clipPath: "polygon(5% 0%, 95% 8%, 92% 95%, 8% 100%)", borderRadius: "30px" }}
        />
      </BackgroundShapes>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ProjectsHeader />
        
        <ProjectFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <motion.div layout className="grid md:grid-cols-2 gap-8 mb-16">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Technical Expertise Section (Internal to page as it's specific) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div
            className="bg-white dark:bg-gray-900 shadow-xl max-w-4xl mx-auto relative overflow-hidden transform hover:-rotate-1 transition-all duration-300 p-8"
            style={{ clipPath: "polygon(3% 0%, 97% 2%, 98% 97%, 2% 100%)", borderRadius: "25px" }}
          >
              <div className="relative inline-block mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 relative z-10">Technical Expertise</h2>
                <div
                  className="absolute -inset-3 bg-bright-aqua/20 dark:bg-bright-aqua/10 shadow-md transform rotate-1 -z-10 rounded-lg"
                  style={{ clipPath: "polygon(5% 0%, 100% 3%, 95% 100%, 0% 97%)" }}
                />
              </div>

              <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-6">
                My projects demonstrate proficiency across multiple domains, from machine learning research to
                decentralized Web3 applications.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div whileHover={{ scale: 1.05, rotate: 1 }} className="text-center relative">
                  <div
                    className="bg-bright-aqua/10 dark:bg-bright-aqua/5 p-6 rounded-xl shadow-md transform -rotate-1 relative"
                    style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                  >
                    <div className="text-2xl font-bold text-bright-aqua mb-2">AI/ML Research</div>
                    <p className="text-gray-700 dark:text-gray-400">LSTM, Python, Machine Learning</p>
                    <div
                      className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/20 dark:bg-bright-aqua/10 -z-10 transform rotate-1 rounded-xl"
                      style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                    />
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05, rotate: -1 }} className="text-center relative">
                  <div
                    className="bg-deep-violet/10 dark:bg-deep-violet/10 p-6 rounded-xl shadow-md transform rotate-1 relative"
                    style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
                  >
                    <div className="text-2xl font-bold text-deep-violet mb-2">Web3/Blockchain</div>
                    <p className="text-gray-700 dark:text-gray-400">Solidity, Next.js, Superfluid IDA</p>
                    <div
                      className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/20 dark:bg-deep-violet/10 -z-10 transform -rotate-1 rounded-xl"
                      style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
                    />
                  </div>
                </motion.div>
              </div>

            {/* Card Shadow */}
            <div
              className="absolute -bottom-3 -right-3 w-full h-full bg-deep-violet/10 dark:bg-deep-violet/5 -z-10 transform rotate-1"
              style={{ clipPath: "polygon(3% 0%, 97% 2%, 98% 97%, 2% 100%)", borderRadius: "25px" }}
            />
          </div>
        </motion.div>

        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </div>
    </div>
  )
}
