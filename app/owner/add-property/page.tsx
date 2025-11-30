"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProperty } from "./PropertyContext";

export default function AddPropertyPage() {
  const router = useRouter();
  const { currentStep } = useProperty();

  useEffect(() => {
    // Redirect to current step or step 1
    const targetStep = currentStep || 1;
    router.replace(`/owner/add-property/step-${targetStep}`);
  }, [currentStep, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#59A5B2] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
          Loading...
        </p>
      </div>
    </div>
  );
}
