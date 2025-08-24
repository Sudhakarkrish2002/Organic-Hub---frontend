import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, Leaf, ShoppingCart } from 'lucide-react'
import { login } from '@/store/slices/authSlice'
import { useAuthContext } from '@/context/AuthContext'
import authAPI from '@/services/authAPI'
import { toast } from 'react-hot-toast'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { login: loginUser } = useAuthContext()
  
  // Get message and return path from navigation state
  const message = location.state?.message || 'Sign in to your Organic Hub account'
  const returnTo = location.state?.returnTo || '/'
  
  // Check for remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    const isRemembered = localStorage.getItem('rememberMe') === 'true'
    
    if (rememberedEmail && isRemembered) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }))
      setRememberMe(true)
    }
  }, [])
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => u.email === formData.email && u.password === formData.password)
      
      if (!user) {
        setError('Invalid email or password. Please check your credentials.')
        setIsLoading(false)
        return
      }

      // Check if user is active
      if (!user.isActive) {
        setError('Account is deactivated. Please contact support.')
        setIsLoading(false)
        return
      }

      // Create a simple token (in real app, this should be JWT)
      const token = btoa(JSON.stringify({ userId: user._id, email: user.email }))
      
      // Create auth data
      const authData = {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        },
        token: token
      }
      
      // Login using AuthContext
      loginUser(authData)
      
      // Save remember me preference
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true')
        localStorage.setItem('rememberedEmail', formData.email)
      } else {
        localStorage.removeItem('rememberMe')
        localStorage.removeItem('rememberedEmail')
      }
      
      toast.success('Login successful!')
      navigate(returnTo)
    } catch (error) {
      console.error('Login error:', error)
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Logo */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-3xl shadow-lg">
              <Leaf className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h2 className="mt-6 text-3xl font-display text-green-800">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600 font-body">
            {message}
          </p>
          

          
          {/* Show cart context if user was trying to add items */}
          {location.state?.returnTo && location.state.returnTo !== '/' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 justify-center"
            >
              <ShoppingCart className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700 font-accent">
                After signing in, you'll be able to add items to your cart
              </span>
            </motion.div>
          )}
        </motion.div>
        
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 font-accent mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 font-body text-base"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 font-accent mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 font-body text-base"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-accent">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-green-600 hover:text-green-500 font-accent transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4"
            >
              <p className="text-sm text-red-600 font-accent">{error}</p>
            </motion.div>
          )}
          
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-accent"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
          
          {/* Links */}
          <div className="text-center">
            <p className="text-sm text-gray-600 font-accent">
              Don't have an account?{' '}
              <Link
                to="/signup"
                state={{ message: 'Create an account to start shopping', returnTo }}
                className="font-medium text-green-600 hover:text-green-500 font-accent transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  )
}

export default Login