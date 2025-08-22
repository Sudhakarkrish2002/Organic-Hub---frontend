import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, ArrowLeft } from 'lucide-react'
import Input from '@/components/UI/Input'
import authAPI from '@/services/authAPI'
import { useNotification } from '@/context/NotificationContext'
import { Link } from 'react-router-dom'

const ForgotPassword = ({ onSubmit }) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [devResetLink, setDevResetLink] = useState('')
  const { success, error, showLoading, dismissLoading } = useNotification()
  React.useEffect(() => {
    if (!sent) return
    if (cooldown <= 0) return
    const id = setInterval(() => setCooldown((c) => (c > 0 ? c - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [sent, cooldown])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    const toastId = showLoading('Sending reset link...')
    try {
      if (onSubmit) {
        const res = await onSubmit({ email })
        const token = res?.data?.resetToken || res?.data?.token
        const url = res?.data?.resetUrl || (token ? `${window.location.origin}/reset-password?token=${token}` : '')
        if (url) setDevResetLink(url)
      } else {
        const res = await authAPI.forgotPassword(email)
        const token = res?.data?.resetToken || res?.data?.token
        const url = res?.data?.resetUrl || (token ? `${window.location.origin}/reset-password?token=${token}` : '')
        if (url) setDevResetLink(url)
      }
      success('Password reset link sent to your email')
      setSent(true)
      setCooldown(30)
    } catch (err) {
      error(err?.response?.data?.message || 'Failed to send reset link')
    } finally {
      dismissLoading(toastId)
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
            Forgot Password
          </h2>
          <p className="mt-2 text-sm text-gray-600 font-body">
            Enter your email address and we'll send you a reset link
          </p>
        </motion.div>

        {!sent ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 space-y-4 bg-white p-6 rounded-xl shadow-md"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 font-accent mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 font-body text-base"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-accent"
          >
            <Send className="w-5 h-5" />
            Send reset link
          </button>
          <div className="text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </motion.form>
        ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 space-y-4 bg-white p-6 rounded-xl shadow-md text-center"
        >
          <div className="text-green-700 font-medium">Check your email</div>
          <p className="text-sm text-gray-600">We sent a password reset link to <span className="font-semibold">{email}</span>.</p>
          <div className="text-xs text-gray-500">If you don’t see it, check your spam folder.</div>
          {devResetLink && (
            <div className="space-y-2">
              <a
                href={devResetLink}
                className="block w-full text-center py-3 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors font-accent"
              >
                Open Reset Page
              </a>
              <div className="text-[11px] text-gray-500 break-all">Dev link: {devResetLink}</div>
            </div>
          )}
          <button
            onClick={async () => {
              if (cooldown > 0) return
              setLoading(true)
              const toastId = showLoading('Resending link...')
              try {
                await authAPI.forgotPassword(email)
                success('Reset link resent')
                setCooldown(30)
              } catch (err) {
                error(err?.response?.data?.message || 'Failed to resend link')
              } finally {
                dismissLoading(toastId)
                setLoading(false)
              }
            }}
            disabled={loading || cooldown > 0}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-base font-medium rounded-xl text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-accent"
          >
            <Send className="w-5 h-5" />
            {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend link'}
          </button>
          <div className="text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </motion.div>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword


