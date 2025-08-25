# Backend Management Guide

This guide explains how to manage certificates and resume uploads through the backend API endpoints since UI controls have been removed for security.

## 🔐 Security Approach

The UI no longer has upload/delete buttons. All content management is done through direct API calls or admin tools to prevent unauthorized modifications.

## 📋 Certificate Management

### 1. Add New Certificate

**Endpoint:** `POST /api/certificates`

**Method:** Use a tool like Postman, curl, or create an admin script.

**Example using curl:**
\`\`\`bash
curl -X POST http://localhost:3000/api/certificates \
  -F "file=@certificate.pdf" \
  -F "title=AWS Cloud Practitioner" \
  -F "issuer=Amazon Web Services" \
  -F "date=2024" \
  -F "description=Foundational cloud computing certification" \
  -F "credentialId=AWS-CP-2024-001" \
  -F "skills=[\"Cloud Computing\", \"AWS\", \"DevOps\"]"
\`\`\`

**Example using JavaScript/Node.js:**
\`\`\`javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('title', 'AWS Cloud Practitioner');
formData.append('issuer', 'Amazon Web Services');
formData.append('date', '2024');
formData.append('description', 'Foundational cloud computing certification');
formData.append('credentialId', 'AWS-CP-2024-001');
formData.append('skills', JSON.stringify(['Cloud Computing', 'AWS', 'DevOps']));

fetch('/api/certificates', {
  method: 'POST',
  body: formData
});
\`\`\`

### 2. View All Certificates

**Endpoint:** `GET /api/certificates`

\`\`\`bash
curl http://localhost:3000/api/certificates
\`\`\`

### 3. Delete Certificate

**Endpoint:** `DELETE /api/certificates/[id]`

\`\`\`bash
curl -X DELETE http://localhost:3000/api/certificates/CERTIFICATE_ID
\`\`\`

## 📄 Resume Management

### 1. Upload New Resume

**Endpoint:** `POST /api/resume/download`

**Example using curl:**
\`\`\`bash
curl -X POST http://localhost:3000/api/resume/download \
  -F "resume=@resume.pdf"
\`\`\`

**Example using JavaScript:**
\`\`\`javascript
const formData = new FormData();
formData.append('resume', fileInput.files[0]);

fetch('/api/resume/download', {
  method: 'POST',
  body: formData
});
\`\`\`

### 2. Check Current Resume

**Endpoint:** `GET /api/resume/download`

\`\`\`bash
curl http://localhost:3000/api/resume/download
\`\`\`

## 🛠️ Admin Script Examples

### Certificate Upload Script (Node.js)

Create `scripts/upload-certificate.js`:

\`\`\`javascript
const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');

async function uploadCertificate(filePath, certificateData) {
  const form = new FormData();
  
  form.append('file', fs.createReadStream(filePath));
  form.append('title', certificateData.title);
  form.append('issuer', certificateData.issuer);
  form.append('date', certificateData.date);
  form.append('description', certificateData.description);
  form.append('credentialId', certificateData.credentialId);
  form.append('skills', JSON.stringify(certificateData.skills));

  try {
    const response = await fetch('http://localhost:3000/api/certificates', {
      method: 'POST',
      body: form
    });
    
    const result = await response.json();
    console.log('Upload result:', result);
  } catch (error) {
    console.error('Upload failed:', error);
  }
}

// Usage
uploadCertificate('./certificates/aws-cert.pdf', {
  title: 'AWS Cloud Practitioner',
  issuer: 'Amazon Web Services',
  date: '2024',
  description: 'Foundational cloud computing certification',
  credentialId: 'AWS-CP-2024-001',
  skills: ['Cloud Computing', 'AWS', 'DevOps']
});
\`\`\`

### Resume Upload Script (Node.js)

Create `scripts/upload-resume.js`:

\`\`\`javascript
const fs = require('fs');
const FormData = require('form-data');
const fetch = require('node-fetch');

async function uploadResume(filePath) {
  const form = new FormData();
  form.append('resume', fs.createReadStream(filePath));

  try {
    const response = await fetch('http://localhost:3000/api/resume/download', {
      method: 'POST',
      body: form
    });
    
    const result = await response.json();
    console.log('Resume upload result:', result);
  } catch (error) {
    console.error('Resume upload failed:', error);
  }
}

// Usage
uploadResume('./resume/Aryan_Badmera_Resume.pdf');
\`\`\`

## 🔧 Environment Setup

Make sure you have the required environment variables:

\`\`\`env
# .env.local
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
\`\`\`

## 📱 Admin Panel (Optional)

You could create a separate admin route that requires authentication:

### Create Admin Route

\`\`\`javascript
// app/admin/page.tsx (password protected)
"use client"

import { useState } from 'react';
import CertificateUploadModal from '@/components/certificate-upload-modal';
import ResumeUploadModal from '@/components/resume-upload-modal';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Admin Access</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Portfolio Admin</h1>
      {/* Add your admin controls here */}
    </div>
  );
}
\`\`\`

## 🚀 Deployment Considerations

1. **Vercel Blob**: Ensure your Vercel Blob integration is properly configured
2. **Environment Variables**: Set up `BLOB_READ_WRITE_TOKEN` in your deployment
3. **File Limits**: Vercel has file size limits for uploads
4. **Security**: Consider adding API authentication for production

## 📋 Best Practices

1. **File Validation**: Always validate file types and sizes
2. **Error Handling**: Implement proper error responses
3. **Logging**: Log all upload/delete operations
4. **Backup**: Keep backups of important certificates and resumes
5. **Access Control**: Restrict API access in production

## 🔍 Monitoring

Monitor your API endpoints:
- Check Vercel function logs
- Monitor blob storage usage
- Track API response times
- Set up alerts for failures

This approach provides better security while maintaining full functionality through backend management.
