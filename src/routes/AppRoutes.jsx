// src/routes/AppRoutes.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Products from '@/pages/Products'
import ProductDetail from '@/pages/ProductDetail'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import Payment from '@/pages/Payment'
import Login from '@/pages/Auth/Login'
import Signup from '@/pages/Auth/Signup'
import ResetPassword from '@/pages/Auth/ResetPassword'
import ForgotPassword from '@/components/Auth/ForgotPassword'
import Profile from '@/pages/Profile'
import Orders from '@/pages/Orders'
import SeasonalProducts from '@/pages/SeasonalProducts'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Wishlist from '@/pages/Wishlist'
import AdminDashboard from '@/pages/Admin/Dashboard'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/seasonal" element={<SeasonalProducts />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected Routes */}
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
      <Route path="/orders/:id" element={<PrivateRoute><Orders /></PrivateRoute>} />
      <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
    </Routes>
  )
}

export default AppRoutes