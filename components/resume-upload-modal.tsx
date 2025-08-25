"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Upload, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useDropzone } from "react-dropzone"

interface ResumeUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: () => void
}

export default function ResumeUploadModal({ isOpen, onClose, onUpload }: ResumeUploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
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
      const formData = new FormData()
      formData.append("resume", file)

      const response = await fetch("/api/resume/download", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        onUpload()
        onClose()
        setFile(null)
        alert("Resume uploaded successfully! You can now download it.")
      } else {
        alert("Upload failed: " + result.error)
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed. Please try again.")
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
          className="bg-white border-0 shadow-2xl rounded-3xl max-w-md w-full relative"
          style={{ clipPath: "polygon(2% 0%, 98% 1%, 99% 98%, 1% 100%)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-gray-900 flex items-center">
                <div className="w-8 h-8 bg-bright-aqua/20 rounded-full flex items-center justify-center mr-3 transform -rotate-3">
                  <FileText size={16} className="text-bright-aqua" />
                </div>
                Upload Resume
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Resume PDF File</label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    isDragActive ? "border-bright-aqua bg-bright-aqua/10" : "border-gray-300 hover:border-bright-aqua"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                  {file ? (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Selected:</p>
                      <p className="text-sm text-bright-aqua">{file.name}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-700 mb-1">Drag & drop your resume here</p>
                      <p className="text-xs text-gray-500">or click to select (PDF only)</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
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
                  disabled={!file || isUploading}
                  className="flex-1 bg-bright-aqua hover:bg-bright-aqua/90 text-black font-semibold"
                >
                  {isUploading ? "Uploading..." : "Upload Resume"}
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
