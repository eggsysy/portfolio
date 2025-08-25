"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDropzone } from "react-dropzone"

interface CertificateUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (certificate: any) => void
}

export default function CertificateUploadModal({ isOpen, onClose, onUpload }: CertificateUploadModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    description: "",
    credentialId: "",
    skills: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0])
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsUploading(true)

    try {
      const uploadFormData = new FormData()
      uploadFormData.append("file", file)
      uploadFormData.append("title", formData.title)
      uploadFormData.append("issuer", formData.issuer)
      uploadFormData.append("date", formData.date)
      uploadFormData.append("description", formData.description)
      uploadFormData.append("credentialId", formData.credentialId)
      uploadFormData.append("skills", JSON.stringify(formData.skills.split(",").map((s) => s.trim())))

      const response = await fetch("/api/certificates", {
        method: "POST",
        body: uploadFormData,
      })

      const result = await response.json()

      if (result.success) {
        onUpload(result.certificate)
        onClose()
        setFormData({
          title: "",
          issuer: "",
          date: "",
          description: "",
          credentialId: "",
          skills: "",
        })
        setFile(null)
      } else {
        alert("Upload failed: " + result.error)
      }
    } catch (error) {
      alert("Upload failed: " + error)
    } finally {
      setIsUploading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white border-0 shadow-2xl rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
          style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 98%, 1% 100%)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-gray-900 flex items-center">
                <div className="w-8 h-8 bg-bright-aqua/20 rounded-full flex items-center justify-center mr-3 transform -rotate-3">
                  <Plus size={16} className="text-bright-aqua" />
                </div>
                Add New Certificate
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="border-deep-violet text-deep-violet hover:bg-deep-violet hover:text-white bg-transparent"
              >
                <X size={16} />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certificate File (PDF or Image)</label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                    isDragActive ? "border-bright-aqua bg-bright-aqua/10" : "border-gray-300 hover:border-bright-aqua"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                  {file ? (
                    <p className="text-sm text-gray-700">Selected: {file.name}</p>
                  ) : (
                    <p className="text-sm text-gray-500">Drag & drop a certificate file here, or click to select</p>
                  )}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Title *</label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., AWS Cloud Practitioner"
                    className="bg-soft-lavender/30 border-soft-lavender"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issuer *</label>
                  <Input
                    required
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    placeholder="e.g., Amazon Web Services"
                    className="bg-soft-lavender/30 border-soft-lavender"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Issued *</label>
                  <Input
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g., 2024"
                    className="bg-soft-lavender/30 border-soft-lavender"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Credential ID</label>
                  <Input
                    value={formData.credentialId}
                    onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                    placeholder="e.g., AWS-CP-2024-001"
                    className="bg-soft-lavender/30 border-soft-lavender"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the certification..."
                  rows={3}
                  className="bg-soft-lavender/30 border-soft-lavender resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                <Input
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="e.g., Cloud Computing, AWS, DevOps"
                  className="bg-soft-lavender/30 border-soft-lavender"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!file || !formData.title || !formData.issuer || !formData.date || isUploading}
                  className="flex-1 bg-bright-aqua hover:bg-bright-aqua/90 text-black font-semibold"
                >
                  {isUploading ? "Uploading..." : "Add Certificate"}
                </Button>
              </div>
            </form>
          </CardContent>

          {/* Modal Shadow */}
          <div
            className="absolute -bottom-3 -right-3 w-full h-full bg-deep-violet/20 -z-10 transform rotate-1 rounded-3xl"
            style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 98%, 1% 100%)" }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
