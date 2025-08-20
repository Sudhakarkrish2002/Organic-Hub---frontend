import React from 'react'

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


