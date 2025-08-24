// src/routes/GuestRoute.jsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '@/features/auth/context/AuthContext'

const GuestRoute = ({ children }) => {
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
  
  // If authenticated, redirect to home or intended page
  if (isAuthenticated) {
    const returnTo = location.state?.returnTo || '/'
    return <Navigate to={returnTo} replace />
  }
  
  return children
}

export default GuestRoute
