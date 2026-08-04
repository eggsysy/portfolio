import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "B.Tech CS student focused on blockchain, Web3, and AI/ML — background, skills, and interests of Aryan Badmera.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
