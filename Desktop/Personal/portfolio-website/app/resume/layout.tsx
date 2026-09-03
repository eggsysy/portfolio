import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume",
  description: "Aryan Badmera — education, projects, certifications and skills in software and blockchain development.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
