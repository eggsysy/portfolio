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
    <div className="min-h-screen bg-soft-lavender pt-20 pb-16 relative overflow-hidden">
      {/* Floating Paper Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ x: -40, rotate: -12 }}
          animate={{ x: 0, rotate: -6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-32 -left-20 w-72 h-48 bg-white rounded-3xl shadow-lg transform rotate-15 opacity-40"
          style={{ clipPath: "polygon(8% 0%, 92% 5%, 95% 92%, 5% 98%)" }}
        />

        <motion.div
          initial={{ y: -40, rotate: 15 }}
          animate={{ y: 0, rotate: 8 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          className="absolute top-96 -right-24 w-64 h-64 bg-bright-aqua/20 rounded-full shadow-md transform -rotate-12"
        />

        <motion.div
          initial={{ x: 40, rotate: -18 }}
          animate={{ x: 0, rotate: -10 }}
          transition={{ duration: 2.2, ease: "easeOut", delay: 0.6 }}
          className="absolute bottom-32 left-12 w-56 h-72 bg-deep-violet/20 shadow-lg transform rotate-18"
          style={{ clipPath: "polygon(5% 0%, 95% 8%, 92% 95%, 8% 100%)", borderRadius: "30px" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                My Projects
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
                A showcase of my work spanning <span className="text-bright-aqua font-semibold">game development</span>,{" "}
                <span className="text-deep-violet font-semibold">AI/ML solutions</span>, and innovative applications.
                Each project represents my passion for learning and building practical, real-world solutions.
              </p>
              <div className="absolute -bottom-2 -right-2 w-full h-full bg-bright-aqua/10 -z-10 rounded-xl transform -rotate-1" />
            </div>
          </motion.div>
        </motion.div>

        {/* Filter Buttons - Sticky Note Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05, rotate: selectedCategory === category ? 0 : 2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform shadow-lg relative ${
                  selectedCategory === category
                    ? "bg-bright-aqua text-black hover:bg-bright-aqua/90 -rotate-1"
                    : "border-deep-violet text-deep-violet hover:bg-deep-violet hover:text-white bg-white rotate-1"
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
                  className={`absolute -bottom-1 -right-1 w-full h-full -z-10 rounded-xl transform ${
                    selectedCategory === category ? "bg-bright-aqua/40 rotate-1" : "bg-deep-violet/20 -rotate-1"
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
                  className="bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full overflow-hidden relative transform group-hover:-rotate-1"
                  style={{ clipPath: "polygon(2% 0%, 98% 2%, 97% 98%, 3% 100%)", borderRadius: "20px" }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {project.featured && (
                      <Badge
                        className="absolute top-4 left-4 bg-bright-aqua text-black transform -rotate-2 shadow-lg"
                        style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                      >
                        Featured
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-violet/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant="secondary"
                        className="bg-soft-lavender text-gray-700 transform rotate-1 shadow-sm"
                        style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
                      >
                        {project.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-gray-900 group-hover:text-bright-aqua transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs bg-soft-lavender text-gray-700 transform hover:rotate-1 shadow-sm transition-transform"
                          style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-soft-lavender text-gray-700 transform rotate-1"
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
                          className="w-full border-deep-violet text-deep-violet hover:bg-bright-aqua hover:text-white hover:border-bright-aqua transition-all duration-300 bg-transparent transform shadow-sm"
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
                          className="w-full border-deep-violet text-deep-violet hover:bg-deep-violet hover:text-white hover:border-deep-violet transition-all duration-300 bg-transparent transform shadow-sm"
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
                    className="absolute -bottom-2 -right-2 w-full h-full bg-bright-aqua/10 -z-10 transform rotate-1"
                    style={{ clipPath: "polygon(2% 0%, 98% 2%, 97% 98%, 3% 100%)", borderRadius: "20px" }}
                  />
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Skills Showcase - Paper Card Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Card
            className="bg-white border-0 shadow-xl max-w-4xl mx-auto relative overflow-hidden transform hover:-rotate-1 transition-all duration-300"
            style={{ clipPath: "polygon(3% 0%, 97% 2%, 98% 97%, 2% 100%)", borderRadius: "25px" }}
          >
            <CardContent className="p-8">
              <div className="relative inline-block mb-6">
                <h2 className="text-3xl font-bold text-gray-900 relative z-10">Technical Expertise</h2>
                <div
                  className="absolute -inset-3 bg-bright-aqua/20 shadow-md transform rotate-1 -z-10 rounded-lg"
                  style={{ clipPath: "polygon(5% 0%, 100% 3%, 95% 100%, 0% 97%)" }}
                />
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                My projects demonstrate proficiency across multiple domains, from 3D game development to advanced
                machine learning applications.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div whileHover={{ scale: 1.05, rotate: 1 }} className="text-center relative">
                  <div
                    className="bg-bright-aqua/10 p-6 rounded-xl shadow-md transform -rotate-1 relative"
                    style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                  >
                    <div className="text-2xl font-bold text-bright-aqua mb-2">Game Development</div>
                    <p className="text-gray-700">3D Graphics, TypeScript, Node.js</p>
                    <div
                      className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/20 -z-10 transform rotate-1 rounded-xl"
                      style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                    />
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05, rotate: -1 }} className="text-center relative">
                  <div
                    className="bg-deep-violet/10 p-6 rounded-xl shadow-md transform rotate-1 relative"
                    style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
                  >
                    <div className="text-2xl font-bold text-deep-violet mb-2">AI/ML Research</div>
                    <p className="text-gray-700">LSTM, Data Analysis, Research Papers</p>
                    <div
                      className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/20 -z-10 transform -rotate-1 rounded-xl"
                      style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
                    />
                  </div>
                </motion.div>
              </div>
            </CardContent>

            {/* Card Shadow */}
            <div
              className="absolute -bottom-3 -right-3 w-full h-full bg-deep-violet/10 -z-10 transform rotate-1"
              style={{ clipPath: "polygon(3% 0%, 97% 2%, 98% 97%, 2% 100%)", borderRadius: "25px" }}
            />
          </Card>
        </motion.div>

        {/* Project Modal - Enhanced Paper Style */}
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
                initial={{ opacity: 0, scale: 0.9, y: 20, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20, rotate: 2 }}
                className="bg-white border-0 shadow-2xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 98%, 1% 100%)" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <Image
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    width={800}
                    height={400}
                    className="w-full h-64 md:h-80 object-cover rounded-t-3xl"
                  />
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-4 right-4 bg-white/90 border-deep-violet text-deep-violet hover:bg-deep-violet hover:text-white shadow-lg transform -rotate-2"
                      style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                      onClick={() => setSelectedProject(null)}
                    >
                      <X size={16} />
                    </Button>
                  </motion.div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-3xl font-bold text-gray-900">{selectedProject.title}</h2>
                    <Badge
                      variant="secondary"
                      className="bg-soft-lavender text-gray-700 transform rotate-1 shadow-sm"
                      style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
                    >
                      {selectedProject.category}
                    </Badge>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed">{selectedProject.description}</p>

                  <div className="mb-6">
                    <div className="relative inline-block mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 relative z-10">Technologies Used</h3>
                      <div
                        className="absolute -inset-2 bg-bright-aqua/20 shadow-sm transform rotate-1 -z-10 rounded-lg"
                        style={{ clipPath: "polygon(5% 0%, 100% 5%, 95% 100%, 0% 95%)" }}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-soft-lavender text-gray-700 hover:bg-bright-aqua hover:text-white transition-colors transform hover:rotate-1 shadow-sm"
                          style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
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
                        className="border-deep-violet text-deep-violet hover:bg-deep-violet hover:text-white px-6 py-3 rounded-xl font-semibold bg-transparent shadow-lg transform relative"
                        style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
                        onClick={() => window.open(selectedProject.githubUrl, "_blank")}
                      >
                        <Github className="mr-2" size={16} />
                        View Source Code
                        <div
                          className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/20 -z-10 transform -rotate-1 rounded-xl"
                          style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
                        />
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Modal Shadow */}
                <div
                  className="absolute -bottom-3 -right-3 w-full h-full bg-deep-violet/20 -z-10 transform rotate-1 rounded-3xl"
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
