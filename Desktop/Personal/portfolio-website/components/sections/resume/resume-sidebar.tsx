"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const skills = {
  "Programming Languages": ["Python", "C/C++", "Java", "R", "Solidity", "SQLPlus"],
  "Web Technologies": ["HTML", "CSS", "JavaScript", "React"],
  "AI/ML": ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "LSTM", "Regression Models"],
  "Tools & Platforms": ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Oracle Cloud"],
  Others: ["Data Structures & Algorithms", "Problem Solving", "OOPs Concepts"],
}

export const ResumeSidebar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Contact Info */}
      <Card
        className="bg-white dark:bg-gray-900 border-0 dark:border dark:border-gray-700/50 shadow-lg relative overflow-hidden transform hover:-rotate-1 transition-all duration-300"
        style={{ clipPath: "polygon(3% 0%, 97% 2%, 98% 97%, 2% 100%)", borderRadius: "15px" }}
      >
        <CardHeader>
          <CardTitle className="text-deep-violet flex items-center">
            <div className="w-8 h-8 bg-deep-violet/20 rounded-full flex items-center justify-center mr-3 transform -rotate-3">
              <Mail size={16} className="text-deep-violet" />
            </div>
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Mail className="mr-3 text-bright-aqua" size={18} />
            <span>aryanbadmera@gmail.com</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <Phone className="mr-3 text-bright-aqua" size={18} />
            <span>+91 7709769481</span>
          </div>
          <div className="flex items-center text-gray-700 dark:text-gray-300">
            <MapPin className="mr-3 text-bright-aqua" size={18} />
            <span>Nagpur, Maharashtra</span>
          </div>
        </CardContent>
        <div
          className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/10 -z-10 transform rotate-1"
          style={{ clipPath: "polygon(3% 0%, 97% 2%, 98% 97%, 2% 100%)", borderRadius: "15px" }}
        />
      </Card>

      {/* About Me */}
      <Card
        className="bg-white dark:bg-gray-900 border-0 dark:border dark:border-gray-700/50 shadow-lg relative overflow-hidden transform hover:rotate-1 transition-all duration-300"
        style={{ clipPath: "polygon(2% 0%, 98% 3%, 97% 97%, 3% 100%)", borderRadius: "15px" }}
      >
        <CardHeader>
          <CardTitle className="text-deep-violet">About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Enthusiastic and determined B.Tech Computer Science student with a strong interest in{" "}
            <span className="text-bright-aqua font-semibold">blockchain technology</span> and{" "}
            <span className="text-deep-violet font-semibold">decentralized systems</span>. Passionate about
            learning new technologies and building practical, real-world solutions.
          </p>
        </CardContent>
        <div
          className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/10 -z-10 transform -rotate-1"
          style={{ clipPath: "polygon(2% 0%, 98% 3%, 97% 97%, 3% 100%)", borderRadius: "15px" }}
        />
      </Card>

      {/* Skills */}
      <Card
        className="bg-white dark:bg-gray-900 border-0 dark:border dark:border-gray-700/50 shadow-lg relative overflow-hidden transform hover:-rotate-1 transition-all duration-300"
        style={{ clipPath: "polygon(1% 0%, 99% 1%, 98% 99%, 2% 100%)", borderRadius: "15px" }}
      >
        <CardHeader>
          <CardTitle className="text-deep-violet">Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(skills).map(([category, skillList], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="text-sm font-semibold text-bright-aqua mb-2">{category}:</h4>
              <div className="flex flex-wrap gap-1">
                {skillList.map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    variant="secondary"
                    className="text-xs bg-soft-lavender dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-bright-aqua hover:text-black transition-colors transform hover:-rotate-1 shadow-sm"
                    style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </CardContent>
        <div
          className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/10 -z-10 transform rotate-1"
          style={{ clipPath: "polygon(1% 0%, 99% 1%, 98% 99%, 2% 100%)", borderRadius: "15px" }}
        />
      </Card>
    </motion.div>
  )
}
