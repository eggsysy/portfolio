import type { Certificate } from "./types"

// In-memory store for demo purposes
// In production, you'd use a database
let certificates: Certificate[] = [
  {
    id: "1",
    title: "Oracle Certified - Gen AI Professional",
    issuer: "Oracle",
    date: "2024",
    status: "Active",
    description:
      "Completed a professional course by Oracle covering foundational and advanced concepts of generative AI, including practical applications and ethical considerations.",
    credentialId: "ORACLE-GENAI-2024-001",
    skills: ["Generative AI", "Machine Learning", "AI Ethics", "Practical Applications", "Oracle Cloud"],
    uploadedAt: new Date("2024-01-15"),
  },
]

export const getCertificates = (): Certificate[] => {
  return certificates
}

export const addCertificate = (certificate: Omit<Certificate, "id" | "uploadedAt">): Certificate => {
  const newCertificate: Certificate = {
    ...certificate,
    id: Date.now().toString(),
    uploadedAt: new Date(),
  }
  certificates.push(newCertificate)
  return newCertificate
}

export const deleteCertificate = (id: string): boolean => {
  const initialLength = certificates.length
  certificates = certificates.filter((cert) => cert.id !== id)
  return certificates.length < initialLength
}
