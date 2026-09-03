"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import { SectionTitle } from "@/components/ui-kit/section-title"
import { useSceneMode } from "@/components/three/use-scene-mode"
import { projects, type Project } from "@/lib/projects"

/**
 * Projects as slabs seen slightly off-axis, the way the reference presents
 * them — a thin extruded edge on one side gives each card physical depth
 * without needing a second WebGL scene to do it.
 */
function ProjectSlab({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1

  return (
    <motion.article
      id={project.slug}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 1.1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group scroll-mt-28 [perspective:1600px]"
    >
      <div
        className="relative transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
        style={{
          transform: `rotateY(${flip ? 7 : -7}deg) rotateX(1.5deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* The extruded side of the slab */}
        <div
          aria-hidden="true"
          className={`absolute inset-y-0 w-3 bg-ink-lift ${flip ? "-left-3" : "-right-3"}`}
          style={{ transform: `rotateY(${flip ? -90 : 90}deg)`, transformOrigin: flip ? "left" : "right" }}
        />

        <div className="relative border border-chalk-faint/45 bg-ink/70 transition-colors duration-700 group-hover:border-chalk-dim">
          <div className="relative aspect-[16/10] overflow-hidden bg-ink-lift">
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover opacity-80 grayscale transition-all duration-[1200ms] group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
              />
            ) : (
              /* No screenshot yet: a plate of the project's own initials rather
                 than a broken image box. */
              <div className="flex h-full items-center justify-center">
                <span className="display text-5xl text-chalk-faint/50">
                  {project.title
                    .split(/[\s-]/)
                    .slice(0, 3)
                    .map((w) => w[0])
                    .join("")}
                </span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="label mb-2 text-[0.62rem] text-sage">
          {project.category} · {project.year}
        </p>
        <h3 className="font-display text-[1.6rem] tracking-wider2 text-chalk">{project.title}</h3>
        <p className="prose-quiet mx-auto mt-3 max-w-[38ch] text-[0.95rem] italic text-chalk-dim">
          {project.summary}
        </p>

        <p className="mt-4 font-display text-[0.72rem] tracking-widest2 text-chalk-faint">
          {project.technologies.join("  ·  ")}
        </p>

        <div className="mt-6 flex items-center justify-center gap-7">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code`}
            className="text-chalk-faint transition-colors duration-300 hover:text-sage"
          >
            <Github size={19} />
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live`}
              className="text-chalk-faint transition-colors duration-300 hover:text-sage"
            >
              <ExternalLink size={19} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function Work() {
  const ref = useSceneMode("shards", 0.8)

  return (
    <section
      id="work"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative px-6 py-32 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center">
          <SectionTitle align="center">Projects</SectionTitle>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.15 }}
          className="prose-quiet scrim mx-auto mt-10 max-w-[62ch] text-center text-[1.02rem]"
        >
          &ldquo;Two projects, covered properly rather than a longer list in passing. Each one says what the
          problem was, what I built, and where the code lives.&rdquo;
        </motion.p>

        <div className="mt-24 grid gap-20 md:grid-cols-2 md:gap-14 lg:gap-24">
          {projects.map((project, i) => (
            <ProjectSlab key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* The detail behind each slab. */}
        <div className="mt-28 grid gap-14 md:grid-cols-2 md:gap-20">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-line pt-8"
            >
              <p className="label mb-3 text-[0.62rem]">{project.title}</p>
              <p className="prose-quiet text-[0.98rem] text-chalk-dim">{project.problem}</p>
              <ul className="mt-6 space-y-3">
                {project.approach.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="mt-[0.35rem] font-display text-[0.7rem] tracking-widest2 text-sage">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="prose-quiet text-[0.98rem]">{step}</span>
                  </li>
                ))}
              </ul>
              {project.outcome && (
                <p className="prose-quiet mt-6 border-l border-sage-dim pl-5 text-[0.98rem] italic">
                  {project.outcome}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
