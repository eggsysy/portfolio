"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const certifications = [
  {
    title: "Oracle Certified - Gen AI Professional",
    issuer: "Oracle",
    description:
      "Completed a professional course covering foundational and advanced concepts of generative AI, including practical applications and ethical considerations.",
  },
]

export const ResumeCertifications = () => {
  return (
    <section>
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <h2 className="text-3xl font-bold text-gray-800 relative z-10 flex items-center">
            <div className="w-10 h-10 bg-bright-aqua/20 rounded-full flex items-center justify-center mr-3 transform -rotate-2">
              <Award className="text-bright-aqua" size={24} />
            </div>
            Certifications
          </h2>
          <div
            className="absolute -inset-4 bg-bright-aqua/20 shadow-md transform rotate-2 -z-10 rounded-xl"
            style={{ clipPath: "polygon(3% 0%, 97% 1%, 99% 97%, 1% 100%)" }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, rotate: 1 }}
          >
            <Card
              className="bg-white dark:bg-gray-900 border-0 dark:border dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden transform hover:-rotate-1"
              style={{ clipPath: "polygon(1% 0%, 99% 2%, 98% 98%, 2% 100%)", borderRadius: "15px" }}
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{cert.title}</h3>
                <p className="text-deep-violet font-medium mb-3">{cert.issuer}</p>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">{cert.description}</p>
              </CardContent>
              <div
                className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/10 -z-10 transform rotate-1"
                style={{ clipPath: "polygon(1% 0%, 99% 2%, 98% 98%, 2% 100%)", borderRadius: "15px" }}
              />
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
