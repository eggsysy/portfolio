"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "aryanbadmera@gmail.com",
    href: "mailto:aryanbadmera@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7709769481",
    href: "tel:+917709769481",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Nagpur, Maharashtra",
    href: "https://maps.google.com",
  },
]

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/eggsysy",
    color: "hover:text-bright-aqua",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com",
    color: "hover:text-deep-violet",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "https://twitter.com",
    color: "hover:text-bright-aqua",
  },
]

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted")
  }

  return (
    <div className="min-h-screen bg-soft-lavender pt-20 pb-16 relative overflow-hidden">
      {/* Floating Paper Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ x: -30, rotate: -8 }}
          animate={{ x: 0, rotate: -3 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-32 -left-12 w-56 h-40 bg-white rounded-2xl shadow-lg transform rotate-10 opacity-40"
          style={{ clipPath: "polygon(6% 0%, 94% 4%, 96% 94%, 4% 100%)" }}
        />

        <motion.div
          initial={{ y: -30, rotate: 10 }}
          animate={{ y: 0, rotate: 5 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          className="absolute top-80 -right-16 w-64 h-64 bg-bright-aqua/20 rounded-full shadow-md transform -rotate-8"
        />

        <motion.div
          initial={{ x: 30, rotate: -12 }}
          animate={{ x: 0, rotate: -6 }}
          transition={{ duration: 2.2, ease: "easeOut", delay: 0.6 }}
          className="absolute bottom-40 left-8 w-48 h-60 bg-deep-violet/20 shadow-lg transform rotate-12"
          style={{ clipPath: "polygon(8% 0%, 92% 6%, 94% 92%, 6% 98%)", borderRadius: "25px" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Paper Cut-out Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-8">
            <h1 className="text-5xl md:text-7xl font-black text-gray-800 relative z-10">
              <span className="relative inline-block">
                Get In Touch
                <div
                  className="absolute -inset-6 bg-white shadow-xl transform -rotate-2 -z-10 rounded-2xl"
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
              className="bg-white px-8 py-6 shadow-lg transform rotate-1 rounded-xl relative"
              style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 98%, 1% 100%)" }}
            >
              <p className="text-xl text-gray-700 leading-relaxed">
                Ready to collaborate on innovative projects? Let's connect and build something amazing together. I'm
                always excited to discuss new opportunities in{" "}
                <span className="text-bright-aqua font-semibold">blockchain</span>,{" "}
                <span className="text-deep-violet font-semibold">AI/ML</span>, and software development.
              </p>
              <div className="absolute -bottom-2 -right-2 w-full h-full bg-bright-aqua/10 -z-10 rounded-xl transform -rotate-1" />
            </div>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card
              className="bg-white border-0 shadow-lg backdrop-blur-sm relative overflow-hidden transform hover:-rotate-1 transition-all duration-300"
              style={{ clipPath: "polygon(2% 0%, 98% 2%, 97% 98%, 3% 100%)", borderRadius: "20px" }}
            >
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 flex items-center">
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
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        type="text"
                        required
                        className="bg-soft-lavender/30 border-soft-lavender text-gray-900 focus:border-bright-aqua focus:ring-bright-aqua rounded-lg shadow-sm"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        type="text"
                        required
                        className="bg-soft-lavender/30 border-soft-lavender text-gray-900 focus:border-bright-aqua focus:ring-bright-aqua rounded-lg shadow-sm"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="bg-soft-lavender/30 border-soft-lavender text-gray-900 focus:border-bright-aqua focus:ring-bright-aqua rounded-lg shadow-sm"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      required
                      className="bg-soft-lavender/30 border-soft-lavender text-gray-900 focus:border-bright-aqua focus:ring-bright-aqua rounded-lg shadow-sm"
                      placeholder="Project Collaboration"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      className="bg-soft-lavender/30 border-soft-lavender text-gray-900 focus:border-bright-aqua focus:ring-bright-aqua resize-none rounded-lg shadow-sm"
                      placeholder="Tell me about your project or collaboration idea..."
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.05, rotate: 2 }}>
                    <Button
                      type="submit"
                      className="w-full bg-bright-aqua hover:bg-bright-aqua/90 text-black py-4 rounded-xl font-semibold transition-all duration-300 transform shadow-lg relative"
                      style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
                    >
                      <Send className="mr-2" size={20} />
                      Send Message
                      <div
                        className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/40 -z-10 transform rotate-1 rounded-xl"
                        style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
                      />
                    </Button>
                  </motion.div>
                </form>
              </CardContent>

              {/* Card Shadow */}
              <div
                className="absolute -bottom-2 -right-2 w-full h-full bg-bright-aqua/10 -z-10 transform rotate-1"
                style={{ clipPath: "polygon(2% 0%, 98% 2%, 97% 98%, 3% 100%)", borderRadius: "20px" }}
              />
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <Card
              className="bg-white border-0 shadow-lg backdrop-blur-sm relative overflow-hidden transform hover:rotate-1 transition-all duration-300"
              style={{ clipPath: "polygon(3% 0%, 97% 3%, 98% 97%, 2% 100%)", borderRadius: "20px" }}
            >
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-soft-lavender/30 hover:bg-soft-lavender/50 transition-all duration-300 group relative"
                    style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-bright-aqua to-deep-violet rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md transform -rotate-2">
                      <info.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{info.label}</p>
                      <p className="text-gray-900 font-medium group-hover:text-bright-aqua transition-colors">
                        {info.value}
                      </p>
                    </div>
                    {/* Hover Shadow */}
                    <div
                      className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/10 -z-10 transform rotate-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
                    />
                  </motion.a>
                ))}
              </CardContent>

              {/* Card Shadow */}
              <div
                className="absolute -bottom-2 -right-2 w-full h-full bg-deep-violet/10 -z-10 transform -rotate-1"
                style={{ clipPath: "polygon(3% 0%, 97% 3%, 98% 97%, 2% 100%)", borderRadius: "20px" }}
              />
            </Card>

            {/* Social Links */}
            <Card
              className="bg-white border-0 shadow-lg backdrop-blur-sm relative overflow-hidden transform hover:-rotate-1 transition-all duration-300"
              style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 98%, 1% 100%)", borderRadius: "20px" }}
            >
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-14 h-14 bg-soft-lavender/30 rounded-xl flex items-center justify-center text-gray-600 transition-all duration-300 ${social.color} hover:bg-soft-lavender/50 shadow-md transform relative`}
                      style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                    >
                      <social.icon size={24} />
                      <div
                        className="absolute -bottom-1 -right-1 w-full h-full bg-gray-200 -z-10 transform rotate-2 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                        style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                      />
                    </motion.a>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">
                  Follow me on social media for updates on my latest projects and tech insights.
                </p>
              </CardContent>

              {/* Card Shadow */}
              <div
                className="absolute -bottom-2 -right-2 w-full h-full bg-bright-aqua/10 -z-10 transform rotate-1"
                style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 98%, 1% 100%)", borderRadius: "20px" }}
              />
            </Card>

            {/* Availability */}
            <Card
              className="bg-white border-0 shadow-lg backdrop-blur-sm relative overflow-hidden transform hover:rotate-1 transition-all duration-300"
              style={{ clipPath: "polygon(1% 0%, 99% 2%, 98% 98%, 2% 100%)", borderRadius: "20px" }}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
                  <p className="text-gray-900 font-semibold">Available for collaborations</p>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  I'm currently open to exciting project collaborations, internship opportunities, and discussions about{" "}
                  <span className="text-bright-aqua font-medium">blockchain technology</span>,{" "}
                  <span className="text-deep-violet font-medium">AI/ML</span>, and innovative software solutions.
                </p>
              </CardContent>

              {/* Card Shadow */}
              <div
                className="absolute -bottom-2 -right-2 w-full h-full bg-green-100 -z-10 transform -rotate-1"
                style={{ clipPath: "polygon(1% 0%, 99% 2%, 98% 98%, 2% 100%)", borderRadius: "20px" }}
              />
            </Card>
          </motion.div>
        </div>

        {/* Footer with Stacked Paper Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20 relative"
        >
          {/* Multiple Paper Layers */}
          <div className="relative">
            <div
              className="bg-white shadow-md transform rotate-1 h-12 mx-8"
              style={{ clipPath: "polygon(3% 0%, 97% 2%, 99% 98%, 1% 100%)" }}
            />
            <div
              className="bg-soft-lavender shadow-sm transform -rotate-1 h-8 mx-12 -mt-6"
              style={{ clipPath: "polygon(2% 0%, 98% 3%, 96% 97%, 4% 100%)" }}
            />
            <div
              className="bg-bright-aqua/20 shadow-sm transform rotate-2 h-6 mx-16 -mt-4"
              style={{ clipPath: "polygon(4% 0%, 96% 4%, 94% 96%, 6% 100%)" }}
            />

            {/* Footer Content */}
            <div
              className="bg-gray-800 text-white py-6 px-4 transform -rotate-1 shadow-xl relative"
              style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 99%, 1% 100%)" }}
            >
              <div className="max-w-6xl mx-auto text-center transform rotate-1">
                <p className="text-gray-300">
                  © {new Date().getFullYear()} Aryan Badmera. Crafted with passion and paper-inspired creativity.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
