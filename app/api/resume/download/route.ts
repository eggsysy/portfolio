import { NextResponse } from "next/server"
import { list, put } from "@vercel/blob"

export async function GET() {
  try {
    // Try to find the resume file in Vercel Blob storage
    const { blobs } = await list({
      prefix: "resume",
      limit: 1,
    })

    if (blobs.length > 0) {
      // Return the most recent resume
      const resumeBlob = blobs[0]
      return NextResponse.json({
        success: true,
        downloadUrl: resumeBlob.url,
        fileName: "Aryan_Badmera_Resume.pdf",
      })
    } else {
      // No resume found in storage
      return NextResponse.json(
        {
          success: false,
          error: "No resume available. Please upload a resume first.",
        },
        { status: 404 },
      )
    }
  } catch (error) {
    console.error("Resume download error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get resume download link",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("resume") as File

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No resume file provided",
        },
        { status: 400 },
      )
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        {
          success: false,
          error: "Only PDF files are allowed",
        },
        { status: 400 },
      )
    }

    // Upload resume to Vercel Blob with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
    const fileName = `resume-${timestamp}.pdf`

    const blob = await put(fileName, file, {
      access: "public",
    })

    return NextResponse.json({
      success: true,
      message: "Resume uploaded successfully",
      url: blob.url,
      fileName: fileName,
    })
  } catch (error) {
    console.error("Resume upload error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to upload resume",
      },
      { status: 500 },
    )
  }
}
