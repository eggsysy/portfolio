"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/paper-ui/magnetic-button"
import { PageHeader } from "@/components/paper-ui/page-header"

export const ResumeHeader = () => {
  return (
    <PageHeader title="ARYAN BADMERA">
      {/* Subtitle pill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative mb-8 inline-block"
      >
        <div
          className="relative rounded-lg bg-bright-aqua/20 px-6 py-3 shadow-lg transform rotate-1"
          style={{ clipPath: "polygon(3% 0%, 97% 2%, 100% 97%, 0% 100%)" }}
        >
          <p className="text-xl font-medium text-gray-700 dark:text-gray-300">Software Developer</p>
          <div className="absolute -bottom-1 -right-1 -z-10 h-full w-full rounded-lg bg-bright-aqua/30 transform -rotate-1" />
        </div>
      </motion.div>

      {/* Download button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileHover={{ scale: 1.05, rotate: 2 }}
        className="relative block"
      >
        <MagneticButton>
          <Button
            asChild
            className="relative z-10 transform rounded-xl border-0 bg-bright-aqua px-8 py-4 text-lg font-bold text-black shadow-lg -rotate-1 hover:bg-bright-aqua/90"
            style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
          >
            <a href="/Aryan-Badmera-Resume.pdf" download aria-label="Download Aryan Badmera's resume as PDF">
              <Download className="mr-2" size={20} />
              Download PDF
            </a>
          </Button>
          <div
            className="absolute -bottom-1 -right-1 -z-10 h-full w-full transform rounded-xl bg-bright-aqua/40 rotate-1"
            style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
          />
        </MagneticButton>
      </motion.div>
    </PageHeader>
  )
}
