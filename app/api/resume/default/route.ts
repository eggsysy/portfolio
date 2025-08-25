import { NextResponse } from "next/server"

export async function GET() {
  // This creates a simple text-based resume as a fallback
  const resumeContent = `
ARYAN BADMERA
Software Developer

Contact Information:
Email: aryanbadmera@gmail.com
Phone: +91 7709769481
Location: Nagpur, Maharashtra

Education:
• BTech in Computer Science - Vellore Institute of Technology (2023-2027)
  Currently in 3rd Year (5th Semester) - CGPA: 9.12

• 12th Board (TSBIE) - St. Aloysius English Medium School (2023) - 97.1%

• 10th Board (CBSE) - St. Aloysius English Medium School (2021) - 97.2%

Projects:
• Smash and Dash - 3D arcade-style game using TypeScript, Node.js
• Stock Market Trend Prediction - ML model using LSTM algorithms

Skills:
• Programming: Python, C/C++, Java, R, JavaScript, React
• AI/ML: TensorFlow, PyTorch, Scikit-learn, LSTM
• Tools: Git, GitHub, VS Code, Jupyter Notebook

Certifications:
• Oracle Certified - Gen AI Professional (2024)

About:
Enthusiastic Computer Science student with strong interest in blockchain 
technology and decentralized systems. Passionate about learning new 
technologies and building practical, real-world solutions.
`

  // Create a simple text file response
  return new NextResponse(resumeContent, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": 'attachment; filename="Aryan_Badmera_Resume.txt"',
    },
  })
}
