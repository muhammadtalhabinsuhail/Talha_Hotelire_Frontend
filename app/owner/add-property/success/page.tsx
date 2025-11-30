"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto redirect to owner dashboard after 5 seconds
    const timer = setTimeout(() => {
      router.push("/owner");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#59A5B2]/5 to-white flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="w-14 h-14 text-green-600" />
          </div>
        </div>

        <div className="space-y-4">
          <h1
            className="text-4xl md:text-5xl font-bold text-[#2e2e2e]"
            style={{ fontFamily: 'Poppins, sans-serif' }}
            data-testid="heading-success"
          >
            Property Submitted Successfully!
          </h1>
          <p
            className="text-lg text-gray-600 max-w-xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Your property listing has been submitted for review. Our team will review your submission and get back to you within 24-48 hours.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-4 shadow-lg">
          <h2
            className="text-xl font-semibold text-gray-900"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            What happens next?
          </h2>
          <ul className="space-y-3 text-left">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#59A5B2]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#59A5B2] text-sm font-bold">1</span>
              </div>
              <p className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                Our verification team will review your ownership documents and property details
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#59A5B2]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#59A5B2] text-sm font-bold">2</span>
              </div>
              <p className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                You'll receive an email notification once your property is approved
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-[#59A5B2]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#59A5B2] text-sm font-bold">3</span>
              </div>
              <p className="text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                Your property will be live and available for bookings
              </p>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push("/owner")}
            className="w-full sm:w-auto px-8 h-12 bg-[#59A5B2] text-white rounded-lg font-semibold hover:bg-[#4a8a95] transition-colors shadow-md"
            style={{ fontFamily: 'Inter, sans-serif' }}
            data-testid="button-dashboard"
          >
            Go to Dashboard
          </button>
          <p
            className="text-sm text-gray-500"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            You will be automatically redirected in 5 seconds...
          </p>
        </div>
      </div>
    </div>
  );
}
