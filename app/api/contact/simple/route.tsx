import { type NextRequest, NextResponse } from "next/server"

// Simple email handler that works in serverless environments
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, subject, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 })
    }

    // For serverless environments, we'll use a webhook approach
    // This could be connected to services like:
    // - Formspree
    // - EmailJS
    // - Netlify Forms
    // - Zapier webhooks
    // - Or a simple logging system

    const contactData = {
      timestamp: new Date().toISOString(),
      name: `${firstName} ${lastName}`,
      email,
      subject,
      message,
      userAgent: request.headers.get("user-agent"),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
    }

    // Log the contact form submission
    console.log("📧 New Contact Form Submission:")
    console.log("=====================================")
    console.log(`Name: ${contactData.name}`)
    console.log(`Email: ${contactData.email}`)
    console.log(`Subject: ${contactData.subject}`)
    console.log(`Message: ${contactData.message}`)
    console.log(`Time: ${contactData.timestamp}`)
    console.log("=====================================")

    // Here you could:
    // 1. Save to a database
    // 2. Send to a webhook service
    // 3. Use a third-party email service
    // 4. Store in a file (for development)

    // For now, we'll simulate successful sending
    // In production, replace this with your preferred email service

    // Example webhook call (uncomment and configure as needed):
    /*
    await fetch('YOUR_WEBHOOK_URL', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    */

    return NextResponse.json({
      success: true,
      message: "Message received successfully! I'll get back to you within 24-48 hours. 🚀",
      data: {
        name: contactData.name,
        timestamp: contactData.timestamp,
      },
    })
  } catch (error) {
    console.error("Contact form error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process message. Please try again or contact me directly at aryanbadmera@gmail.com",
      },
      { status: 500 },
    )
  }
}
