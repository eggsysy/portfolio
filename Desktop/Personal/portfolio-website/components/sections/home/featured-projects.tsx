"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Github } from "lucide-react"
import { PaperCard } from "@/components/paper-ui/paper-card"
import { SectionHeader } from "@/components/paper-ui/section-header"
import { MagneticButton } from "@/components/paper-ui/magnetic-button"
import { SketchDoodle } from "@/components/paper-ui/sketch-doodle"
import { featuredProjects } from "@/lib/projects"

export const FeaturedProjects = () => {
  return (
    <section className="relative z-10 py-20 px-4">
      <SketchDoodle
        variant="star"
        color="bright-aqua"
        className="absolute left-[8%] top-8 hidden h-14 w-14 md:block"
      />
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Featured Work" color="deep-violet" />

        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <PaperCard
              key={project.id}
              initial={{ opacity: 0, y: 50, rotate: index % 2 ? 4 : -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
              shadowColor={index % 2 ? "deep-violet" : "bright-aqua"}
              tornVariant={index}
            >
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                  project.category === "AI/ML"
                    ? "bg-bright-aqua/20 text-bright-aqua"
                    : "bg-deep-violet/20 text-deep-violet"
                }`}
              >
                {project.category}
              </span>

              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">{project.title}</h3>

              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-5 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-soft-lavender dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-deep-violet hover:text-bright-aqua transition-colors"
              >
                <Github size={16} /> View on GitHub
              </a>
            </PaperCard>
          ))}
        </div>

        {/* See all projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <MagneticButton className="relative">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-deep-violet hover:bg-deep-violet/90 text-white px-8 py-4 text-lg font-bold shadow-lg rounded-xl transform -rotate-1 transition-colors"
              style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
            >
              See all projects
              <ArrowRight size={20} />
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
