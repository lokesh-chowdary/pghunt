import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, label: 'PG Info' },
    { number: 2, label: 'Sharing' },
    { number: 3, label: 'Amenities' },
    { number: 4, label: 'Pricing' },
    { number: 5, label: 'Preview' },
  ];

  return (
    <div className="bg-white px-6 py-4 border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step.number <= currentStep
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-110'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step.number <= currentStep ? (
                step.number === currentStep ? (
                  step.number
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )
              ) : (
                step.number
              )}
            </div>
            <span className={`text-xs mt-1 font-medium ${
              step.number <= currentStep ? 'text-blue-600' : 'text-gray-400'
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
      
      <div className="relative">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
