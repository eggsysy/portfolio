"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Filter, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"


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
      {/* Floating Paper Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ x: -40, rotate: -12 }}
          animate={{ x: 0, rotate: -6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-32 -left-20 w-72 h-48 bg-white dark:bg-gray-800 rounded-3xl shadow-lg transform rotate-15 opacity-40 dark:opacity-10"
          style={{ clipPath: "polygon(8% 0%, 92% 5%, 95% 92%, 5% 98%)" }}
        />

        <motion.div
          initial={{ y: -40, rotate: 15 }}
          animate={{ y: 0, rotate: 8 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          className="absolute top-96 -right-24 w-64 h-64 bg-bright-aqua/20 dark:bg-bright-aqua/10 rounded-full shadow-md transform -rotate-12"
        />

        <motion.div
          initial={{ x: 40, rotate: -18 }}
          animate={{ x: 0, rotate: -10 }}
          transition={{ duration: 2.2, ease: "easeOut", delay: 0.6 }}
          className="absolute bottom-32 left-12 w-56 h-72 bg-deep-violet/20 dark:bg-deep-violet/10 shadow-lg transform rotate-18"
          style={{ clipPath: "polygon(5% 0%, 95% 8%, 92% 95%, 8% 100%)", borderRadius: "30px" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-8">
            <h1 className="text-5xl md:text-7xl font-black text-gray-800 dark:text-gray-100 relative z-10">
              <span className="relative inline-block">
                My Projects
                <div
                  className="absolute -inset-6 bg-white dark:bg-gray-800 shadow-xl transform -rotate-2 -z-10 rounded-2xl"
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
              className="bg-white dark:bg-gray-800 px-8 py-6 shadow-lg transform rotate-1 rounded-xl relative"
              style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 98%, 1% 100%)" }}
            >
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                A showcase of my work spanning <span className="text-bright-aqua font-semibold">blockchain technologies</span>,{" "}
                <span className="text-deep-violet font-semibold">AI/ML solutions</span>, and innovative applications.
                Each project represents my passion for learning and building practical, real-world solutions.
              </p>
              <div className="absolute -bottom-2 -right-2 w-full h-full bg-bright-aqua/10 -z-10 rounded-xl transform -rotate-1" />
            </div>
          </motion.div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05, rotate: selectedCategory === category ? 0 : 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform shadow-lg relative ${selectedCategory === category
                  ? "bg-bright-aqua text-black hover:bg-bright-aqua/90 -rotate-1"
                  : "border-deep-violet text-deep-violet hover:bg-deep-violet hover:text-black bg-white dark:bg-gray-800 dark:border-gray-500 dark:text-gray-200 dark:hover:bg-gray-700 rotate-1"
                  }`}
                style={{
                  clipPath:
                    selectedCategory === category
                      ? "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)"
                      : "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)",
                }}
              >
                <Filter className="mr-2" size={16} />
                {category}
                {/* Button Shadow */}
                <div
                  className={`absolute -bottom-1 -right-1 w-full h-full -z-10 rounded-xl transform ${selectedCategory === category ? "bg-bright-aqua/40 rotate-1" : "bg-deep-violet/20 dark:bg-gray-600/30 -rotate-1"
                    }`}
                  style={{
                    clipPath:
                      selectedCategory === category
                        ? "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)"
                        : "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)",
                  }}
                />
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-8 mb-16">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -30, rotate: 2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, rotate: 1, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <Card
                  className="bg-white dark:bg-gray-900 border-0 dark:border dark:border-gray-700/50 shadow-lg hover:shadow-2xl dark:hover:shadow-black/40 transition-all duration-300 h-full overflow-hidden relative transform group-hover:-rotate-1"
                  style={{ clipPath: "polygon(2% 0%, 98% 2%, 97% 98%, 3% 100%)", borderRadius: "20px" }}
                >

                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="secondary"
                        className="bg-soft-lavender dark:bg-gray-700 text-gray-700 dark:text-gray-200 transform rotate-1 shadow-sm"
                        style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
                      >
                        {project.category}
                      </Badge>
                      {project.featured && (
                        <Badge
                          className="bg-bright-aqua text-black transform -rotate-1 shadow-sm"
                          style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                        >
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-gray-100 group-hover:text-bright-aqua transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-gray-700 dark:text-gray-400 mb-4 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs bg-soft-lavender dark:bg-gray-700 text-gray-700 dark:text-gray-300 transform hover:rotate-1 shadow-sm transition-transform"
                          style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-soft-lavender dark:bg-gray-700 text-gray-700 dark:text-gray-300 transform rotate-1"
                          style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
                        >
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <motion.div whileHover={{ scale: 1.05, rotate: -1 }} className="flex-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-deep-violet dark:border-bright-aqua text-deep-violet dark:text-bright-aqua hover:bg-bright-aqua hover:text-black hover:border-bright-aqua transition-all duration-300 bg-transparent transform shadow-sm"
                          style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.liveUrl, "_blank")
                          }}
                        >
                          <ExternalLink className="mr-1" size={14} />
                          View
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05, rotate: 1 }} className="flex-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-deep-violet dark:border-gray-500 text-deep-violet dark:text-gray-300 hover:bg-deep-violet hover:text-black dark:hover:bg-gray-700 dark:hover:text-white hover:border-deep-violet transition-all duration-300 bg-transparent transform shadow-sm"
                          style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.githubUrl, "_blank")
                          }}
                        >
                          <Github className="mr-1" size={14} />
                          Code
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>

                  {/* Card Shadow */}
                  <div
                    className="absolute -bottom-2 -right-2 w-full h-full bg-bright-aqua/10 dark:bg-bright-aqua/5 -z-10 transform rotate-1"
                    style={{ clipPath: "polygon(2% 0%, 98% 2%, 97% 98%, 3% 100%)", borderRadius: "20px" }}
                  />
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Technical Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Card
            className="bg-white dark:bg-gray-900 border-0 dark:border dark:border-gray-700/50 shadow-xl max-w-4xl mx-auto relative overflow-hidden transform hover:-rotate-1 transition-all duration-300"
            style={{ clipPath: "polygon(3% 0%, 97% 2%, 98% 97%, 2% 100%)", borderRadius: "25px" }}
          >
            <CardContent className="p-8">
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
            </CardContent>

            {/* Card Shadow */}
            <div
              className="absolute -bottom-3 -right-3 w-full h-full bg-deep-violet/10 dark:bg-deep-violet/5 -z-10 transform rotate-1"
              style={{ clipPath: "polygon(3% 0%, 97% 2%, 98% 97%, 2% 100%)", borderRadius: "25px" }}
            />
          </Card>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20, rotate: 2 }}
                className="bg-white dark:bg-gray-900 border-0 dark:border dark:border-gray-700 shadow-2xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 98%, 1% 100%)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8 pt-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{selectedProject.title}</h2>
                      <Badge
                        variant="secondary"
                        className="bg-soft-lavender dark:bg-gray-700 text-gray-700 dark:text-gray-200 transform rotate-1 shadow-sm"
                        style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
                      >
                        {selectedProject.category}
                      </Badge>
                    </div>
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white dark:bg-gray-800 border-deep-violet dark:border-gray-600 text-deep-violet dark:text-gray-300 hover:bg-deep-violet hover:text-black dark:hover:bg-gray-700 shadow-lg transform -rotate-2 shrink-0"
                        style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                        onClick={() => setSelectedProject(null)}
                      >
                        <X size={16} />
                      </Button>
                    </motion.div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-400 mb-6 leading-relaxed mt-4">{selectedProject.description}</p>

                  <div className="mb-6">
                    <div className="relative inline-block mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 relative z-10">Technologies Used</h3>
                      <div
                        className="absolute -inset-2 bg-bright-aqua/20 dark:bg-bright-aqua/10 shadow-sm transform rotate-1 -z-10 rounded-lg"
                        style={{ clipPath: "polygon(5% 0%, 100% 5%, 95% 100%, 0% 95%)" }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-soft-lavender dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-bright-aqua hover:text-black transition-colors transform hover:rotate-1 shadow-sm"
                          style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 flex-wrap">
                    <motion.div whileHover={{ scale: 1.05, rotate: -1 }}>
                      <Button
                        className="bg-bright-aqua hover:bg-bright-aqua/90 text-black px-6 py-3 rounded-xl font-semibold shadow-lg transform relative"
                        style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
                        onClick={() => window.open(selectedProject.liveUrl, "_blank")}
                      >
                        <ExternalLink className="mr-2" size={16} />
                        View Project
                        <div
                          className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/40 -z-10 transform rotate-1 rounded-xl"
                          style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
                        />
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05, rotate: 1 }}>
                      <Button
                        variant="outline"
                        className="border-deep-violet dark:border-gray-500 text-deep-violet dark:text-gray-300 hover:bg-deep-violet hover:text-black dark:hover:bg-gray-700 dark:hover:text-white px-6 py-3 rounded-xl font-semibold bg-transparent shadow-lg transform relative"
                        style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
                        onClick={() => window.open(selectedProject.githubUrl, "_blank")}
                      >
                        <Github className="mr-2" size={16} />
                        View Source Code
                        <div
                          className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/20 dark:bg-gray-600/20 -z-10 transform -rotate-1 rounded-xl"
                          style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
                        />
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Modal Shadow */}
                <div
                  className="absolute -bottom-3 -right-3 w-full h-full bg-deep-violet/20 dark:bg-bright-aqua/5 -z-10 transform rotate-1 rounded-3xl"
                  style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 98%, 1% 100%)" }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
