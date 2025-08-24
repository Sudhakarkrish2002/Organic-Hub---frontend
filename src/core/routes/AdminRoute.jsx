// src/routes/AdminRoute.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '@/features/auth/context/AuthContext'

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuthContext()
  
  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  
  return isAuthenticated && user?.role === 'admin' ? 
    children : <Navigate to="/login" />
}

export default AdminRoute