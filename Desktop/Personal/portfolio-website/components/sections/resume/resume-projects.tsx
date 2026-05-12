"use client"

import { motion } from "framer-motion"
import { Briefcase, Github } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Stock Market Trend Prediction",
    description:
      "Developed a machine learning model to predict stock market trends using historical data and technical indicators. Applied KAN based LSTM algorithms. Authored a research paper detailing the methodology and findings.",
    technologies: ["Python", "LSTM", "Machine Learning", "Research"],
    githubUrl: "https://github.com/eggsysy/Stat-a-thon",
  },
  {
    title: "Proof-of-Skill",
    description:
      "Developed a Web3 platform on Ethereum Sepolia enabling fans to back creators for a shareof future revenue. Engineered Solidity smart contracts with Superfluid IDA for real-time,single-transaction revenue distribution. Built a responsive Next.js and TailwindCSS dashboard to track backing goals and user portfolios.",
    technologies: ["Solidity", "Next.js", "TailwindCSS", "Superfluid IDA"],
    githubUrl: "https://github.com/eggsysy/proof-of-skill",
  },
]

export const ResumeProjects = () => {
  return (
    <section>
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <h2 className="text-3xl font-bold text-gray-800 relative z-10 flex items-center">
            <div className="w-10 h-10 bg-deep-violet/20 rounded-full flex items-center justify-center mr-3 transform rotate-3">
              <Briefcase className="text-deep-violet" size={24} />
            </div>
            Projects
          </h2>
          <div
            className="absolute -inset-4 bg-deep-violet/20 shadow-md transform -rotate-1 -z-10 rounded-xl"
            style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.02, rotate: -1 }}
          >
            <Card
              className="bg-white dark:bg-gray-900 border-0 dark:border dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden transform hover:rotate-1"
              style={{ clipPath: "polygon(3% 0%, 97% 3%, 98% 97%, 2% 100%)", borderRadius: "15px" }}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{project.title}</h3>
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-deep-violet text-deep-violet hover:bg-deep-violet hover:text-black transition-all duration-300 bg-transparent transform -rotate-1 shadow-sm"
                      style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                      onClick={() => window.open(project.githubUrl, "_blank")}
                    >
                      <Github className="mr-1" size={14} />
                      GitHub
                    </Button>
                  </motion.div>
                </div>
                <p className="text-gray-700 dark:text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="bg-soft-lavender dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-bright-aqua hover:text-black transition-colors transform hover:rotate-1 shadow-sm"
                      style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <div
                className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/10 -z-10 transform -rotate-1"
                style={{ clipPath: "polygon(3% 0%, 97% 3%, 98% 97%, 2% 100%)", borderRadius: "15px" }}
              />
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
