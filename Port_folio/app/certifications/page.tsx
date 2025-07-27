"use client"

import { motion } from "framer-motion"
import { ExternalLink, Calendar, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const certifications = [
  {
    title: "Oracle Certified - Gen AI Professional",
    issuer: "Oracle",
    date: "2024",
    status: "Active",
    description:
      "Completed a professional course by Oracle covering foundational and advanced concepts of generative AI, including practical applications and ethical considerations.",
    logo: "/placeholder.svg?height=60&width=60",
    credentialId: "ORACLE-GENAI-2024-001",
    skills: ["Generative AI", "Machine Learning", "AI Ethics", "Practical Applications", "Oracle Cloud"],
  },
]

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Certifications
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Professional certifications that validate my expertise in cutting-edge technologies, particularly in AI and
            cloud platforms.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 h-full hover:shadow-lg hover:shadow-blue-500/10">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center p-2">
                        <Image
                          src={cert.logo || "/placeholder.svg"}
                          alt={`${cert.issuer} logo`}
                          width={48}
                          height={48}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <Badge className={`${cert.status === "Active" ? "bg-green-600" : "bg-yellow-600"} text-white`}>
                          <CheckCircle className="mr-1" size={12} />
                          {cert.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-slate-100 group-hover:text-blue-400 transition-colors">
                    {cert.title}
                  </CardTitle>
                  <p className="text-purple-400 font-medium">{cert.issuer}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center text-slate-400 mb-4">
                    <Calendar className="mr-2" size={16} />
                    <span>Issued {cert.date}</span>
                  </div>

                  <p className="text-slate-300 mb-4 text-sm leading-relaxed">{cert.description}</p>

                  <div className="mb-4">
                    <p className="text-xs text-slate-400 mb-2">Credential ID:</p>
                    <code className="text-xs bg-slate-700 px-2 py-1 rounded text-blue-400">{cert.credentialId}</code>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-medium text-slate-300 mb-2">Skills Validated:</p>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="text-xs bg-slate-700 text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-slate-600 text-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 bg-transparent"
                  >
                    <ExternalLink className="mr-2" size={16} />
                    View Certificate
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Future Goals Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16"
        >
          <Card className="bg-slate-800/50 border-slate-700 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Continuous Learning Journey</h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                As a passionate Computer Science student with interests in blockchain technology and decentralized
                systems, I'm continuously expanding my knowledge through professional certifications and hands-on
                projects.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-2">Currently Pursuing</div>
                  <p className="text-slate-300">Advanced Blockchain Development</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-2">Next Goal</div>
                  <p className="text-slate-300">AWS Cloud Practitioner</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-2">Focus Area</div>
                  <p className="text-slate-300">AI/ML & Web3 Technologies</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">{certifications.length}</div>
              <p className="text-slate-300">Professional Certifications</p>
            </div>
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">AI/ML</div>
              <p className="text-slate-300">Specialization Focus</p>
            </div>
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
              <div className="text-3xl font-bold text-green-400 mb-2">2024</div>
              <p className="text-slate-300">Latest Certification</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
