"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import Image from "next/image"

interface Project {
  id: number
  title: string
  category: string
  description: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
  image?: string
}

interface ProjectCardProps {
  project: Project
  index: number
  onClick: (project: Project) => void
}

export const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, y: -30, rotate: 2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, rotate: 1, scale: 1.02 }}
      className="group cursor-pointer"
      onClick={() => onClick(project)}
    >
      <Card
        className="bg-white dark:bg-gray-900 border-0 dark:border dark:border-gray-700/50 shadow-lg hover:shadow-2xl dark:hover:shadow-black/40 transition-all duration-300 h-full overflow-hidden relative transform group-hover:-rotate-1"
        style={{ clipPath: "polygon(2% 0%, 98% 2%, 97% 98%, 3% 100%)", borderRadius: "20px" }}
      >
        {/* Project Image Placeholder */}
        <div className="relative h-48 w-full bg-soft-lavender dark:bg-gray-800 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-500">
             <Image 
               src={project.image || "/placeholder.jpg"} 
               alt={project.title}
               fill
               className="object-cover grayscale group-hover:grayscale-0 transition-all"
             />
          </div>
          {/* Paper Clip / Tape Effect */}
          <div className="absolute top-2 right-4 w-12 h-6 bg-white/40 backdrop-blur-sm -rotate-12 border-x border-white/20 shadow-sm z-10" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white dark:to-gray-900 opacity-60" />
        </div>

        <CardHeader className="pb-4 relative z-10">
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
          <p className="text-gray-700 dark:text-gray-400 mb-4 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
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
                aria-label={`View live version of ${project.title}`}
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
                aria-label={`View source code of ${project.title}`}
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
  )
}
