"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Project {
  id: number
  title: string
  category: string
  description: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
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
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{project.title}</h2>
                  <Badge
                    variant="secondary"
                    className="bg-soft-lavender dark:bg-gray-700 text-gray-700 dark:text-gray-200 transform rotate-1 shadow-sm"
                    style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
                  >
                    {project.category}
                  </Badge>
                </div>
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="mt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white dark:bg-gray-800 border-deep-violet dark:border-gray-600 text-deep-violet dark:text-gray-300 hover:bg-deep-violet hover:text-black dark:hover:bg-gray-700 shadow-lg transform -rotate-2 shrink-0"
                    style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                    onClick={onClose}
                    aria-label="Close project details"
                  >
                    <X size={16} />
                  </Button>
                </motion.div>
              </div>

              <p className="text-gray-700 dark:text-gray-400 mb-6 leading-relaxed mt-4">{project.description}</p>

              <div className="mb-6">
                <div className="relative inline-block mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 relative z-10">
                    Technologies Used
                  </h3>
                  <div
                    className="absolute -inset-2 bg-bright-aqua/20 dark:bg-bright-aqua/10 shadow-sm transform rotate-1 -z-10 rounded-lg"
                    style={{ clipPath: "polygon(5% 0%, 100% 5%, 95% 100%, 0% 95%)" }}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
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
                    onClick={() => window.open(project.liveUrl, "_blank")}
                    aria-label={`Open live project: ${project.title}`}
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
                    onClick={() => window.open(project.githubUrl, "_blank")}
                    aria-label={`Open source code for ${project.title}`}
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
  )
}
