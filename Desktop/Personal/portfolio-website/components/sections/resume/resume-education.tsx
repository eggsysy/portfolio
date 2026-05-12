"use client"

import { motion } from "framer-motion"
import { GraduationCap, Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const education = [
  {
    degree: "BTech in Computer Science",
    school: "Vellore Institute of Technology",
    location: "Vellore, Tamil Nadu",
    period: "2023 - 2027",
    status: "Currently in 3rd Year (6th Semester)",
    cgpa: "9.1",
  },
  {
    degree: "12th Board (TSBIE)",
    school: "Narayana Junior College",
    location: "Nagpur, Maharashtra",
    period: "2023",
    percentage: "97.9%",
  },
  {
    degree: "10th Board (CBSE)",
    school: "St. Aloysius English Medium School",
    location: "Nagpur, Maharashtra",
    period: "2021",
    percentage: "97.2%",
  },
]

export const ResumeEducation = () => {
  return (
    <section>
      <div className="text-center mb-8">
        <div className="relative inline-block">
          <h2 className="text-3xl font-bold text-gray-800 relative z-10 flex items-center">
            <div className="w-10 h-10 bg-bright-aqua/20 rounded-full flex items-center justify-center mr-3 transform -rotate-3">
              <GraduationCap className="text-bright-aqua" size={24} />
            </div>
            Education
          </h2>
          <div
            className="absolute -inset-4 bg-bright-aqua/20 shadow-md transform rotate-1 -z-10 rounded-xl"
            style={{ clipPath: "polygon(5% 0%, 100% 3%, 95% 100%, 0% 97%)" }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, rotate: 1 }}
          >
            <Card
              className="bg-white dark:bg-gray-900 border-0 dark:border dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden transform hover:-rotate-1"
              style={{ clipPath: "polygon(2% 0%, 98% 2%, 97% 98%, 3% 100%)", borderRadius: "15px" }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{edu.degree}</h3>
                    <p className="text-deep-violet font-medium mb-2">{edu.school}</p>
                    {edu.status && <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{edu.status}</p>}
                    <div className="flex items-center gap-4">
                      {edu.cgpa && (
                        <Badge
                          className="bg-green-600 text-white transform -rotate-1 shadow-sm"
                          style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                        >
                          CGPA: {edu.cgpa}
                        </Badge>
                      )}
                      {edu.percentage && (
                        <Badge
                          className="bg-bright-aqua text-white transform rotate-1 shadow-sm"
                          style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
                        >
                          {edu.percentage}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                      <Calendar className="mr-1" size={16} />
                      {edu.period}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin className="mr-1" size={16} />
                      {edu.location}
                    </div>
                  </div>
                </div>
              </CardContent>
              <div
                className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/10 -z-10 transform rotate-1"
                style={{ clipPath: "polygon(2% 0%, 98% 2%, 97% 98%, 3% 100%)", borderRadius: "15px" }}
              />
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
