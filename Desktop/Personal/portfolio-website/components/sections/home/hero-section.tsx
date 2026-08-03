"use client"

import { motion } from "framer-motion"
import { Sticker } from "@/components/paper-ui/sticker"

export const HeroSection = () => {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
      {/* Decorative Stickers */}
      <Sticker 
        color="bright-aqua" 
        rotation={-15} 
        className="top-[20%] left-[10%] md:left-[15%]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        Open Source
      </Sticker>
      
      <Sticker 
        color="deep-violet" 
        rotation={10} 
        className="bottom-[25%] right-[10%] md:right-[15%]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
      >
        Web3 Enthusiast
      </Sticker>

      <Sticker 
        color="yellow" 
        rotation={-5} 
        className="top-[15%] right-[20%] hidden md:flex"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
      >
        🚀 Fast Learner
      </Sticker>

      <div className="max-w-6xl mx-auto text-center">
        {/* Paper Cut-out Style Title */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-8"
        >
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-8xl font-black text-gray-800 dark:text-gray-100 relative z-10 leading-none">
              <span className="relative inline-block">
                ARYAN
                <div
                  className="absolute -inset-4 bg-white dark:bg-gray-800 shadow-xl transform -rotate-1 -z-10 rounded-lg"
                  style={{ clipPath: "polygon(5% 0%, 95% 2%, 98% 95%, 2% 98%)", filter: "url(#paper-torn-0)" }}
                />
              </span>
              <br />
              <span className="relative inline-block mt-4">
                <span className="text-bright-aqua">BADMERA</span>
                <div
                  className="absolute -inset-4 bg-bright-aqua/20 shadow-lg transform rotate-1 -z-10 rounded-lg"
                  style={{ clipPath: "polygon(2% 5%, 98% 0%, 95% 98%, 0% 95%)", filter: "url(#paper-torn-2)" }}
                />
              </span>
            </h1>
          </div>
        </motion.div>

        {/* Paper Card Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative inline-block mb-12"
        >
          <div
            className="bg-white dark:bg-gray-800 px-8 py-4 shadow-lg transform -rotate-1 rounded-lg relative"
            style={{ clipPath: "polygon(3% 0%, 97% 2%, 100% 97%, 0% 100%)" }}
          >
            <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-light">
              Software Developer & <span className="text-deep-violet font-semibold">Blockchain Developer</span>
            </p>
            <div className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/10 -z-10 rounded-lg transform rotate-1" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
