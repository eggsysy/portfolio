"use client"

import { motion } from "framer-motion"
import { Download, MapPin, Mail, Phone, Calendar, Award, Briefcase, GraduationCap, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const education = [
  {
    degree: "BTech in Computer Science",
    school: "Vellore Institute of Technology",
    location: "Vellore, Tamil Nadu",
    period: "2023 - 2027",
    status: "Currently in 3rd Year (5th Semester)",
    cgpa: "9.12",
  },
  {
    degree: "12th Board (TSBIE)",
    school: "St. Aloysius English Medium School",
    location: "Nagpur, Maharashtra",
    period: "2023",
    percentage: "97.1%",
  },
  {
    degree: "10th Board (CBSE)",
    school: "St. Aloysius English Medium School",
    location: "Nagpur, Maharashtra",
    period: "2021",
    percentage: "97.2%",
  },
]

const projects = [
  {
    title: "Smash and Dash",
    description:
      "A 3D arcade-style game inspired by Crossy Road, where players navigate tanks through dynamic obstacles. Developed using TypeScript, Node.js with custom models and gameplay mechanics.",
    technologies: ["TypeScript", "Node.js", "3D Graphics"],
    githubUrl: "https://github.com/eggsysy/PocketTonk",
  },
  {
    title: "Stock Market Trend Prediction",
    description:
      "Developed a machine learning model to predict stock market trends using historical data and technical indicators. Applied KAN based LSTM algorithms. Authored a research paper detailing the methodology and findings.",
    technologies: ["Python", "LSTM", "Machine Learning", "Research"],
    githubUrl: "https://github.com/eggsysy/Stat-a-thon",
  },
]

const certifications = [
  {
    title: "Oracle Certified - Gen AI Professional",
    issuer: "Oracle",
    description:
      "Completed a professional course covering foundational and advanced concepts of generative AI, including practical applications and ethical considerations.",
  },
]

const skills = {
  "Programming Languages": ["Python", "C/C++", "Java", "R"],
  "Web Technologies": ["HTML", "CSS", "JavaScript", "React"],
  "AI/ML": ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "LSTM", "Regression Models"],
  "Tools & Platforms": ["Git", "GitHub", "VS Code", "Jupyter Notebook", "Oracle Cloud"],
  Others: ["Data Structures & Algorithms", "Problem Solving", "OOPs Concepts"],
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ARYAN BADMERA
          </h1>
          <p className="text-xl text-slate-300 mb-6">Software Developer</p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105">
            <Download className="mr-2" size={20} />
            Download PDF
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Contact & About */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Contact Info */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-blue-400">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-slate-300">
                  <Mail className="mr-3 text-blue-400" size={18} />
                  <span>aryanbadmera@gmail.com</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <Phone className="mr-3 text-blue-400" size={18} />
                  <span>+91 7709769481</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <MapPin className="mr-3 text-blue-400" size={18} />
                  <span>Nagpur, Maharashtra</span>
                </div>
              </CardContent>
            </Card>

            {/* About Me */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-blue-400">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed">
                  Enthusiastic and determined B.Tech Computer Science student with a strong interest in blockchain
                  technology and decentralized systems. Passionate about learning new technologies and building
                  practical, real-world solutions.
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-blue-400">Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(skills).map(([category, skillList], index) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h4 className="text-sm font-semibold text-purple-400 mb-2">{category}:</h4>
                    <div className="flex flex-wrap gap-1">
                      {skillList.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="text-xs bg-slate-700 text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Education, Projects & Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Education */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-slate-100 flex items-center">
                <GraduationCap className="mr-3 text-blue-400" />
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-slate-100 mb-1">{edu.degree}</h3>
                            <p className="text-purple-400 font-medium mb-2">{edu.school}</p>
                            {edu.status && <p className="text-slate-400 text-sm mb-1">{edu.status}</p>}
                            <div className="flex items-center gap-4">
                              {edu.cgpa && <Badge className="bg-green-600 text-white">CGPA: {edu.cgpa}</Badge>}
                              {edu.percentage && <Badge className="bg-blue-600 text-white">{edu.percentage}</Badge>}
                            </div>
                          </div>
                          <div className="text-right mt-2 md:mt-0">
                            <div className="flex items-center text-slate-400 mb-1">
                              <Calendar className="mr-1" size={16} />
                              {edu.period}
                            </div>
                            <div className="flex items-center text-slate-400">
                              <MapPin className="mr-1" size={16} />
                              {edu.location}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-slate-100 flex items-center">
                <Briefcase className="mr-3 text-blue-400" />
                Projects
              </h2>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-semibold text-slate-100">{project.title}</h3>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-600 text-slate-300 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300 bg-transparent"
                            onClick={() => window.open(project.githubUrl, "_blank")}
                          >
                            <Github className="mr-1" size={14} />
                            GitHub
                          </Button>
                        </div>
                        <p className="text-slate-300 mb-4 leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="secondary"
                              className="bg-slate-700 text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-slate-100 flex items-center">
                <Award className="mr-3 text-blue-400" />
                Certifications
              </h2>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-slate-100 mb-1">{cert.title}</h3>
                        <p className="text-purple-400 font-medium mb-3">{cert.issuer}</p>
                        <p className="text-slate-300 leading-relaxed">{cert.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
