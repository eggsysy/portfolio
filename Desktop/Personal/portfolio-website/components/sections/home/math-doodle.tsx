"use client"

import { motion } from "framer-motion"

export const MathDoodle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      whileHover={{ scale: 1.1, rotate: -8 }}
      className="absolute bottom-8 left-5 pointer-events-none z-20"
    >
      <div
        className="bg-white dark:bg-gray-800 p-4 shadow-xl transform -rotate-12 relative"
        style={{
          clipPath: "polygon(5% 2%, 88% 0%, 95% 12%, 98% 78%, 92% 88%, 85% 95%, 15% 98%, 8% 92%, 2% 85%, 0% 15%)",
          borderRadius: "12px",
          width: "100px",
          height: "75px",
        }}
      >
        {/* Mathematical Expression */}
        <div className="flex items-center justify-center h-full">
          <span
            className="text-gray-800 dark:text-gray-200 font-bold text-xl transform -rotate-3 font-kalam"
            style={{
              textShadow: "0.8px 0.8px 0px rgba(0,0,0,0.15)",
              letterSpacing: "0.5px",
            }}
          >
            Y = |X|
          </span>
        </div>

        {/* Paper texture lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-3 left-3 right-2 h-px bg-blue-200 opacity-50 transform rotate-2"></div>
          <div className="absolute top-5 left-2 right-3 h-px bg-blue-200 opacity-40 transform -rotate-1"></div>
          <div className="absolute bottom-4 left-4 right-1 h-px bg-blue-200 opacity-30 transform rotate-1"></div>
        </div>

        {/* Pen marks and doodles */}
        <div className="absolute top-2 right-3 w-1 h-1 bg-blue-400 rounded-full opacity-60"></div>
        <div className="absolute bottom-3 left-2 w-0.5 h-3 bg-blue-300 opacity-40 transform rotate-45"></div>

        {/* Multiple shadow layers for depth */}
        <div
          className="absolute -bottom-2 -right-2 w-full h-full bg-gray-400/40 transform rotate-3 -z-10"
          style={{
            clipPath: "polygon(5% 2%, 88% 0%, 95% 12%, 98% 78%, 92% 88%, 85% 95%, 15% 98%, 8% 92%, 2% 85%, 0% 15%)",
            borderRadius: "12px",
          }}
        />
        <div
          className="absolute -bottom-3 -right-3 w-full h-full bg-gray-500/25 transform rotate-5 -z-20"
          style={{
            clipPath: "polygon(5% 2%, 88% 0%, 95% 12%, 98% 78%, 92% 88%, 85% 95%, 15% 98%, 8% 92%, 2% 85%, 0% 15%)",
            borderRadius: "12px",
          }}
        />

        {/* Enhanced torn edge effects */}
        <div className="absolute -top-1 -left-1 w-4 h-4 bg-white transform rotate-45 opacity-90 shadow-sm"></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white transform -rotate-12 opacity-80"></div>
        <div className="absolute top-1 right-0 w-2 h-2 bg-white transform rotate-30 opacity-70"></div>

        {/* Paper fold effect */}
        <div
          className="absolute top-0 right-0 w-6 h-6 bg-gray-100 transform rotate-45 opacity-60"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 0% 100%)",
          }}
        ></div>
      </div>
    </motion.div>
  )
}
