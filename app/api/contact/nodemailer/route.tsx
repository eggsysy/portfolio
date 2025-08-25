// Option 2: Using Nodemailer (Alternative approach)
import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, subject, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    // Create transporter (using Gmail as example)
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail
        pass: process.env.GMAIL_APP_PASSWORD, // App-specific password
      },
    })

    // Email to you
    const mailToYou = {
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: "aryanbadmera@gmail.com",
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    }

    // Confirmation email to sender
    const mailToSender = {
      from: `"Aryan Badmera" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting me!",
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${firstName},</p>
        <p>I've received your message and will get back to you soon.</p>
        <p>Best regards,<br>Aryan Badmera</p>
      `,
    }

    // Send emails
    await transporter.sendMail(mailToYou)
    await transporter.sendMail(mailToSender)

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    })
  } catch (error) {
    console.error("Email error:", error)
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}
