"use client"

import { motion } from "framer-motion"
import { Sticker } from "@/components/paper-ui/sticker"

export const AboutHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16 relative"
    >
      {/* Decorative Stickers */}
      <Sticker 
        color="white" 
        rotation={-10} 
        className="top-0 left-0 hidden md:flex"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        ☕ Coffee Powered
      </Sticker>

      <Sticker 
        color="bright-aqua" 
        rotation={15} 
        className="bottom-0 right-0 hidden md:flex"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        Lifelong Learner
      </Sticker>

      <div className="relative inline-block mb-8">
        <h1 className="text-5xl md:text-7xl font-black text-gray-800 dark:text-gray-100 relative z-10">
          <span className="relative inline-block">
            About Me
            <div
              className="absolute -inset-6 bg-white dark:bg-gray-800 shadow-xl transform -rotate-2 -z-10 rounded-2xl"
              style={{ clipPath: "polygon(3% 0%, 97% 2%, 98% 97%, 2% 100%)" }}
            />
          </span>
        </h1>
      </div>

      {/* Paper Card Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative inline-block max-w-4xl"
      >
        <div
          className="bg-white dark:bg-gray-800 px-8 py-6 shadow-lg transform rotate-1 rounded-xl relative"
          style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 98%, 1% 100%)" }}
        >
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
            Enthusiastic and determined B.Tech Computer Science student with a strong interest in{" "}
            <span className="text-bright-aqua font-semibold">blockchain technology</span> and{" "}
            <span className="text-deep-violet font-semibold">decentralized systems</span>. Passionate about learning
            new technologies and building practical, real-world solutions.
          </p>
          <div className="absolute -bottom-2 -right-2 w-full h-full bg-bright-aqua/10 -z-10 rounded-xl transform -rotate-1" />
        </div>
      </motion.div>
    </motion.div>
  )
}
