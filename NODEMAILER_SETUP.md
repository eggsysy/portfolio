# Nodemailer Setup Guide 📧

## 🚀 Quick Setup with Gmail App Password

### Step 1: Gmail App Password Setup

1. **Enable 2-Factor Authentication** on your Gmail account:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → Turn On

2. **Generate App Password**:
   - Go to Security → 2-Step Verification
   - Scroll down to "App passwords"
   - Select app: "Mail"
   - Select device: "Other" → Enter "Portfolio Website"
   - Copy the 16-character password (no spaces)

### Step 2: Environment Variables

Add these to your `.env.local` file:

\`\`\`env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
\`\`\`

**Example:**
\`\`\`env
GMAIL_USER=aryanbadmera@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
\`\`\`

### Step 3: Test the Setup

1. Start your development server:
   \`\`\`bash
   npm run dev
   \`\`\`

2. Go to `http://localhost:3000/contact`

3. Fill out and submit the contact form

4. Check your email for:
   - ✅ Notification email (to you)
   - ✅ Confirmation email (to sender)

## 🎨 Email Features

### Notification Email (to you):
- 📧 Professional HTML template
- 👤 Sender's contact details
- 💬 Full message content
- 🔄 Reply-to set to sender's email
- 🎨 Beautiful styling with your brand colors

### Confirmation Email (to sender):
- 🎉 Thank you message
- 📋 Message summary
- ⏰ Response time expectations
- 🌐 Your contact links
- 🎨 Professional branding

## 🔧 Configuration Options

### Custom Email Templates

You can customize the HTML templates in the API route:

\`\`\`typescript
// Modify the mailToYou.html or mailToSender.html
html: `
  <div style="your-custom-styles">
    Your custom email content
  </div>
`
\`\`\`

### Email Settings

\`\`\`typescript
const transporter = nodemailer.createTransporter({
  service: "gmail", // or "outlook", "yahoo", etc.
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  // Optional: Additional settings
  secure: true, // Use TLS
  port: 587,    // SMTP port
})
\`\`\`

## 🚀 Deployment

### Vercel Deployment:

1. **Add Environment Variables** in Vercel Dashboard:
   - Go to your project → Settings → Environment Variables
   - Add `GMAIL_USER` and `GMAIL_APP_PASSWORD`

2. **Deploy your app**:
   \`\`\`bash
   vercel --prod
   \`\`\`

3. **Test the live contact form**

### Other Platforms:

For other deployment platforms, ensure you add the environment variables in their respective dashboards.

## 🔒 Security Best Practices

1. **Never commit credentials** to version control
2. **Use app passwords** instead of your main Gmail password
3. **Rotate app passwords** periodically
4. **Monitor email usage** for suspicious activity
5. **Add rate limiting** for production (optional)

## 🧪 Troubleshooting

### Common Issues:

**1. "Invalid login" error:**
- ✅ Ensure 2FA is enabled
- ✅ Use app password, not regular password
- ✅ Check environment variables are correct

**2. "EAUTH" authentication error:**
- ✅ Regenerate app password
- ✅ Check for typos in credentials
- ✅ Ensure Gmail account is active

**3. Emails not received:**
- ✅ Check spam folder
- ✅ Verify recipient email address
- ✅ Check Gmail sent folder

**4. Network errors:**
- ✅ Check internet connection
- ✅ Verify firewall settings
- ✅ Try different network

### Debug Mode:

Add this to your API route for debugging:

\`\`\`typescript
// Add after creating transporter
console.log("Transporter created successfully")
await transporter.verify()
console.log("SMTP connection verified")
\`\`\`

## 📊 Email Limits

### Gmail Limits:
- **Daily limit**: 500 emails per day
- **Rate limit**: ~100 emails per hour
- **Recipients**: 500 per email

For higher volumes, consider:
- Google Workspace
- Dedicated email services (SendGrid, Mailgun)
- Multiple Gmail accounts

## 🎯 Production Tips

1. **Add rate limiting**:
   \`\`\`typescript
   // Implement rate limiting middleware
   // Limit to 5 emails per IP per hour
   \`\`\`

2. **Add CAPTCHA** for spam protection

3. **Monitor email delivery** and bounces

4. **Set up email templates** in separate files

5. **Add email validation** and sanitization

## ✅ Testing Checklist

- [ ] Environment variables set correctly
- [ ] Gmail app password generated
- [ ] 2FA enabled on Gmail account
- [ ] Contact form submits successfully
- [ ] Notification email received
- [ ] Confirmation email sent to sender
- [ ] Reply-to functionality works
- [ ] Email formatting looks good
- [ ] Mobile email display tested

Your contact form is now fully functional with Gmail and Nodemailer! 🚀✨

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify your Gmail settings
3. Test with a simple email first
4. Check server logs for detailed errors

The contact form now sends beautiful, professional emails using your Gmail account! 📧🎉
