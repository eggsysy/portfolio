export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  status: "Active" | "Expired"
  description: string
  credentialId: string
  skills: string[]
  fileUrl?: string
  fileName?: string
  uploadedAt: Date
}

export interface UploadResponse {
  success: boolean
  message: string
  certificate?: Certificate
  error?: string
}
