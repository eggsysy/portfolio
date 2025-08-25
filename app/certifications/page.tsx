"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ExternalLink, Calendar, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Certificate } from "@/lib/types"

export default function CertificationsPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      const response = await fetch("/api/certificates")
      const data = await response.json()
      if (data.success) {
        setCertificates(data.certificates)
      }
    } catch (error) {
      console.error("Failed to fetch certificates:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-soft-lavender pt-20 pb-16 relative overflow-hidden">
      {/* Floating Paper Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ x: -35, rotate: -10 }}
          animate={{ x: 0, rotate: -4 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-28 -left-16 w-60 h-44 bg-white rounded-2xl shadow-lg transform rotate-12 opacity-50"
          style={{ clipPath: "polygon(6% 0%, 94% 4%, 96% 94%, 4% 100%)" }}
        />

        <motion.div
          initial={{ y: -35, rotate: 12 }}
          animate={{ y: 0, rotate: 7 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
          className="absolute top-80 -right-20 w-68 h-68 bg-bright-aqua/20 rounded-full shadow-md transform -rotate-10"
        />

        <motion.div
          initial={{ x: 35, rotate: -14 }}
          animate={{ x: 0, rotate: -8 }}
          transition={{ duration: 2.2, ease: "easeOut", delay: 0.6 }}
          className="absolute bottom-36 left-10 w-52 h-64 bg-deep-violet/20 shadow-lg transform rotate-15"
          style={{ clipPath: "polygon(7% 0%, 93% 6%, 94% 93%, 6% 98%)", borderRadius: "25px" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                Certifications
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
                Professional certifications that validate my expertise in cutting-edge technologies, particularly in{" "}
                <span className="text-bright-aqua font-semibold">AI</span> and{" "}
                <span className="text-deep-violet font-semibold">cloud platforms</span>.
              </p>
              <div className="absolute -bottom-2 -right-2 w-full h-full bg-bright-aqua/10 -z-10 rounded-xl transform -rotate-1" />
            </div>
          </motion.div>
        </motion.div>

        {/* Certifications Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600">Loading certificates...</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02, rotate: 1 }}
                className="group"
              >
                <Card
                  className="bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden transform group-hover:-rotate-1"
                  style={{ clipPath: "polygon(2% 0%, 98% 2%, 97% 98%, 3% 100%)", borderRadius: "20px" }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-16 h-16 bg-soft-lavender rounded-lg flex items-center justify-center p-2 transform -rotate-2 shadow-sm"
                          style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                        >
                          <Image
                            src={"/ceholder-svg-key-mwlqd.png?key=mwlqd&height=48&width=48"}
                            alt={`${cert.issuer} logo`}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <Badge
                            className={`${cert.status === "Active" ? "bg-green-600" : "bg-yellow-600"} text-white transform rotate-1 shadow-sm`}
                            style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                          >
                            <CheckCircle className="mr-1" size={12} />
                            {cert.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-gray-900 group-hover:text-bright-aqua transition-colors">
                      {cert.title}
                    </CardTitle>
                    <p className="text-deep-violet font-medium">{cert.issuer}</p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="mr-2" size={16} />
                      <span>Issued {cert.date}</span>
                    </div>

                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">{cert.description}</p>

                    {cert.credentialId && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-600 mb-2">Credential ID:</p>
                        <div
                          className="bg-soft-lavender px-3 py-2 rounded-lg transform -rotate-1 shadow-sm relative"
                          style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
                        >
                          <code className="text-xs text-deep-violet font-mono">{cert.credentialId}</code>
                          <div
                            className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/10 -z-10 transform rotate-1 rounded-lg"
                            style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-900 mb-2">Skills Validated:</p>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="text-xs bg-soft-lavender text-gray-700 hover:bg-bright-aqua hover:text-white transition-colors transform hover:rotate-1 shadow-sm"
                            style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.05, rotate: 2 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-deep-violet text-deep-violet hover:bg-deep-violet hover:text-white transition-all duration-300 bg-transparent shadow-lg transform -rotate-1 relative"
                        style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                        onClick={() => cert.fileUrl && window.open(cert.fileUrl, "_blank")}
                      >
                        <ExternalLink className="mr-2" size={16} />
                        View Certificate
                        <div
                          className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/20 -z-10 transform rotate-1"
                          style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                        />
                      </Button>
                    </motion.div>
                  </CardContent>

                  {/* Card Shadow */}
                  <div
                    className="absolute -bottom-2 -right-2 w-full h-full bg-bright-aqua/10 -z-10 transform rotate-1"
                    style={{ clipPath: "polygon(2% 0%, 98% 2%, 97% 98%, 3% 100%)", borderRadius: "20px" }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Future Goals Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mb-16"
        >
          <Card
            className="bg-white border-0 shadow-xl max-w-4xl mx-auto relative overflow-hidden transform hover:-rotate-1 transition-all duration-300"
            style={{ clipPath: "polygon(3% 0%, 97% 2%, 98% 97%, 2% 100%)", borderRadius: "25px" }}
          >
            <CardContent className="p-8">
              <div className="relative inline-block mb-6">
                <h2 className="text-3xl font-bold text-gray-900 relative z-10">Continuous Learning Journey</h2>
                <div
                  className="absolute -inset-4 bg-bright-aqua/20 shadow-md transform rotate-1 -z-10 rounded-xl"
                  style={{ clipPath: "polygon(5% 0%, 100% 3%, 95% 100%, 0% 97%)" }}
                />
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
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
                    <p className="text-gray-700">Advanced Blockchain Development</p>
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
                    <p className="text-gray-700">AWS Cloud Practitioner</p>
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
                    <p className="text-gray-700">AI/ML & Web3 Technologies</p>
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

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <motion.div whileHover={{ scale: 1.05, rotate: 1 }}>
              <div
                className="bg-white border-0 shadow-lg rounded-2xl p-6 relative transform -rotate-1"
                style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
              >
                <div className="text-3xl font-bold text-bright-aqua mb-2">{certificates.length}</div>
                <p className="text-gray-700">Professional Certifications</p>
                <div
                  className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/10 -z-10 transform rotate-1 rounded-2xl"
                  style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                />
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, rotate: -1 }}>
              <div
                className="bg-white border-0 shadow-lg rounded-2xl p-6 relative transform rotate-1"
                style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
              >
                <div className="text-3xl font-bold text-deep-violet mb-2">AI/ML</div>
                <p className="text-gray-700">Specialization Focus</p>
                <div
                  className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/10 -z-10 transform -rotate-1 rounded-2xl"
                  style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
                />
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, rotate: 1 }}>
              <div
                className="bg-white border-0 shadow-lg rounded-2xl p-6 relative transform -rotate-1"
                style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
              >
                <div className="text-3xl font-bold text-bright-aqua mb-2">2024</div>
                <p className="text-gray-700">Latest Certification</p>
                <div
                  className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/10 -z-10 transform rotate-1 rounded-2xl"
                  style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
