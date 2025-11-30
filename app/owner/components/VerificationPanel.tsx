"use client"

import Image from "next/image"

export default function VerificationPanel() {
  return (
   <div className="relative h-full rounded-xl p-8 flex flex-col items-center justify-center min-h-[500px] lg:min-h-auto shadow-md overflow-hidden">
  <Image
    src="/figmaAssets/barrier-bg.jpg"
    alt="Luxury verification background"
    fill
    className="object-cover"
    priority
  />

  {/* Overlay with black shade */}
  <div className="absolute inset-0 bg-black opacity-40"></div>

  {/* Optional blue overlay */}
  <div className="absolute inset-0 bg-[#59A5B2]/30 mix-blend-overlay"></div>

  <div className="relative z-10 flex flex-col items-center w-full max-w-xs">
    <div className="mb-8 flex items-center justify-center">
      <Image
        src="/figmaAssets/verify_icon_3.png"
        alt="Verification icon"
        width={108}
        height={108}
        className="w-56 h-56"
      />
    </div>


        {/* Heading */}
        <h2 className="text-3xl font-bold text-white mb-3 text-center font-poppins drop-shadow-lg">
          Verify Your Identity
        </h2>

        {/* Description */}
        <p className="text-white text-sm text-center leading-relaxed mb-8 drop-shadow-md">
          It only takes a couple of minutes — we just need to confirm your ownership details. Your information is kept
          secure and confidential.
        </p>

        {/* Feature Points */}
        <div className="space-y-4 w-full">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-white mt-0.5 flex-shrink-0 drop-shadow"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-white drop-shadow">Government-issued ID required</span>
          </div>
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-white mt-0.5 flex-shrink-0 drop-shadow"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-white drop-shadow">Proof of ownership document</span>
          </div>
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-white mt-0.5 flex-shrink-0 drop-shadow"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-white drop-shadow">Secure & encrypted data handling</span>
          </div>
        </div>
        </div>
        </div>
     
  )
}
