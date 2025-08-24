import React from 'react'
import { CheckCircle, Circle, Clock } from 'lucide-react'

const PaymentSteps = ({ currentStep, steps }) => {
  const getStepIcon = (stepIndex, currentStepIndex) => {
    if (stepIndex < currentStepIndex) {
      return <CheckCircle className="w-5 h-5 text-green-600" />
    } else if (stepIndex === currentStepIndex) {
      return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
    } else {
      return <Circle className="w-5 h-5 text-gray-300" />
    }
  }

  const getStepClass = (stepIndex, currentStepIndex) => {
    if (stepIndex < currentStepIndex) {
      return 'text-green-600'
    } else if (stepIndex === currentStepIndex) {
      return 'text-blue-600'
    } else {
      return 'text-gray-400'
    }
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-200 bg-white">
                {getStepIcon(index, currentStep)}
              </div>
              <div className="mt-2 text-center">
                <p className={`text-xs font-medium ${getStepClass(index, currentStep)}`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${
                index < currentStep ? 'bg-green-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentSteps
