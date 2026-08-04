import type React from "react"
import type { Metadata } from "next"
import { Inter, Kalam, Patrick_Hand } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { PaperDefs } from "@/components/paper-ui/paper-defs"
import { CommandPalette } from "@/components/paper-ui/command-palette"
import { PencilCursor } from "@/components/paper-ui/pencil-cursor"
import { SiteFooter } from "@/components/site-footer"
import { ScrollProgress } from "@/components/scroll-progress"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
})
// Neat everyday print handwriting for headlines.
const displayFont = Patrick_Hand({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aryanbadmera.com"),
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
      <body className={`${inter.className} ${inter.variable} ${kalam.variable} ${displayFont.variable} bg-soft-lavender text-gray-900 antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-medium focus:text-gray-900 focus:shadow-lg dark:focus:bg-gray-900 dark:focus:text-gray-100"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <PaperDefs />
          <PencilCursor />
          <Navigation />
          <CommandPalette />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
