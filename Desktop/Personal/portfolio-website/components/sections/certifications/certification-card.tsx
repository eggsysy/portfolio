"use client"

import { motion } from "framer-motion"
import { ExternalLink, CheckCircle, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Certification {
  title: string
  issuer: string
  date: string
  status: string
  description: string
  logo: string
  credentialId: string
  skills: string[]
}

interface CertificationCardProps {
  cert: Certification
  index: number
}

export const CertificationCard = ({ cert, index }: CertificationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02, rotate: 1 }}
      className="group"
    >
      <Card
        className="bg-white dark:bg-gray-900 border-0 dark:border dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden transform group-hover:-rotate-1"
        style={{ clipPath: "polygon(2% 0%, 98% 2%, 97% 98%, 3% 100%)", borderRadius: "20px" }}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className="w-16 h-16 bg-soft-lavender dark:bg-gray-700 rounded-lg flex items-center justify-center p-2 transform -rotate-2 shadow-sm"
                style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
              >
                <Image
                  src={cert.logo || "/placeholder.svg"}
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
          <CardTitle className="text-xl text-gray-900 dark:text-gray-100 group-hover:text-bright-aqua transition-colors">
            {cert.title}
          </CardTitle>
          <p className="text-deep-violet font-medium">{cert.issuer}</p>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
            <Calendar className="mr-2" size={16} />
            <span>Issued {cert.date}</span>
          </div>

          <p className="text-gray-700 dark:text-gray-400 mb-4 text-sm leading-relaxed">{cert.description}</p>

          <div className="mb-4">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Credential ID:</p>
            <div
              className="bg-soft-lavender dark:bg-gray-700 px-3 py-2 rounded-lg transform -rotate-1 shadow-sm relative"
              style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
            >
              <code className="text-xs text-deep-violet font-mono">{cert.credentialId}</code>
              <div
                className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/10 -z-10 transform rotate-1 rounded-lg"
                style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
              />
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Skills Validated:</p>
            <div className="flex flex-wrap gap-1">
              {cert.skills.map((skill, skillIndex) => (
                <Badge
                  key={skillIndex}
                  variant="secondary"
                  className="text-xs bg-soft-lavender text-gray-700 hover:bg-bright-aqua hover:text-black transition-colors transform hover:rotate-1 shadow-sm"
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
              className="w-full border-deep-violet text-deep-violet hover:bg-deep-violet hover:text-black transition-all duration-300 bg-transparent shadow-lg transform -rotate-1 relative"
              style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
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
  )
}
