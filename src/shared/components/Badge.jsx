// src/components/UI/Badge.jsx
import React from 'react'

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    seasonal: 'bg-green-100 text-green-800',
    spring: 'bg-lime-100 text-lime-800',
    summer: 'bg-green-100 text-green-800',
    monsoon: 'bg-teal-100 text-teal-800',
    winter: 'bg-emerald-100 text-emerald-800',
    discount: 'bg-orange-100 text-orange-800',
    success: 'bg-green-100 text-green-800',
  }
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

export default Badge