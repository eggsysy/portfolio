"use client"

import { motion } from "framer-motion"

export const ContactHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <div className="relative inline-block mb-8">
        <h1 className="text-5xl md:text-7xl font-black text-gray-800 dark:text-gray-100 relative z-10">
          <span className="relative inline-block">
            Get In Touch
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
            Ready to collaborate on innovative projects? Let's connect and build something amazing together. I'm
            always excited to discuss new opportunities in{" "}
            <span className="text-bright-aqua font-semibold">blockchain</span>,{" "}
            <span className="text-deep-violet font-semibold">AI/ML</span>, and software development.
          </p>
          <div className="absolute -bottom-2 -right-2 w-full h-full bg-bright-aqua/10 -z-10 rounded-xl transform -rotate-1" />
        </div>
      </motion.div>
    </motion.div>
  )
}
