import React from 'react'

const variants = {
  success: 'bg-green-50 text-green-700 border-green-200',
  error: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
}

const Alert = ({ children, variant = 'info' }) => (
  <div className={`border rounded-md px-3 py-2 ${variants[variant]}`}>{children}</div>
)

export default Alert


