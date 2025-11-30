"use client"

import { useState } from "react"
import SignupSuccessModal from "@/components/SignupSuccessModal"

export default function Home() {
  const [showModal, setShowModal] = useState(false)

  const handleSignup = () => {
    setShowModal(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold text-slate-900">Welcome</h1>
        <p className="text-gray-600">Click the button below to see the signup success modal in action.</p>

        <button
          onClick={handleSignup}
          className="px-8 py-3 bg-[#59A5B2] text-white rounded-lg font-semibold hover:bg-[#4a8994] transition-colors duration-200"
        >
          Show Success Modal
        </button>

        <p className="text-sm text-gray-500 pt-4">
          The modal will automatically close after 3 seconds or when you click "Continue".
        </p>
      </div>

      {/* Modal component */}
      <SignupSuccessModal isVisible={showModal} onClose={() => setShowModal(false)} />
    </main>
  )
}