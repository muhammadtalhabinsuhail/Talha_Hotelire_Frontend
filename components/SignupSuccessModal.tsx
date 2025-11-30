"use client"

import { useEffect, useState } from "react"

interface SignupSuccessModalProps {
  isVisible: boolean
  onClose?: () => void
}

export default function SignupSuccessModal({ isVisible, onClose }: SignupSuccessModalProps) {
  const [displayModal, setDisplayModal] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setDisplayModal(true)
      setFadeOut(false)

      // Fade out after 3 seconds
      const timer = setTimeout(() => {
        setFadeOut(true)
        // Remove modal from DOM after fade out completes
        const fadeTimer = setTimeout(() => {
          setDisplayModal(false)
          onClose?.()
        }, 300)
        return () => clearTimeout(fadeTimer)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!displayModal) return null

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow-lg p-8 w-[90%] max-w-[420px] text-center transform transition-all duration-300 ${
          fadeOut ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => {
            setFadeOut(true)
            setTimeout(() => {
              setDisplayModal(false)
              onClose?.()
            }, 300)
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal content */}
        <div className="flex flex-col items-center justify-center space-y-4 pt-4">
          <div className="w-16 h-16 rounded-full bg-[#59A5B2]/10 flex items-center justify-center animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-[#59A5B2]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Thank you heading */}
          <h2 className="text-2xl font-semibold text-[#59A5B2]">Thank You for Signing Up!</h2>

          {/* Message text */}
          <p className="text-gray-600 text-sm">
            Your account has been created successfully. You'll be redirected shortly.
          </p>

          <button
            onClick={() => {
              setFadeOut(true)
              setTimeout(() => {
                setDisplayModal(false)
                onClose?.()
              }, 300)
            }}
            className="mt-6 px-6 py-2 bg-[#59A5B2] text-white rounded-lg font-medium hover:bg-[#4a8994] transition-colors duration-200"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}