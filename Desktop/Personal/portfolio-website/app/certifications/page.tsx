"use client"

import { BackgroundShapes, FloatingShape } from "@/components/paper-ui/background-shapes"
import { CertificationsHeader } from "@/components/sections/certifications/certifications-header"
import { CertificationCard } from "@/components/sections/certifications/certification-card"
import { LearningJourney } from "@/components/sections/certifications/learning-journey"
import { CertStats } from "@/components/sections/certifications/cert-stats"

const certifications = [
  {
    title: "Oracle Certified - Gen AI Professional",
    issuer: "Oracle",
    date: "2024",
    status: "Active",
    description:
      "Completed a professional course by Oracle covering foundational and advanced concepts of generative AI, including practical applications and ethical considerations.",
    logo: "/placeholder.svg?height=60&width=60",
    credentialId: "ORACLE-GENAI-2024-001",
    skills: ["Generative AI", "Machine Learning", "AI Ethics", "Practical Applications", "Oracle Cloud"],
  },
]

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-soft-lavender dark:bg-[#0d0d18] pt-20 pb-16 relative overflow-hidden transition-colors duration-300">
      {/* Background Elements */}
      <BackgroundShapes>
        <FloatingShape
          initial={{ x: -35, rotate: -10 }}
          animate={{ x: 0, rotate: -4 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="top-28 -left-16 w-60 h-44 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transform rotate-12 opacity-50 dark:opacity-10"
          style={{ clipPath: "polygon(6% 0%, 94% 4%, 96% 94%, 4% 100%)" }}
        />

        <FloatingShape
          initial={{ y: -35, rotate: 12 }}
          animate={{ y: 0, rotate: 7 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          className="top-80 -right-20 w-68 h-68 bg-bright-aqua/20 rounded-full shadow-md transform -rotate-10"
        />

        <FloatingShape
          initial={{ x: 35, rotate: -14 }}
          animate={{ x: 0, rotate: -8 }}
          transition={{ duration: 2.2, ease: "easeOut", delay: 0.6 }}
          className="bottom-36 left-10 w-52 h-64 bg-deep-violet/20 shadow-lg transform rotate-15"
          style={{ clipPath: "polygon(7% 0%, 93% 6%, 94% 93%, 6% 98%)", borderRadius: "25px" }}
        />
      </BackgroundShapes>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <CertificationsHeader />

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <CertificationCard key={index} cert={cert} index={index} />
          ))}
        </div>

        <LearningJourney />
        <CertStats count={certifications.length} />
      </div>
    </div>
  )
}
