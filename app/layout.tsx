import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aryan Badmera - Portfolio",
  description: "Software Developer Portfolio with Modern Aqua-Violet Theme",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-soft-lavender text-gray-900 antialiased`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}
