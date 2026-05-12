"use client"

import { motion } from "framer-motion"
import { BackgroundShapes, FloatingShape } from "@/components/paper-ui/background-shapes"
import { ResumeHeader } from "@/components/sections/resume/resume-header"
import { ResumeSidebar } from "@/components/sections/resume/resume-sidebar"
import { ResumeEducation } from "@/components/sections/resume/resume-education"
import { ResumeProjects } from "@/components/sections/resume/resume-projects"
import { ResumeCertifications } from "@/components/sections/resume/resume-certifications"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-soft-lavender dark:bg-[#0d0d18] pt-20 pb-16 relative overflow-hidden transition-colors duration-300">
      {/* Background Elements */}
      <BackgroundShapes>
        <FloatingShape
          initial={{ x: -30, rotate: -8 }}
          animate={{ x: 0, rotate: -3 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="top-24 -left-12 w-48 h-64 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transform rotate-12 opacity-50 dark:opacity-10"
          style={{ clipPath: "polygon(8% 0%, 92% 5%, 95% 92%, 5% 98%)" }}
        />

        <FloatingShape
          initial={{ y: -30, rotate: 12 }}
          animate={{ y: 0, rotate: 6 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.4 }}
          className="top-80 -right-16 w-56 h-56 bg-bright-aqua/20 rounded-full shadow-md transform -rotate-8"
        />
      </BackgroundShapes>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ResumeHeader />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Contact, About & Skills */}
          <ResumeSidebar />

          {/* Right Column - Education, Projects & Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            <ResumeEducation />
            <ResumeProjects />
            <ResumeCertifications />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
