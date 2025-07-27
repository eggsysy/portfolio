"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Filter, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Smash and Dash",
    category: "Game Development",
    description:
      "A 3D arcade-style game inspired by Crossy Road, where players navigate tanks through dynamic obstacles. Developed using TypeScript, Node.js with custom models and gameplay mechanics. Features immersive 3D graphics and challenging obstacle navigation.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["TypeScript", "Node.js", "3D Graphics", "Game Development"],
    liveUrl: "https://github.com/eggsysy/PocketTonk",
    githubUrl: "https://github.com/eggsysy/PocketTonk",
    featured: true,
  },
  {
    id: 2,
    title: "Stock Market Trend Prediction",
    category: "AI/ML",
    description:
      "Developed a machine learning model to predict stock market trends using historical data and technical indicators. Applied KAN based LSTM algorithms for enhanced prediction accuracy. Authored a comprehensive research paper detailing the methodology and findings.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Python", "LSTM", "Machine Learning", "Data Analysis", "Research"],
    liveUrl: "https://github.com/eggsysy/Stat-a-thon",
    githubUrl: "https://github.com/eggsysy/Stat-a-thon",
    featured: true,
  },
]

const categories = ["All", "Game Development", "AI/ML"]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my work spanning game development, AI/ML solutions, and innovative applications. Each project
            represents my passion for learning and building practical, real-world solutions.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`px-6 py-2 rounded-2xl font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-blue-400"
              }`}
            >
              <Filter className="mr-2" size={16} />
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-8 mb-16">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 h-full hover:shadow-lg hover:shadow-blue-500/10 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {project.featured && (
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        Featured
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                        {project.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-slate-100 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-slate-300 mb-4 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-slate-600 text-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.liveUrl, "_blank")
                        }}
                      >
                        <ExternalLink className="mr-1" size={14} />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-slate-600 text-slate-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300 bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(project.githubUrl, "_blank")
                        }}
                      >
                        <Github className="mr-1" size={14} />
                        Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Skills Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Card className="bg-slate-800/50 border-slate-700 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Technical Expertise</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                My projects demonstrate proficiency across multiple domains, from 3D game development to advanced
                machine learning applications.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-2">Game Development</div>
                  <p className="text-slate-300">3D Graphics, TypeScript, Node.js</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">AI/ML Research</div>
                  <p className="text-slate-300">LSTM, Data Analysis, Research Papers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <Image
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    width={800}
                    height={400}
                    className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-4 right-4 bg-slate-900/80 border-slate-600 text-white hover:bg-slate-800"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X size={16} />
                  </Button>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-3xl font-bold text-slate-100">{selectedProject.title}</h2>
                    <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                      {selectedProject.category}
                    </Badge>
                  </div>
                  <p className="text-slate-300 mb-6 leading-relaxed">{selectedProject.description}</p>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-100 mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-slate-700 text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl"
                      onClick={() => window.open(selectedProject.liveUrl, "_blank")}
                    >
                      <ExternalLink className="mr-2" size={16} />
                      View Project
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 px-6 py-2 rounded-xl bg-transparent"
                      onClick={() => window.open(selectedProject.githubUrl, "_blank")}
                    >
                      <Github className="mr-2" size={16} />
                      View Source Code
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
