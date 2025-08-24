import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CreditCard, CheckCircle, XCircle, Loader, ArrowLeft, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import useRazorpay from '@/hooks/useRazorpay'
import Button from '@/components/UI/Button'
import toast from 'react-hot-toast'

const Payment = () => {
  const [paymentStatus, setPaymentStatus] = useState('processing') // processing, success, failed
  const [paymentDetails, setPaymentDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { initializePayment, isAvailable, isDemoMode } = useRazorpay()
  
  const orderData = location.state?.orderData
  const returnUrl = location.state?.returnUrl || '/orders'
  
  useEffect(() => {
    if (!orderData) {
      toast.error('No order data found')
      navigate('/cart')
      return
    }
    
    // Auto-start payment if Razorpay is available
    if (isAvailable()) {
      handlePayment()
    } else {
      setPaymentStatus('failed')
      setError('Payment service not available')
      toast.error('Payment service not available')
    }
  }, [orderData, isAvailable])
  
  const handlePayment = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const paymentData = {
        amount: orderData.totalAmount,
        customerName: orderData.shippingAddress?.fullName || 'Customer',
        customerEmail: orderData.shippingAddress?.email || 'customer@example.com',
        customerPhone: orderData.shippingAddress?.phone || ''
      }
      
      const success = await initializePayment(
        paymentData,
        (response) => {
          // Payment successful
          setPaymentStatus('success')
          setPaymentDetails(response)
          toast.success('Payment successful!')
          
          // Redirect after a delay
          setTimeout(() => {
            navigate(returnUrl)
          }, 3000)
        },
        (error) => {
          // Payment failed
          setPaymentStatus('failed')
          setError(error.message || 'Payment failed')
          toast.error('Payment failed: ' + error.message)
        }
      )
      
      if (!success) {
        setPaymentStatus('failed')
        setError('Failed to initialize payment')
      }
    } catch (error) {
      console.error('Payment error:', error)
      setPaymentStatus('failed')
      setError(error.message || 'Payment failed')
      toast.error('Payment failed: ' + error.message)
    } finally {
      setLoading(false)
    }
  }
  
  const retryPayment = () => {
    setPaymentStatus('processing')
    setError(null)
    handlePayment()
  }
  
  const goBackToCheckout = () => {
    navigate('/checkout')
  }
  
  if (!orderData) {
    return null
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 sm:py-12">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <Link 
                to="/checkout" 
                className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors font-accent"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Checkout
              </Link>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-display text-green-800 mb-4 text-center">
              Payment Processing
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-body text-center">
              Completing your payment for order #{orderData.orderNumber}
            </p>
            
            {/* Demo Mode Notice */}
            {isDemoMode() && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-center"
              >
                <p className="text-sm text-blue-700 font-medium">
                  🧪 Demo Mode: This is a test payment simulation
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  No real money will be charged. This is for testing purposes only.
                </p>
              </motion.div>
            )}
          </motion.div>
          
          {/* Payment Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            {paymentStatus === 'processing' && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="bg-green-100 p-4 rounded-full">
                    {loading ? (
                      <Loader className="w-12 h-12 text-green-600 animate-spin" />
                    ) : (
                      <CreditCard className="w-12 h-12 text-green-600" />
                    )}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-heading text-green-800 mb-2">
                    {loading ? 'Processing Payment...' : 'Ready to Pay'}
                  </h2>
                  <p className="text-gray-600 font-body">
                    {loading 
                      ? 'Please wait while we process your payment'
                      : 'Click the button below to proceed with payment'
                    }
                  </p>
                </div>
                
                {!loading && (
                  <Button
                    onClick={handlePayment}
                    className="px-8 py-3"
                    loading={loading}
                  >
                    Proceed to Payment
                  </Button>
                )}
              </div>
            )}
            
            {paymentStatus === 'success' && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="bg-green-100 p-4 rounded-full">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-heading text-green-800 mb-2">
                    Payment Successful!
                  </h2>
                  <p className="text-gray-600 font-body">
                    Your payment has been processed successfully. Your order is now confirmed.
                  </p>
                </div>
                
                {paymentDetails && (
                  <div className="bg-green-50 p-4 rounded-lg text-left">
                    <h3 className="font-semibold text-green-800 mb-2">Payment Details:</h3>
                    <div className="text-sm text-gray-700 space-y-1">
                      <p>Payment ID: {paymentDetails.razorpay_payment_id}</p>
                      <p>Order ID: {paymentDetails.razorpay_order_id}</p>
                      <p>Amount: ₹{orderData.totalAmount}</p>
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  <Button
                    onClick={() => navigate(returnUrl)}
                    className="w-full"
                  >
                    View Order
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}
            
            {paymentStatus === 'failed' && (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="bg-red-100 p-4 rounded-full">
                    <XCircle className="w-12 h-12 text-red-600" />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-heading text-red-800 mb-2">
                    Payment Failed
                  </h2>
                  <p className="text-gray-600 font-body">
                    We couldn't process your payment. Please try again or choose a different payment method.
                  </p>
                  
                  {error && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 text-red-700">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Error: {error}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Button
                    onClick={retryPayment}
                    className="w-full"
                    loading={loading}
                  >
                    Retry Payment
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={goBackToCheckout}
                    className="w-full"
                  >
                    Back to Checkout
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => navigate('/cart')}
                    className="w-full"
                  >
                    Back to Cart
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-heading text-green-800 mb-4">Order Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium">{orderData.orderNumber}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-medium">₹{orderData.totalAmount}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-medium capitalize">{orderData.paymentMethod}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Items:</span>
                <span className="font-medium">{orderData.items?.length || 0} items</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Payment