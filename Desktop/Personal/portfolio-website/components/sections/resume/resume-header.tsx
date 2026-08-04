"use client"

import { motion } from "framer-motion"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MagneticButton } from "@/components/paper-ui/magnetic-button"

export const ResumeHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      <div className="relative inline-block mb-6">
        <h1 className="text-5xl md:text-7xl font-black text-gray-800 dark:text-gray-100 relative z-10">
          <span className="relative inline-block">
            ARYAN BADMERA
            <div
              className="absolute -inset-4 bg-white dark:bg-gray-800 shadow-xl transform -rotate-1 -z-10 rounded-2xl"
              style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 98%, 1% 100%)" }}
            />
          </span>
        </h1>
      </div>

      {/* Paper Card Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative inline-block mb-8"
      >
        <div
          className="bg-bright-aqua/20 px-6 py-3 shadow-lg transform rotate-1 rounded-lg relative"
          style={{ clipPath: "polygon(3% 0%, 97% 2%, 100% 97%, 0% 100%)" }}
        >
          <p className="text-xl text-gray-700 dark:text-gray-300 font-medium">Software Developer</p>
          <div className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/30 -z-10 rounded-lg transform -rotate-1" />
        </div>
      </motion.div>

      {/* Sticky Note Style Download Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileHover={{ scale: 1.05, rotate: 2 }}
        className="relative inline-block"
      >
        <MagneticButton>
        <Button
          asChild
          className="bg-bright-aqua hover:bg-bright-aqua/90 text-black px-8 py-4 text-lg font-bold shadow-lg transform -rotate-1 rounded-xl relative z-10 border-0"
          style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
        >
          <a
            href="/Aryan-Badmera-Resume.pdf"
            download
            aria-label="Download Aryan Badmera's resume as PDF"
          >
            <Download className="mr-2" size={20} />
            Download PDF
          </a>
        </Button>
        <div
          className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/40 transform rotate-1 rounded-xl -z-10"
          style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
        />
        </MagneticButton>
      </motion.div>
    </motion.div>
  )
}
