export type Project = {
  id: number
  slug: string
  title: string
  category: string
  /** One line: what it is, for a scanner. */
  summary: string
  /** The case study. Kept factual — what was built, and how. */
  problem: string
  approach: string[]
  /** What came of it. Add numbers here as you get them — users, latency, accuracy. */
  outcome?: string
  technologies: string[]
  year: string
  /**
   * A real screenshot, placed in /public. One image per project does more for
   * this page than any amount of paper texture — until then the card renders
   * a plain sheet rather than an empty grey band.
   */
  image?: string
  liveUrl?: string
  githubUrl: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 2,
    slug: "proof-of-skill",
    title: "Proof-of-Skill",
    category: "Web3",
    summary: "A platform where fans back creators in exchange for a share of future revenue.",
    problem:
      "Creators who need funding early have little to offer backers except goodwill, and paying a share of revenue back to many people normally means a transaction per backer — which makes small stakes uneconomic on-chain.",
    approach: [
      "Wrote the backing and payout logic as Solidity smart contracts, deployed to Ethereum Sepolia.",
      "Used Superfluid's Instant Distribution Agreement so revenue reaches every backer in a single transaction, rather than one transfer each.",
      "Built a Next.js and TailwindCSS dashboard for tracking backing goals and individual portfolios.",
    ],
    technologies: ["Solidity", "Ethereum", "Superfluid IDA", "Next.js", "TailwindCSS"],
    year: "2025",
    githubUrl: "https://github.com/eggsysy/proof-of-skill",
    featured: true,
  },
  {
    id: 1,
    slug: "stock-market-trend-prediction",
    title: "Stock Market Trend Prediction",
    category: "AI/ML",
    summary: "A KAN-based LSTM for forecasting market trends, written up as a research paper.",
    problem:
      "Standard LSTMs fix their activation functions in advance, which limits how well a model can fit the irregular, non-stationary behaviour of price series.",
    approach: [
      "Combined Kolmogorov–Arnold Networks with an LSTM so the activation functions are learned rather than fixed.",
      "Trained on historical price data together with derived technical indicators.",
      "Wrote up the methodology and findings as a research paper.",
    ],
    technologies: ["Python", "LSTM", "KAN", "Machine Learning", "Research"],
    year: "2024",
    githubUrl: "https://github.com/eggsysy/Stat-a-thon",
    featured: true,
  },
]

export const categories = ["All", "Web3", "AI/ML"]

export const featuredProjects = projects.filter((p) => p.featured)
