export type Project = {
  id: number
  title: string
  category: string
  description: string
  technologies: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
}

export const projects: Project[] = [
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

export const categories = ["All", "AI/ML", "Web3/Blockchain"]

export const featuredProjects = projects.filter((p) => p.featured)
