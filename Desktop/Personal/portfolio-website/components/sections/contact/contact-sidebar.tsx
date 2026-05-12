"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"
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

export const ContactSidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="space-y-8"
    >
      {/* Contact Details */}
      <Card
        className="bg-white dark:bg-gray-900 border-0 dark:border dark:border-gray-700/50 shadow-lg backdrop-blur-sm relative overflow-hidden transform hover:rotate-1 transition-all duration-300"
        style={{ clipPath: "polygon(3% 0%, 97% 3%, 98% 97%, 2% 100%)", borderRadius: "20px" }}
      >
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">Contact Information</CardTitle>
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
              className="flex items-center space-x-4 p-4 rounded-xl bg-soft-lavender/30 dark:bg-gray-800/50 hover:bg-soft-lavender/50 dark:hover:bg-gray-700/60 transition-all duration-300 group relative"
              style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-bright-aqua to-deep-violet rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md transform -rotate-2">
                <info.icon className="text-white" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{info.label}</p>
                <p className="text-gray-900 dark:text-gray-100 font-medium group-hover:text-bright-aqua transition-colors">
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
        className="bg-white dark:bg-gray-900 border-0 dark:border dark:border-gray-700/50 shadow-lg backdrop-blur-sm relative overflow-hidden transform hover:-rotate-1 transition-all duration-300"
        style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 98%, 1% 100%)", borderRadius: "20px" }}
      >
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">Connect With Me</CardTitle>
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
                className={`w-14 h-14 bg-soft-lavender/30 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 transition-all duration-300 ${social.color} hover:bg-soft-lavender/50 dark:hover:bg-gray-700 shadow-md transform relative`}
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
          <p className="text-gray-600 dark:text-gray-400 text-sm">
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
        className="bg-white dark:bg-gray-900 border-0 dark:border dark:border-gray-700/50 shadow-lg backdrop-blur-sm relative overflow-hidden transform hover:rotate-1 transition-all duration-300"
        style={{ clipPath: "polygon(1% 0%, 99% 2%, 98% 98%, 2% 100%)", borderRadius: "20px" }}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
            <p className="text-gray-900 dark:text-gray-100 font-semibold">Available for collaborations</p>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
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
  )
}
