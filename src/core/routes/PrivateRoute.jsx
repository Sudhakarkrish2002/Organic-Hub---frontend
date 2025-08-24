// src/routes/PrivateRoute.jsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '@/features/auth/context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthContext()
  const location = useLocation()
  
  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  
  // If not authenticated, redirect to auth flow with return path
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/auth" 
        state={{ 
          returnTo: location.pathname,
          message: 'Please sign in to access this page'
        }} 
        replace 
      />
    )
  }
  
  return children
}

export default PrivateRoute