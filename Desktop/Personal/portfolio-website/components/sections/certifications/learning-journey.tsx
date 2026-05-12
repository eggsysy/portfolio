"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

export const LearningJourney = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-center mb-16"
    >
      <Card
        className="bg-white dark:bg-gray-900 border-0 dark:border dark:border-gray-700/50 shadow-xl max-w-4xl mx-auto relative overflow-hidden transform hover:-rotate-1 transition-all duration-300"
        style={{ clipPath: "polygon(3% 0%, 97% 2%, 98% 97%, 2% 100%)", borderRadius: "25px" }}
      >
        <CardContent className="p-8">
          <div className="relative inline-block mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 relative z-10">
              Continuous Learning Journey
            </h2>
            <div
              className="absolute -inset-4 bg-bright-aqua/20 shadow-md transform rotate-1 -z-10 rounded-xl"
              style={{ clipPath: "polygon(5% 0%, 100% 3%, 95% 100%, 0% 97%)" }}
            />
          </div>

          <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-6">
            As a passionate Computer Science student with interests in{" "}
            <span className="text-bright-aqua font-semibold">blockchain technology</span> and{" "}
            <span className="text-deep-violet font-semibold">decentralized systems</span>, I'm continuously
            expanding my knowledge through professional certifications and hands-on projects.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div whileHover={{ scale: 1.05, rotate: 1 }} className="text-center relative">
              <div
                className="bg-bright-aqua/10 p-6 rounded-xl shadow-md transform -rotate-1 relative"
                style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
              >
                <div className="text-2xl font-bold text-bright-aqua mb-2">Currently Pursuing</div>
                <p className="text-gray-700 dark:text-gray-400">Advanced Blockchain Development</p>
                <div
                  className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/20 -z-10 transform rotate-1 rounded-xl"
                  style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                />
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, rotate: -1 }} className="text-center relative">
              <div
                className="bg-deep-violet/10 p-6 rounded-xl shadow-md transform rotate-1 relative"
                style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
              >
                <div className="text-2xl font-bold text-deep-violet mb-2">Next Goal</div>
                <p className="text-gray-700 dark:text-gray-400">AWS Cloud Practitioner</p>
                <div
                  className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/20 -z-10 transform -rotate-1 rounded-xl"
                  style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
                />
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, rotate: 1 }} className="text-center relative">
              <div
                className="bg-bright-aqua/10 p-6 rounded-xl shadow-md transform -rotate-1 relative"
                style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
              >
                <div className="text-2xl font-bold text-bright-aqua mb-2">Focus Area</div>
                <p className="text-gray-700 dark:text-gray-400">AI/ML &amp; Web3 Technologies</p>
                <div
                  className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/20 -z-10 transform rotate-1 rounded-xl"
                  style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
                />
              </div>
            </motion.div>
          </div>
        </CardContent>

        {/* Card Shadow */}
        <div
          className="absolute -bottom-3 -right-3 w-full h-full bg-deep-violet/10 -z-10 transform rotate-1"
          style={{ clipPath: "polygon(3% 0%, 97% 2%, 98% 97%, 2% 100%)", borderRadius: "25px" }}
        />
      </Card>
    </motion.div>
  )
}
