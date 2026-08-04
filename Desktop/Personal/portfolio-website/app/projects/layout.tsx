import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Aryan Badmera spanning AI/ML research and Web3/blockchain applications.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
