import type React from "react"
import type { Metadata } from "next"
import { Inter, Kalam } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { PaperDefs } from "@/components/paper-ui/paper-defs"
import { CommandPalette } from "@/components/paper-ui/command-palette"

const inter = Inter({ subsets: ["latin"] })
const kalam = Kalam({ 
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
})

export const metadata: Metadata = {
  title: {
    default: "Aryan Badmera | Software Developer",
    template: "%s | Aryan Badmera",
  },
  description: "Portfolio of Aryan Badmera, a Software Developer & Blockchain Developer specializing in Blockchain, AI/ML, and modern web technologies.",
  keywords: ["Aryan Badmera", "Software Developer", "Blockchain", "AI/ML", "Web3", "Portfolio", "Next.js", "React"],
  authors: [{ name: "Aryan Badmera" }],
  creator: "Aryan Badmera",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aryanbadmera.com", // Replace with your actual domain
    title: "Aryan Badmera | Software Developer",
    description: "Building cutting-edge applications with modern technologies and creative problem-solving.",
    siteName: "Aryan Badmera Portfolio",
    images: [
      {
        url: "/placeholder-user.jpg", // Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Aryan Badmera Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Badmera | Software Developer",
    description: "Building cutting-edge applications with modern technologies.",
    images: ["/placeholder-user.jpg"],
    creator: "@eggsysy", // Replace with your actual twitter handle
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} ${kalam.variable} bg-soft-lavender text-gray-900 antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <PaperDefs />
          <Navigation />
          <CommandPalette />
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
