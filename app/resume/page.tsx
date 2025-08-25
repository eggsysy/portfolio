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
  const handleDownload = async () => {
    try {
      const response = await fetch("/api/resume/download")
      const data = await response.json()

      if (data.success) {
        // Create a temporary link and trigger download
        const link = document.createElement("a")
        link.href = data.downloadUrl
        link.download = data.fileName
        link.target = "_blank"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        // Fallback to default resume
        const fallbackResponse = await fetch("/api/resume/default")
        if (fallbackResponse.ok) {
          const blob = await fallbackResponse.blob()
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.download = "Aryan_Badmera_Resume.txt"
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)

          alert("Downloaded default resume. Contact admin to upload a PDF resume for better formatting!")
        } else {
          alert("No resume available. Please contact admin to upload a resume.")
        }
      }
    } catch (error) {
      console.error("Download error:", error)
      alert("Failed to download resume. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-soft-lavender pt-20 pb-16 relative overflow-hidden">
      {/* Floating Paper Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ x: -30, rotate: -8 }}
          animate={{ x: 0, rotate: -3 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-24 -left-12 w-48 h-64 bg-white rounded-2xl shadow-lg transform rotate-12 opacity-50"
          style={{ clipPath: "polygon(8% 0%, 92% 5%, 95% 92%, 5% 98%)" }}
        />

        <motion.div
          initial={{ y: -30, rotate: 12 }}
          animate={{ y: 0, rotate: 6 }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.4 }}
          className="absolute top-80 -right-16 w-56 h-56 bg-bright-aqua/20 rounded-full shadow-md transform -rotate-8"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Paper Cut-out Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block mb-6">
            <h1 className="text-5xl md:text-7xl font-black text-gray-800 relative z-10">
              <span className="relative inline-block">
                ARYAN BADMERA
                <div
                  className="absolute -inset-4 bg-white shadow-xl transform -rotate-1 -z-10 rounded-2xl"
                  style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 98%, 1% 100%)" }}
                />
              </span>
            </h1>
          </div>

          {/* Paper Card Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative inline-block mb-8"
          >
            <div
              className="bg-bright-aqua/20 px-6 py-3 shadow-lg transform rotate-1 rounded-lg relative"
              style={{ clipPath: "polygon(3% 0%, 97% 2%, 100% 97%, 0% 100%)" }}
            >
              <p className="text-xl text-gray-700 font-medium">Software Developer</p>
              <div className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/30 -z-10 rounded-lg transform -rotate-1" />
            </div>
          </motion.div>

          {/* Download Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="relative inline-block"
          >
            <Button
              onClick={handleDownload}
              className="bg-bright-aqua hover:bg-bright-aqua/90 text-black px-8 py-4 text-lg font-bold shadow-lg transform -rotate-1 rounded-xl relative z-10 border-0"
              style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
            >
              <Download className="mr-2" size={20} />
              Download PDF
            </Button>
            <div
              className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/40 transform rotate-1 rounded-xl -z-10"
              style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
            />
          </motion.div>
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
            <Card
              className="bg-white border-0 shadow-lg relative overflow-hidden transform hover:-rotate-1 transition-all duration-300"
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
                <div className="flex items-center text-gray-700">
                  <Mail className="mr-3 text-bright-aqua" size={18} />
                  <span>aryanbadmera@gmail.com</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Phone className="mr-3 text-bright-aqua" size={18} />
                  <span>+91 7709769481</span>
                </div>
                <div className="flex items-center text-gray-700">
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
              className="bg-white border-0 shadow-lg relative overflow-hidden transform hover:rotate-1 transition-all duration-300"
              style={{ clipPath: "polygon(2% 0%, 98% 3%, 97% 97%, 3% 100%)", borderRadius: "15px" }}
            >
              <CardHeader>
                <CardTitle className="text-deep-violet">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
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
              className="bg-white border-0 shadow-lg relative overflow-hidden transform hover:-rotate-1 transition-all duration-300"
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
                          className="text-xs bg-soft-lavender text-gray-700 hover:bg-bright-aqua hover:text-white transition-colors transform hover:-rotate-1 shadow-sm"
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

          {/* Right Column - Education, Projects & Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Education */}
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
                      className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden transform hover:-rotate-1"
                      style={{ clipPath: "polygon(2% 0%, 98% 2%, 97% 98%, 3% 100%)", borderRadius: "15px" }}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{edu.degree}</h3>
                            <p className="text-deep-violet font-medium mb-2">{edu.school}</p>
                            {edu.status && <p className="text-gray-600 text-sm mb-1">{edu.status}</p>}
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
                            <div className="flex items-center text-gray-600 mb-1">
                              <Calendar className="mr-1" size={16} />
                              {edu.period}
                            </div>
                            <div className="flex items-center text-gray-600">
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

            {/* Projects */}
            <section>
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <h2 className="text-3xl font-bold text-gray-800 relative z-10 flex items-center">
                    <div className="w-10 h-10 bg-deep-violet/20 rounded-full flex items-center justify-center mr-3 transform rotate-3">
                      <Briefcase className="text-deep-violet" size={24} />
                    </div>
                    Projects
                  </h2>
                  <div
                    className="absolute -inset-4 bg-deep-violet/20 shadow-md transform -rotate-1 -z-10 rounded-xl"
                    style={{ clipPath: "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)" }}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, rotate: 2 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ scale: 1.02, rotate: -1 }}
                  >
                    <Card
                      className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden transform hover:rotate-1"
                      style={{ clipPath: "polygon(3% 0%, 97% 3%, 98% 97%, 2% 100%)", borderRadius: "15px" }}
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                          <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-deep-violet text-deep-violet hover:bg-deep-violet hover:text-white transition-all duration-300 bg-transparent transform -rotate-1 shadow-sm"
                              style={{ clipPath: "polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)" }}
                              onClick={() => window.open(project.githubUrl, "_blank")}
                            >
                              <Github className="mr-1" size={14} />
                              GitHub
                            </Button>
                          </motion.div>
                        </div>
                        <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="secondary"
                              className="bg-soft-lavender text-gray-700 hover:bg-bright-aqua hover:text-white transition-colors transform hover:rotate-1 shadow-sm"
                              style={{ clipPath: "polygon(3% 0%, 97% 3%, 100% 97%, 0% 100%)" }}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <div
                        className="absolute -bottom-1 -right-1 w-full h-full bg-deep-violet/10 -z-10 transform -rotate-1"
                        style={{ clipPath: "polygon(3% 0%, 97% 3%, 98% 97%, 2% 100%)", borderRadius: "15px" }}
                      />
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section>
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <h2 className="text-3xl font-bold text-gray-800 relative z-10 flex items-center">
                    <div className="w-10 h-10 bg-bright-aqua/20 rounded-full flex items-center justify-center mr-3 transform -rotate-2">
                      <Award className="text-bright-aqua" size={24} />
                    </div>
                    Certifications
                  </h2>
                  <div
                    className="absolute -inset-4 bg-bright-aqua/20 shadow-md transform rotate-2 -z-10 rounded-xl"
                    style={{ clipPath: "polygon(3% 0%, 97% 1%, 99% 97%, 1% 100%)" }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, rotate: -1 }}
                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, rotate: 1 }}
                  >
                    <Card
                      className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden transform hover:-rotate-1"
                      style={{ clipPath: "polygon(1% 0%, 99% 2%, 98% 98%, 2% 100%)", borderRadius: "15px" }}
                    >
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{cert.title}</h3>
                        <p className="text-deep-violet font-medium mb-3">{cert.issuer}</p>
                        <p className="text-gray-700 leading-relaxed">{cert.description}</p>
                      </CardContent>
                      <div
                        className="absolute -bottom-1 -right-1 w-full h-full bg-bright-aqua/10 -z-10 transform rotate-1"
                        style={{ clipPath: "polygon(1% 0%, 99% 2%, 98% 98%, 2% 100%)", borderRadius: "15px" }}
                      />
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
