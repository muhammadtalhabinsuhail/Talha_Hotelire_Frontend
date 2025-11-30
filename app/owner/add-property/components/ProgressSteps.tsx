"use client";

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressSteps({ currentStep, totalSteps }: ProgressStepsProps) {
  const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="relative w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-[#59A5B2] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Step Indicator */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span
          className="font-medium text-gray-600"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Step {currentStep} of {totalSteps}
        </span>
        <span
          className="font-semibold text-[#59A5B2]"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {Math.round(percentage)}% Complete
        </span>
      </div>
    </div>
  );
}
