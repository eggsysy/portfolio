import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { getCertificates, addCertificate } from "@/lib/certificates-store"

export async function GET() {
  try {
    const certificates = getCertificates()
    return NextResponse.json({ success: true, certificates })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch certificates" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const title = formData.get("title") as string
    const issuer = formData.get("issuer") as string
    const date = formData.get("date") as string
    const description = formData.get("description") as string
    const credentialId = formData.get("credentialId") as string
    const skills = JSON.parse((formData.get("skills") as string) || "[]")

    if (!file || !title || !issuer || !date) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Upload file to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
    })

    // Add certificate to store
    const certificate = addCertificate({
      title,
      issuer,
      date,
      status: "Active",
      description,
      credentialId,
      skills,
      fileUrl: blob.url,
      fileName: file.name,
    })

    return NextResponse.json({
      success: true,
      message: "Certificate uploaded successfully",
      certificate,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ success: false, error: "Failed to upload certificate" }, { status: 500 })
  }
}
