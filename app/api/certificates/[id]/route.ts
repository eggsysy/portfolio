import { type NextRequest, NextResponse } from "next/server"
import { deleteCertificate } from "@/lib/certificates-store"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const deleted = deleteCertificate(id)

    if (!deleted) {
      return NextResponse.json({ success: false, error: "Certificate not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Certificate deleted successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete certificate" }, { status: 500 })
  }
}
