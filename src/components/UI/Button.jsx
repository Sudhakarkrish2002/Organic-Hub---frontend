// src/components/UI/Button.jsx
import React from 'react'
import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  onClick, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg hover:shadow-xl',
    outline: 'border-2 border-green-600 text-green-700 hover:bg-green-600 hover:text-white',
    ghost: 'text-green-700 hover:bg-green-50',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
      onClick={onClick}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </motion.button>
  )
}

export default Button