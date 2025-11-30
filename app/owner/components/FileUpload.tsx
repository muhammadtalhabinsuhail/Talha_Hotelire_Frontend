"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Label } from "@/components/ui/label"

interface FileData {
  id: string
  file: File
  preview?: string
}

interface FileUploadProps {
  label: string
  description: string
  acceptedTypes: string[]
  maxSize: number // in MB
  fileType: "photoId" | "ownershipDoc"
  onFileSelect: (fileData: FileData | null) => void
  error?: string
  uploadedFile?: FileData | null
  disabled?: boolean
}

const BRAND = "#59A5B2"

export default function FileUpload({
  label,
  description,
  acceptedTypes,
  maxSize,
  fileType,
  onFileSelect,
  error,
  uploadedFile,
  disabled = false,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const getAcceptString = () => acceptedTypes.join(",")

  const validateAndUploadFile = (file: File) => {
    // Validate type
    if (!acceptedTypes.includes(file.type)) {
      alert(`Invalid file type. Accepted types: ${acceptedTypes.join(", ")}`)
      return
    }

    // Validate size
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSize) {
      alert(`File size must be less than ${maxSize}MB`)
      return
    }

    setUploading(true)

    // Simulate upload and create temp ID
    setTimeout(() => {
      const fileData: FileData = {
        id: `temp_${fileType}_${Date.now()}`,
        file,
        preview: fileType === "photoId" ? URL.createObjectURL(file) : undefined,
      }
      onFileSelect(fileData)
      setUploading(false)
    }, 500)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      validateAndUploadFile(file)
    }
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      validateAndUploadFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleRemove = () => {
    onFileSelect(null)
  }

  return (
    <div className="space-y-3">
      <div>
        <Label className="text-sm font-medium text-gray-700">
          {label} <span className="text-red-500">*</span>
        </Label>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>

      {uploadedFile ? (
        <div className="border-2 border-green-200 bg-green-50 rounded-md p-4 space-y-3">
          {fileType === "photoId" && uploadedFile.preview && (
            <div className="flex gap-3">
              <img
                src={uploadedFile.preview || "/placeholder.svg"}
                alt="Photo ID preview"
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{uploadedFile.file.name}</p>
                <p className="text-xs text-gray-600">{(uploadedFile.file.size / 1024).toFixed(2)} KB</p>
                <p className="text-xs text-green-600 mt-1">✓ Upload successful</p>
              </div>
            </div>
          )}

          {fileType === "ownershipDoc" && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-800">{uploadedFile.file.name}</p>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-600">{(uploadedFile.file.size / 1024).toFixed(2)} KB</p>
                <p className="text-xs text-green-600">✓ Upload successful</p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleRemove}
            className="text-sm text-red-600 hover:text-red-700 hover:underline"
          >
            Remove File
          </button>
        </div>
      ) : (
        <div
          onDrop={disabled ? undefined : handleDrop}
          onDragOver={disabled ? undefined : handleDragOver}
          className={`border-2 border-dashed rounded-md p-8 text-center transition ${
            disabled
              ? "border-gray-200 bg-gray-50 cursor-not-allowed opacity-50"
              : "border-gray-300 cursor-pointer hover:border-[#59A5B2]"
          }`}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={getAcceptString()}
            onChange={handleFileChange}
            className="hidden"
            aria-label={label}
            disabled={disabled}
          />
          <p className="text-sm text-gray-700 font-medium">
            {disabled
              ? "Select document type above to upload"
              : uploading
                ? "Uploading..."
                : "Drag and drop or click to upload"}
          </p>
          <p className="text-xs text-gray-500 mt-1">Max size: {maxSize}MB</p>
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
