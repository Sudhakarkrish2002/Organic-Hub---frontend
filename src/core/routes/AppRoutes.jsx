// src/routes/AppRoutes.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '@/features/home/pages/Home'
import Products from '@/features/products/pages/Products'
import ProductDetail from '@/features/products/pages/ProductDetail'
import Cart from '@/features/cart/pages/Cart'
import Checkout from '@/features/checkout/pages/Checkout'
import Login from '@/features/auth/pages/Login'
import Signup from '@/features/auth/pages/Signup'
import ResetPassword from '@/features/auth/pages/ResetPassword'
import ForgotPassword from '@/features/auth/components/ForgotPassword'
import AuthFlow from '@/shared/components/AuthFlow'
import Profile from '@/features/user/pages/Profile'
import Orders from '@/features/orders/pages/Orders'
import SeasonalProducts from '@/features/seasonal/pages/SeasonalProducts'
import About from '@/features/user/pages/About'
import Contact from '@/features/user/pages/Contact'
import Wishlist from '@/features/wishlist/pages/Wishlist'
import AdminDashboard from '@/features/admin/pages/Dashboard'
import PrivateRoute from './PrivateRoute'
import GuestRoute from './GuestRoute'
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
      <Route path="/auth" element={<GuestRoute><AuthFlow /></GuestRoute>} />
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
      <Route path="/reset-password" element={<GuestRoute><ResetPassword /></GuestRoute>} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
      
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