// src/routes/AdminRoute.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  
  return isAuthenticated && user?.role === 'admin' ? 
    children : <Navigate to="/login" />
}

export default AdminRoute