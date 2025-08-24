import React, { useState } from 'react'
import { X, ShoppingCart, UserPlus, LogIn } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../UI/Button'

const AuthModal = ({ isOpen, onClose, onSuccess, message = "Please sign in to add items to your cart" }) => {
  const [activeTab, setActiveTab] = useState('signin')

  if (!isOpen) return null

  const handleClose = () => {
    onClose()
  }

  const handleSuccess = () => {
    onSuccess?.()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-full">
              <ShoppingCart className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Authentication Required</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Message */}
        <div className="p-6 pb-4">
          <p className="text-gray-600 text-center">{message}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('signin')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'signin'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <LogIn className="w-4 h-4 inline mr-2" />
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'signup'
                ? 'text-green-600 border-b-2 border-green-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <UserPlus className="w-4 h-4 inline mr-2" />
            Sign Up
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'signin' ? (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome Back!</h3>
                <p className="text-gray-600 text-sm">Sign in to continue shopping</p>
              </div>
              
              <Link to="/login" className="block">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                  onClick={handleSuccess}
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In to Your Account
                </Button>
              </Link>
              
              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setActiveTab('signup')}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Create one here
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Join Organic Hub!</h3>
                <p className="text-gray-600 text-sm">Create an account to start shopping</p>
              </div>
              
              <Link to="/signup" className="block">
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                  onClick={handleSuccess}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create New Account
                </Button>
              </Link>
              
              <div className="text-center">
                <p className="text-gray-500 text-sm">
                  Already have an account?{' '}
                  <button
                    onClick={() => setActiveTab('signin')}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 text-center">
          <p className="text-xs text-gray-400">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
