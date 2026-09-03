"use client"

import { Download, Mail, Phone, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { SectionTitle } from "@/components/ui-kit/section-title"
import { useStaticSceneMode } from "@/components/three/use-scene-mode"
import { projects } from "@/lib/projects"

const details = [
  { Icon: Mail, value: "aryanbadmera@gmail.com", href: "mailto:aryanbadmera@gmail.com" },
  { Icon: Phone, value: "+91 77097 69481", href: "tel:+917709769481" },
  { Icon: MapPin, value: "Nagpur, Maharashtra" },
]

const education = [
  { years: "2023 — 2027", what: "B.Tech, Computer Science", where: "Vellore Institute of Technology", note: "Third year, sixth semester", result: "CGPA 9.1" },
  { years: "2023", what: "Class 12 (TSBIE)", where: "Narayana Junior College", result: "97.9%" },
  { years: "2021", what: "Class 10 (CBSE)", where: "St. Aloysius English Medium School", result: "97.2%" },
]

const certifications = [
  { years: "2024", what: "Certified Generative AI Professional", where: "Oracle", note: "Model behaviour, practical applications, and ethical considerations." },
]

const skills = [
  { group: "On-chain", items: "Solidity · Ethereum · Superfluid · Hardhat · ethers.js" },
  { group: "Models & data", items: "Python · PyTorch · TensorFlow · Scikit-learn · Pandas · NumPy · LSTM · KAN · R" },
  { group: "Interfaces", items: "TypeScript · React · Next.js · TailwindCSS · Three.js · HTML/CSS" },
  { group: "Foundations", items: "C/C++ · Java · SQL · Data structures · Algorithms · OOP · Git · Oracle Cloud" },
]

function Entry({ years, what, where, note, result, delay = 0 }: {
  years: string; what: string; where?: string; note?: string; result?: string; delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-2 border-b border-line py-7 md:grid-cols-[10rem_1fr_auto] md:gap-8"
    >
      <p className="font-display text-[0.75rem] tracking-widest2 text-chalk-faint">{years}</p>
      <div>
        <p className="font-display text-[1.15rem] tracking-wider2 text-chalk">{what}</p>
        {where && <p className="mt-1 text-chalk-dim">{where}</p>}
        {note && <p className="prose-quiet mt-2 max-w-[58ch] text-[0.95rem] text-chalk-dim">{note}</p>}
      </div>
      {result && <p className="font-display tracking-wider2 text-sage md:text-right">{result}</p>}
    </motion.div>
  )
}

export default function ResumePage() {
  useStaticSceneMode("quiet", 0.5)

  return (
    <div className="px-6 pb-32 pt-36 sm:px-10 sm:pt-44 lg:px-16">
      <div className="mx-auto max-w-[1000px]">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="display-hero text-[clamp(2rem,6vw,4.25rem)] text-chalk">Resume</h1>
          <p className="prose-quiet scrim mt-8 max-w-[58ch] text-[1.05rem]">
            Developer, third year at VIT Vellore. The PDF is the same content, formatted for printing.
          </p>

          <div className="mt-10">
            <a href="/Aryan-Badmera-Resume.pdf" download className="pill pill-sage text-[0.78rem]">
              <Download size={14} />
              Download PDF
            </a>
          </div>

          <ul className="mt-14 flex flex-wrap gap-x-12 gap-y-4 border-y border-line py-6">
            {details.map(({ Icon, value, href }) => (
              <li key={value} className="flex items-center gap-3">
                <Icon size={14} className="text-sage" />
                {href ? (
                  <a href={href} className="text-chalk-dim transition-colors hover:text-chalk">{value}</a>
                ) : (
                  <span className="text-chalk-dim">{value}</span>
                )}
              </li>
            ))}
          </ul>
        </motion.header>

        <div className="mt-24 space-y-24">
          <section>
            <SectionTitle>Education</SectionTitle>
            <div className="mt-10 border-t border-line">
              {education.map((e, i) => <Entry key={e.what} {...e} delay={i * 0.06} />)}
            </div>
          </section>

          <section>
            <SectionTitle>Projects</SectionTitle>
            <div className="mt-10 border-t border-line">
              {projects.map((p, i) => (
                <Entry
                  key={p.id}
                  years={p.year}
                  what={p.title}
                  where={p.technologies.join(" · ")}
                  note={p.summary}
                  delay={i * 0.06}
                />
              ))}
            </div>
          </section>

          <section>
            <SectionTitle>Certifications</SectionTitle>
            <div className="mt-10 border-t border-line">
              {certifications.map((c, i) => <Entry key={c.what} {...c} delay={i * 0.06} />)}
            </div>
          </section>

          <section>
            <SectionTitle>Skills</SectionTitle>
            <div className="mt-10 grid gap-10 border-t border-line pt-9 sm:grid-cols-2">
              {skills.map((s, i) => (
                <motion.div
                  key={s.group}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.8, delay: i * 0.06 }}
                >
                  <p className="font-display text-[0.75rem] tracking-widest2 text-chalk-faint">{s.group}</p>
                  <p className="prose-quiet mt-2 text-chalk">{s.items}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
