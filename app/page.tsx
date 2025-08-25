"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Code, Heart, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-soft-lavender">
      {/* Floating Paper Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Background Waves */}
        <motion.div
          initial={{ x: -100, rotate: -5 }}
          animate={{ x: 0, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-20 -left-20 w-96 h-64 bg-white rounded-[40px] shadow-lg transform rotate-12 opacity-80"
          style={{
            clipPath: "polygon(0% 20%, 100% 0%, 100% 80%, 0% 100%)",
          }}
        />

        <motion.div
          initial={{ x: 100, rotate: 5 }}
          animate={{ x: 0, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          className="absolute top-40 -right-32 w-80 h-80 bg-bright-aqua/20 rounded-full shadow-md transform -rotate-12"
        />

        <motion.div
          initial={{ y: 100, rotate: -10 }}
          animate={{ y: 0, rotate: -5 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.6 }}
          className="absolute bottom-32 left-10 w-64 h-48 bg-deep-violet/30 shadow-lg transform rotate-6"
          style={{
            clipPath: "polygon(10% 0%, 90% 5%, 95% 90%, 5% 95%)",
            borderRadius: "20px",
          }}
        />

        {/* Small Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            animate={{
              opacity: 0.6,
              scale: 1,
              x: 0,
              y: 0,
            }}
            transition={{
              duration: 2 + Math.random(),
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
            className={`absolute w-${8 + Math.floor(Math.random() * 16)} h-${8 + Math.floor(Math.random() * 16)} shadow-md transform`}
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              backgroundColor: i % 3 === 0 ? "#00f2c3" : i % 3 === 1 ? "#5a5dff" : "#ffffff",
              opacity: 0.3 + Math.random() * 0.4,
              borderRadius: Math.random() > 0.5 ? "50%" : "15px",
              transform: `rotate(${Math.random() * 30 - 15}deg)`,
              clipPath: Math.random() > 0.7 ? "polygon(0% 15%, 85% 0%, 100% 85%, 15% 100%)" : "none",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Paper Cut-out Style Title */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative mb-8"
          >
            <div className="relative inline-block">
              <h1 className="text-6xl md:text-8xl font-black text-gray-800 relative z-10 leading-none">
                <span className="relative inline-block">
                  ARYAN
                  <div
                    className="absolute -inset-4 bg-white shadow-xl transform -rotate-1 -z-10 rounded-lg"
                    style={{ clipPath: "polygon(5% 0%, 95% 2%, 98% 95%, 2% 98%)" }}
                  />
                </span>
                <br />
                <span className="relative inline-block mt-4">
                  <span className="text-bright-aqua">BADMERA</span>
                  <div
                    className="absolute -inset-4 bg-bright-aqua/20 shadow-lg transform rotate-1 -z-10 rounded-lg"
                    style={{ clipPath: "polygon(2% 5%, 98% 0%, 95% 98%, 0% 95%)" }}
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
              className="bg-white px-8 py-4 shadow-lg transform -rotate-1 rounded-lg relative"
              style={{ clipPath: "polygon(3% 0%, 97% 2%, 100% 97%, 0% 100%)" }}
            >
              <p className="text-2xl md:text-3xl text-gray-700 font-light">
                Software Developer & <span className="text-deep-violet font-semibold">Cognitive Pyschologist</span>
              </p>
              <div className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/10 -z-10 rounded-lg transform rotate-1" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="relative inline-block">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 relative z-10">My Mission</h2>
              <div
                className="absolute -inset-6 bg-bright-aqua/30 shadow-md transform rotate-2 -z-10 rounded-2xl"
                style={{ clipPath: "polygon(5% 0%, 100% 5%, 95% 100%, 0% 95%)" }}
              />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Innovative Development",
                description:
                  "Building cutting-edge applications with modern technologies and creative problem-solving approaches.",
                color: "bright-aqua",
              },
              {
                icon: Heart,
                title: "Passionate Learning",
                description:
                  "Continuously exploring blockchain, AI/ML, and emerging technologies to stay at the forefront of innovation.",
                color: "deep-violet",
              },
              {
                icon: Lightbulb,
                title: "Real-World Impact",
                description:
                  "Creating solutions that make a meaningful difference in people's lives and contribute to technological advancement.",
                color: "bright-aqua",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Paper Card with Torn Edges */}
                <div
                  className="bg-white p-8 shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                  style={{
                    clipPath: "polygon(2% 0%, 98% 3%, 97% 97%, 3% 100%)",
                    borderRadius: "20px",
                  }}
                >
                  {/* Icon Background */}
                  <div
                    className={`w-16 h-16 bg-${item.color}/20 rounded-full flex items-center justify-center mb-6 transform -rotate-3 shadow-md`}
                  >
                    <item.icon
                      className={`text-${item.color === "bright-aqua" ? "bright-aqua" : "deep-violet"}`}
                      size={32}
                    />
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>

                  {/* Shadow Layer */}
                  <div
                    className={`absolute -bottom-2 -right-2 w-full h-full bg-${item.color}/10 -z-10 transform rotate-1`}
                    style={{
                      clipPath: "polygon(2% 0%, 98% 3%, 97% 97%, 3% 100%)",
                      borderRadius: "20px",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
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
              className="bg-deep-violet/20 p-12 shadow-2xl transform -rotate-1 rounded-3xl relative overflow-hidden"
              style={{ clipPath: "polygon(3% 0%, 97% 2%, 100% 97%, 0% 98%)" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Ready to Build Something Amazing?</h2>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Let's collaborate on innovative projects that push the boundaries of technology and creativity.
              </p>

              {/* Sticky Note Style Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <div className="relative">
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
                </div>

                <Link href="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group"
                  >
                    <Button
                      variant="outline"
                      className="bg-white border-2 border-deep-violet text-deep-violet hover:bg-deep-violet hover:text-black px-8 py-4 text-lg font-bold shadow-lg transform rotate-1 rounded-xl relative z-10"
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
              </div>

              {/* Background Shadow */}
              <div
                className="absolute -bottom-3 -right-3 w-full h-full bg-deep-violet/10 -z-10 transform rotate-1 rounded-3xl"
                style={{ clipPath: "polygon(3% 0%, 97% 2%, 100% 97%, 0% 98%)" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Playful Math Paper Cutout - Positioned at left margin */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          whileHover={{ scale: 1.1, rotate: -8 }}
          className="absolute bottom-8 left-5 pointer-events-none z-20"
        >
          <div
            className="bg-white p-4 shadow-xl transform -rotate-12 relative"
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
                className="text-gray-800 font-bold text-xl transform -rotate-3"
                style={{
                  fontFamily: "'Kalam', cursive, 'Comic Sans MS', sans-serif",
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
      </section>

      {/* Footer - Stacked Paper Sheets */}
      <footer className="relative z-10 mt-20">
        <div className="relative">
          {/* Multiple Paper Layers */}
          <div
            className="bg-white shadow-lg transform rotate-1 h-16 mx-4"
            style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 100%, 1% 99%)" }}
          />
          <div
            className="bg-soft-lavender shadow-md transform -rotate-1 h-12 mx-8 -mt-8"
            style={{ clipPath: "polygon(1% 0%, 99% 2%, 98% 100%, 2% 98%)" }}
          />
          <div
            className="bg-bright-aqua/20 shadow-sm transform rotate-2 h-8 mx-12 -mt-6"
            style={{ clipPath: "polygon(3% 0%, 97% 3%, 96% 100%, 4% 97%)" }}
          />

          {/* Footer Content */}
          <div
            className="bg-gray-800 text-white py-8 px-4 transform -rotate-1 shadow-2xl"
            style={{ clipPath: "polygon(1% 0%, 99% 1%, 98% 100%, 2% 99%)" }}
          >
            <div className="max-w-6xl mx-auto text-center transform rotate-1">
              <p className="text-gray-300">
                © {new Date().getFullYear()} Aryan Badmera. Crafted with passion and paper-inspired creativity.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
