import React from 'react'

/**
 * Input
 *
 * Props:
 * - label?: string - optional top label
 * - type?: string - input type (text, email, password, etc.)
 * - value: string - controlled value
 * - onChange: (e) => void - change handler
 * - placeholder?: string - input placeholder
 * - className?: string - extra classes for input element
 * - required?: boolean - mark as required for forms
 */

const Input = ({ label, error, className = '', ...props }) => {
  return (
    <label className={`flex flex-col gap-1 ${className}`}>
      {label && <span className="text-sm text-gray-700">{label}</span>}
      <input
        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  )
}

export default Input


