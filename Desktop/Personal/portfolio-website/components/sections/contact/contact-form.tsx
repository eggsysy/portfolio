"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset after some time
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <Card
        className="bg-white dark:bg-gray-900 border-0 dark:border dark:border-gray-700/50 shadow-lg backdrop-blur-sm relative overflow-hidden transform hover:-rotate-1 transition-all duration-300 min-h-[600px] flex flex-col justify-center"
        style={{ clipPath: "polygon(2% 0%, 98% 2%, 97% 98%, 3% 100%)", borderRadius: "20px" }}
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-gray-100 flex items-center">
                  <div className="w-8 h-8 bg-bright-aqua/20 rounded-full flex items-center justify-center mr-3 transform -rotate-3">
                    <Send size={16} className="text-bright-aqua" />
                  </div>
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        type="text"
                        required
                        className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-bright-aqua focus:ring-bright-aqua rounded-lg shadow-sm"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        type="text"
                        required
                        className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-bright-aqua focus:ring-bright-aqua rounded-lg shadow-sm"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-bright-aqua focus:ring-bright-aqua rounded-lg shadow-sm"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      required
                      className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-bright-aqua focus:ring-bright-aqua rounded-lg shadow-sm"
                      placeholder="Project Collaboration"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:border-bright-aqua focus:ring-bright-aqua resize-none rounded-lg shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      placeholder="Tell me about your project or collaboration idea..."
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-bright-aqua hover:bg-bright-aqua/90 text-black py-4 rounded-xl font-semibold transition-all duration-300 transform shadow-lg relative disabled:opacity-50"
                      style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                           <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2" />
                           Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2" size={20} />
                          Send Message
                        </span>
                      )}
                      <div
                        className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/40 -z-10 transform rotate-1 rounded-xl"
                        style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
                      />
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center"
            >
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 transform -rotate-3">
                <CheckCircle2 size={40} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 font-kalam">Message Sent!</h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                Thanks for reaching out, Aryan! I've received your message and will get back to you as soon as possible.
              </p>
              <Button
                variant="outline"
                onClick={() => setIsSubmitted(false)}
                className="border-deep-violet text-deep-violet hover:bg-deep-violet hover:text-white"
              >
                Send Another Message
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card Shadow */}
        <div
          className="absolute -bottom-2 -right-2 w-full h-full bg-bright-aqua/10 -z-10 transform rotate-1"
          style={{ clipPath: "polygon(2% 0%, 98% 2%, 97% 98%, 3% 100%)", borderRadius: "20px" }}
        />
      </Card>
    </motion.div>
  )
}
