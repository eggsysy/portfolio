"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GraduationCap, BrainCircuit, Download } from "lucide-react"
import { SectionTitle } from "@/components/ui-kit/section-title"
import { useSceneMode } from "@/components/three/use-scene-mode"

const education = [
  { years: "2023–2027", what: "VIT Vellore — B.Tech, Computer Science", note: "Third year · CGPA 9.1" },
  { years: "2024", what: "Oracle — Certified Generative AI Professional" },
  { years: "2023", what: "Narayana Junior College — Class 12 (TSBIE)", note: "97.9%" },
  { years: "2021", what: "St. Aloysius EMS — Class 10 (CBSE)", note: "97.2%" },
]

const skills = [
  { group: "On-chain", items: "Solidity · Ethereum · Superfluid · Hardhat · ethers.js" },
  { group: "Models & data", items: "Python · PyTorch · TensorFlow · Scikit-learn · Pandas · NumPy · LSTM · KAN" },
  { group: "Interfaces", items: "TypeScript · React · Next.js · TailwindCSS · Three.js" },
  { group: "Foundations", items: "C/C++ · Java · SQL · Data structures · Algorithms · Git" },
]

export function About() {
  const ref = useSceneMode("sculpture", 1)
  const [tab, setTab] = useState<"education" | "skills">("education")

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative flex min-h-[100svh] items-center px-6 py-28 sm:px-10 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-[1500px] gap-16 lg:grid-cols-2 lg:gap-8">
        {/* Left column stays empty on large screens: the brain lives there,
            rendered in the canvas behind the page. */}
        <div className="hidden lg:block" aria-hidden="true" />

        <div className="max-w-[46rem] lg:pr-6">
          <SectionTitle>About</SectionTitle>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="prose-quiet scrim mt-9 text-[1.02rem] sm:text-[1.1rem]"
          >
            &ldquo;I&apos;m Aryan — a Computer Science student at VIT Vellore, now in my third year. I build two
            kinds of thing. The first is smart contracts: payment rules written once, deployed, and then run
            without anyone administering them. The second is machine-learning models, where the interesting part
            is usually not the accuracy but working out why a model behaves the way it does. Most of my time goes
            into Solidity and Python. If you&apos;d like to talk about either, or about an internship, my inbox is
            open.&rdquo;
          </motion.p>

          {/* Tabs */}
          <div className="mt-12 flex gap-10">
            {(
              [
                { key: "education", label: "Education", Icon: GraduationCap },
                { key: "skills", label: "Skills", Icon: BrainCircuit },
              ] as const
            ).map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                aria-pressed={tab === key}
                className="group relative flex items-center gap-2.5 pb-3"
              >
                <Icon size={16} className={tab === key ? "text-sage" : "text-chalk-faint"} />
                <span
                  className={`font-display text-[0.95rem] tracking-wider2 transition-colors duration-300 ${
                    tab === key ? "text-chalk" : "text-chalk-faint group-hover:text-chalk-dim"
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`absolute inset-x-0 bottom-0 block h-px bg-chalk transition-all duration-500 ${
                    tab === key ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="mt-9 min-h-[15rem]">
            {tab === "education" ? (
              <ul className="space-y-6">
                {education.map((item, i) => (
                  <motion.li
                    key={item.what}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.07 }}
                  >
                    <p className="font-display text-[0.78rem] tracking-widest2 text-chalk-faint">{item.years}</p>
                    <p className="mt-1 text-chalk">{item.what}</p>
                    {item.note && <p className="mt-0.5 text-sm text-chalk-dim">{item.note}</p>}
                  </motion.li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-6">
                {skills.map((item, i) => (
                  <motion.li
                    key={item.group}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.07 }}
                  >
                    <p className="font-display text-[0.78rem] tracking-widest2 text-chalk-faint">
                      {item.group}
                    </p>
                    <p className="mt-1 leading-relaxed text-chalk">{item.items}</p>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-12 border-t border-line pt-10">
            <a href="/Aryan-Badmera-Resume.pdf" download className="pill pill-sage text-[0.78rem]">
              <Download size={14} />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
