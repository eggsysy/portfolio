"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SketchDoodle } from "@/components/paper-ui/sketch-doodle"
import { MagneticButton } from "@/components/paper-ui/magnetic-button"

export const CTASection = () => {
  return (
    <section className="relative z-10 py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Paper Background */}
          <div
            className="bg-deep-violet/20 dark:bg-deep-violet/10 p-12 shadow-2xl transform -rotate-1 rounded-3xl relative overflow-hidden"
            style={{ clipPath: "polygon(3% 0%, 97% 2%, 100% 97%, 0% 98%)" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Ready to Build Something Amazing?
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's collaborate on innovative projects that push the boundaries of technology and creativity.
            </p>

            {/* Hand-drawn arrow nudging toward the primary action */}
            <SketchDoodle
              variant="arrow"
              color="deep-violet"
              className="absolute bottom-6 left-[12%] hidden h-20 w-20 -rotate-12 md:block lg:left-[18%]"
            />

            {/* Sticky Note Style Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <MagneticButton className="relative">
                <Link href="/projects">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <Button
                      className="bg-bright-aqua hover:bg-bright-aqua/90 text-black px-8 py-4 text-lg font-bold shadow-lg transform -rotate-1 rounded-xl relative z-10 border-0"
                      style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
                    >
                      <span className="flex items-center">
                        View My Work
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                      </span>
                    </Button>
                    {/* Button Shadow */}
                    <div
                      className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/40 transform rotate-1 rounded-xl -z-10"
                      style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
                    />
                  </motion.div>
                </Link>
              </MagneticButton>

              <MagneticButton>
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <Button
                    variant="outline"
                    className="bg-white dark:bg-gray-800 border-2 border-deep-violet dark:border-gray-500 text-deep-violet dark:text-gray-200 hover:bg-deep-violet hover:text-black dark:hover:bg-gray-700 px-8 py-4 text-lg font-bold shadow-lg transform rotate-1 rounded-xl relative z-10"
                    style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
                  >
                    Get In Touch
                  </Button>
                  {/* Button Shadow */}
                  <div
                    className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/20 transform -rotate-1 rounded-xl -z-10"
                    style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
                  />
                </motion.div>
              </Link>
              </MagneticButton>
            </div>

            {/* Background Shadow */}
            <div
              className="absolute -bottom-3 -right-3 w-full h-full bg-deep-violet/10 -z-10 transform rotate-1 rounded-3xl"
              style={{ clipPath: "polygon(3% 0%, 97% 2%, 100% 97%, 0% 98%)" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
