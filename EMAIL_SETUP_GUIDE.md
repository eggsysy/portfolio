# Email Setup Guide for Contact Form

## 🚀 Quick Setup Options

### Option 1: Resend (Recommended) ⭐

**Why Resend?**
- Easy setup and reliable delivery
- Great developer experience
- Built for modern web apps
- Excellent deliverability rates

**Setup Steps:**

1. **Sign up at [resend.com](https://resend.com)**
2. **Get your API key** from the dashboard
3. **Add domain** (optional but recommended for production)
4. **Set environment variable:**
   \`\`\`env
   RESEND_API_KEY=re_your_api_key_here
   \`\`\`

**Domain Setup (Production):**
- Add your domain in Resend dashboard
- Update the `from` field in the API route:
  \`\`\`javascript
  from: 'Portfolio Contact <noreply@yourdomain.com>'
  \`\`\`

### Option 2: Gmail with Nodemailer

**Setup Steps:**

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Set environment variables:**
   \`\`\`env
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   \`\`\`

### Option 3: Other Email Services

**SendGrid:**
\`\`\`env
SENDGRID_API_KEY=your_sendgrid_api_key
\`\`\`

**Mailgun:**
\`\`\`env
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_mailgun_domain
\`\`\`

## 🔧 Environment Variables Setup

Create `.env.local` in your project root:

\`\`\`env
# Option 1: Resend (Recommended)
RESEND_API_KEY=re_your_api_key_here

# Option 2: Gmail
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# Option 3: SendGrid
SENDGRID_API_KEY=SG.your_sendgrid_api_key

# Option 4: Mailgun
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_mailgun_domain
\`\`\`

## 🎨 Email Templates

The contact form sends two emails:

### 1. **Notification Email (to you)**
- Contains sender's details
- Includes the full message
- Reply-to set to sender's email
- Professional formatting

### 2. **Confirmation Email (to sender)**
- Thanks them for reaching out
- Confirms message received
- Sets expectations for response time
- Includes your contact info

## 🔒 Security Features

- **Input validation** (required fields, email format)
- **Rate limiting** (can be added)
- **Spam protection** (can be enhanced)
- **Error handling** with user-friendly messages
- **Loading states** to prevent double submissions

## 🚀 Deployment

### Vercel Deployment:
1. Add environment variables in Vercel dashboard
2. Deploy your app
3. Test the contact form

### Environment Variables in Vercel:
- Go to your project dashboard
- Settings → Environment Variables
- Add your email service credentials

## 🧪 Testing

### Local Testing:
\`\`\`bash
# Start development server
npm run dev

# Test the contact form at
http://localhost:3000/contact
\`\`\`

### Production Testing:
- Send a test message through your deployed form
- Check your email for both notification and confirmation
- Verify reply-to functionality works

## 📧 Email Service Comparison

| Service | Pros | Cons | Best For |
|---------|------|------|----------|
| **Resend** | Easy setup, great DX, reliable | Newer service | Modern web apps |
| **Gmail** | Free, familiar | App passwords, limits | Personal projects |
| **SendGrid** | Robust, scalable | More complex setup | Enterprise |
| **Mailgun** | Powerful APIs | Learning curve | Advanced users |

## 🎯 Recommended Setup

For your portfolio, I recommend **Resend** because:
- ✅ Simple setup process
- ✅ Excellent deliverability
- ✅ Modern developer experience
- ✅ Good free tier
- ✅ Professional email templates
- ✅ Built for React/Next.js apps

## 🔧 Troubleshooting

### Common Issues:

**1. Emails not sending:**
- Check environment variables
- Verify API keys are correct
- Check console for error messages

**2. Emails going to spam:**
- Set up proper domain authentication
- Use professional from addresses
- Include proper headers

**3. Gmail app password not working:**
- Ensure 2FA is enabled
- Generate new app password
- Use the 16-character password (no spaces)

**4. Rate limiting:**
- Implement proper rate limiting
- Add CAPTCHA for production
- Monitor usage

## 📱 Mobile Optimization

The contact form is fully responsive and includes:
- Touch-friendly inputs
- Proper keyboard types
- Accessible labels
- Loading states
- Error handling

## 🎨 Customization

You can customize:
- Email templates (HTML/CSS)
- Form validation rules
- Success/error messages
- Styling and animations
- Additional form fields

The contact form is now fully functional with professional email delivery! 🚀✨
