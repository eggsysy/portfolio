"use client"

import { motion } from "framer-motion"

interface CertStatsProps {
  count: number
}

export const CertStats = ({ count }: CertStatsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="text-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
        <motion.div whileHover={{ scale: 1.05, rotate: 1 }}>
          <div
            className="bg-white border-0 shadow-lg rounded-2xl p-6 relative transform -rotate-1"
            style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
          >
            <div className="text-3xl font-bold text-bright-aqua mb-2">{count}</div>
            <p className="text-gray-700 dark:text-gray-400">Professional Certifications</p>
            <div
              className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/10 -z-10 transform rotate-1 rounded-2xl"
              style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
            />
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05, rotate: -1 }}>
          <div
            className="bg-white dark:bg-gray-900 border-0 dark:border dark:border-gray-700/50 shadow-lg rounded-2xl p-6 relative transform rotate-1"
            style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
          >
            <div className="text-3xl font-bold text-deep-violet mb-2">AI/ML</div>
            <p className="text-gray-700 dark:text-gray-400">Specialization Focus</p>
            <div
              className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/10 -z-10 transform -rotate-1 rounded-2xl"
              style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
            />
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05, rotate: 1 }}>
          <div
            className="bg-white border-0 shadow-lg rounded-2xl p-6 relative transform -rotate-1"
            style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
          >
            <div className="text-3xl font-bold text-bright-aqua mb-2">2024</div>
            <p className="text-gray-700 dark:text-gray-400">Latest Certification</p>
            <div
              className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/10 -z-10 transform rotate-1 rounded-2xl"
              style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
