import type React from "react"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Spectral } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { SceneRoot } from "@/components/three/scene-root"
import { Atmosphere, CursorRing } from "@/components/chrome/atmosphere"

/**
 * Two serifs, no sans anywhere.
 *
 * Cormorant is a display garalde — very high stroke contrast, fine hairlines,
 * and it falls apart below about 18px, which is exactly why it is confined to
 * headings and caps here. Spectral carries everything meant to be read: it is
 * a serif drawn for screens, so it holds up at body sizes where Cormorant
 * would go to pieces.
 */
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
})

const body = Spectral({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aryanbadmera.com"),
  title: {
    default: "Aryan Badmera — Developer",
    template: "%s — Aryan Badmera",
  },
  description:
    "Computer Science student building Solidity smart contracts on Ethereum and machine-learning models in Python.",
  keywords: ["Aryan Badmera", "Solidity", "Ethereum", "Superfluid", "Machine Learning", "Web3", "Three.js"],
  authors: [{ name: "Aryan Badmera" }],
  creator: "Aryan Badmera",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Aryan Badmera — Developer",
    description: "Smart contracts on Ethereum, machine-learning models in Python.",
    siteName: "Aryan Badmera",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Aryan Badmera" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryan Badmera — Developer",
    description: "Smart contracts on Ethereum, machine-learning models in Python.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
  colorScheme: "dark",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <a
          href="#main-content"
          className="label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink-lift focus:px-4 focus:py-2 focus:text-chalk"
        >
          Skip to content
        </a>

        <SceneRoot />
        <Atmosphere />
        <CursorRing />
        <Navigation />

        <div className="relative z-10 isolate flex min-h-screen flex-col overflow-x-clip">
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
