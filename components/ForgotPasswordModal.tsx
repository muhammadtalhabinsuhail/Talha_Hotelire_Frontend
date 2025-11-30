"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  initialEmail?: string
  onReturnToLogin: () => void
}

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


export function ForgotPasswordModal({ isOpen, onClose, initialEmail = "", onReturnToLogin }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState(initialEmail)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setError("Email is required")
      return
    }

    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {

      const resp = await axios.post(`${baseUrl}/auth/forgotPassword`, { email: trimmedEmail })

      if (resp.status === 200) {
        setIsSuccess(true)
      } else {
        setError(resp.data.message || "Failed to send reset code. Please try again.")
        setIsSuccess(false)
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }



  const handleClose = () => {
    setEmail(initialEmail)
    setError("")
    setIsSuccess(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] transition-all duration-300 ease-in-out animate-in fade-in-0 zoom-in-95" data-testid="modal-forgot-password">
        <DialogHeader>
          <DialogTitle className="[font-family:'Poppins',Helvetica] text-2xl font-bold text-[#3F2C77]">
            Reset Your Password
          </DialogTitle>
          <DialogDescription className="[font-family:'Inter',Helvetica] text-gray-600">
            {isSuccess 
              ? "Check your email for the reset link"
              : "Enter your registered email to receive a reset code."}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="space-y-4 py-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 [font-family:'Inter',Helvetica]" data-testid="text-reset-success">
                A password reset link has been sent to <span className="font-medium">{email}</span>.
                Please check your inbox and follow the instructions.
              </p>
            </div>

            <Button
              onClick={() => {
                handleClose()
                onReturnToLogin()
              }}
              className="w-full h-12 bg-[#3F2C77] hover:bg-[#2a2158] text-white transition-colors duration-200"
              data-testid="button-return-login"
            >
              Return to Login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email" className="[font-family:'Inter',Helvetica] text-gray-700 font-medium">
                Email Address
              </Label>
              <Input
                id="reset-email"
                name="email"
                type="email"
                placeholder="info@abcd.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                }}
                className="h-12 border-gray-300 focus:border-[#3F2C77] focus:ring-[#3F2C77]"
                autoFocus
                data-testid="input-reset-email"
              />
              {error && (
                <p className="text-sm text-red-500 [font-family:'Inter',Helvetica]" data-testid="text-reset-error">
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#3F2C77] hover:bg-[#2a2158] text-white transition-colors duration-200"
              data-testid="button-send-reset"
            >
              {isSubmitting ? "Sending..." : "Send Reset Code"}
            </Button>

            <button
              type="button"
              onClick={() => {
                handleClose()
                onReturnToLogin()
              }}
              className="w-full text-sm text-gray-600 hover:text-[#3F2C77] [font-family:'Inter',Helvetica]"
              data-testid="link-back-to-login"
            >
              Back to Login
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
