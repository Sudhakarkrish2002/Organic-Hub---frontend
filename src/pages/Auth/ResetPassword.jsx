import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, CheckCircle2, ArrowLeft } from 'lucide-react'
import Input from '@/components/UI/Input'
import authAPI from '@/services/authAPI'
import { useNotification } from '@/context/NotificationContext'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const { success, error, showLoading, dismissLoading } = useNotification()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const token = params.get('token')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password || password !== confirm) {
      error('Passwords do not match')
      return
    }
    if (!token) {
      error('Invalid or missing token')
      return
    }
    setLoading(true)
    const toastId = showLoading('Updating password...')
    try {
      await authAPI.resetPassword(token, password)
      dismissLoading(toastId)
      success('Password updated successfully')
      navigate('/login')
    } catch (err) {
      dismissLoading(toastId)
      error(err?.response?.data?.message || 'Failed to reset password')
    } finally {
      setLoading(false)
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
          <h2 className="mt-6 text-3xl font-display text-green-800">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600 font-body">
            Enter your new password below
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 space-y-4 bg-white p-6 rounded-xl shadow-md"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 font-accent mb-2">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 font-body text-base"
                placeholder="Enter new password"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 font-accent mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CheckCircle2 className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 font-body text-base"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-accent"
          >
            Update Password
          </button>
          <div className="text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </motion.form>
      </div>
    </div>
  )
}

export default ResetPassword
