import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { CreditCard, Truck, MapPin, Phone, User, Mail, Shield, Lock, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import useCart from '@/hooks/useCart.jsx'
import useRazorpay from '@/hooks/useRazorpay'
import paymentAPI from '@/services/paymentAPI'
import Button from '@/components/UI/Button'
import PaymentSteps from '@/components/PaymentSteps'
import { formatCurrency } from '@/utils/bulkCalculator'
import { aiImageUrl } from '@/utils/helpers'
import toast from 'react-hot-toast'
import { useAuthContext } from '@/context/AuthContext'

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('') // No default - user must choose
  const [loading, setLoading] = useState(false)
  const [paymentStep, setPaymentStep] = useState('form') // form, processing, success, error
  const [paymentMessage, setPaymentMessage] = useState('')
  const navigate = useNavigate()
  const { user, isAuthenticated, isLoading } = useAuthContext()
  const { items, totalPrice, totalSavings, clearAllItems } = useCart()
  const { initializePayment, isAvailable: isRazorpayAvailable, loading: paymentLoading } = useRazorpay()
  
  // Check authentication - only redirect if not loading and not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('🔐 Checkout auth check: User not authenticated, redirecting to login')
      toast('Please sign in to continue with checkout', {
        icon: '🔒',
        duration: 3000,
        style: {
          background: '#fef3c7',
          color: '#92400e',
          border: '1px solid #f59e0b'
        }
      })
      navigate('/login', { 
        state: { 
          message: 'Please sign in to complete your purchase',
          returnTo: '/checkout'
        }
      })
    }
  }, [isLoading, isAuthenticated, navigate])
  
  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your checkout...</p>
        </div>
      </div>
    )
  }

  // Show loading while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm()
  
  const deliveryCharge = totalPrice >= 500 ? 0 : 50
  const codCharge = paymentMethod === 'cod' ? 20 : 0
  const finalAmount = totalPrice + deliveryCharge + codCharge
  
  // Auto-fill form if user data exists
  useEffect(() => {
    if (user) {
      setValue('fullName', user.name || '')
      setValue('email', user.email || '')
      setValue('phone', user.phone || '')
    }
  }, [user, setValue])

  // Redirect to cart if no items
  useEffect(() => {
    console.log('🛒 Cart items check:', { items, itemsLength: items.length })
    
    if (items.length === 0) {
      navigate('/cart')
    }
  }, [items.length, navigate, items])

  if (items.length === 0) {
    return null
  }

  // Handle different image properties (same as CartItem)
  const getProductImage = (item) => {
    console.log('🖼️ Getting image for item:', item)
    if (item.image) return item.image
    if (item.images && item.images.length > 0) return item.images[0]
    return aiImageUrl('organic product placeholder, simple minimal background', 600, 600, 1)
  }

  const onSubmit = async (data) => {
    if (!paymentMethod) {
      toast.error('Please select a payment method')
      return
    }

    setLoading(true)
    setPaymentStep('processing')
    setPaymentMessage('Preparing your order...')

    try {
      const paymentData = {
        items: items.map(item => ({
          productId: item._id || item.id,
          quantity: item.quantity || 1,
          price: item.price || 0
        })).filter(item => item.productId && item.quantity > 0), // Filter out invalid items
        shippingAddress: {
          fullName: data.fullName,
          phone: data.phone,
          email: data.email,
          street: data.street,
          city: data.city,
          state: data.state,
          pincode: data.pincode
        },
        paymentMethod,
        totalAmount: finalAmount,
        notes: data.notes || ''
      }

      // Validate that we have items to process
      if (!paymentData.items || paymentData.items.length === 0) {
        setPaymentStep('error')
        setPaymentMessage('No valid items in cart')
        toast.error('No valid items in cart')
        return
      }

      console.log('🛒 Processing payment with data:', paymentData)

      if (paymentMethod === 'razorpay') {
        console.log('💳 Creating Razorpay order for online payment...')
        setPaymentMessage('Initializing payment gateway...')
        
        // Initialize Razorpay payment
        const success = await initializePayment(
          {
            amount: finalAmount,
            customerName: data.fullName,
            customerEmail: data.email,
            customerPhone: data.phone,
            orderId: `order_${Date.now()}`
          },
          async (razorpayResponse) => {
            // Payment successful - process order
            setPaymentMessage('Payment successful! Processing your order...')
            try {
              const orderData = {
                ...paymentData,
                razorpayOrderId: razorpayResponse.razorpay_order_id,
                razorpayPaymentId: razorpayResponse.razorpay_payment_id,
                razorpaySignature: razorpayResponse.razorpay_signature
              }

              const response = await paymentAPI.processPayment(orderData)
              
              if (response.data.success) {
                setPaymentStep('success')
                setPaymentMessage('Order placed successfully!')
                toast.success(response.data.message)
                clearAllItems()
                
                // Redirect after showing success
                setTimeout(() => {
                  navigate('/orders', { 
                    state: { 
                      message: 'Order placed successfully!',
                      orderId: response.data.data.order._id
                    }
                  })
                }, 2000)
              } else {
                setPaymentStep('error')
                setPaymentMessage(response.data.message || 'Failed to place order')
                toast.error(response.data.message || 'Failed to place order')
              }
            } catch (error) {
              console.error('Order processing error:', error)
              setPaymentStep('error')
              setPaymentMessage('Failed to process order. Please try again.')
              toast.error('Failed to process order. Please try again.')
            }
          },
          (error) => {
            console.error('Payment failed:', error)
            setPaymentStep('error')
            setPaymentMessage('Payment failed. Please try again.')
            toast.error('Payment failed. Please try again.')
          }
        )

        if (!success) {
          setPaymentStep('error')
          setPaymentMessage('Failed to initialize payment')
          toast.error('Failed to initialize payment')
        }
      } else if (paymentMethod === 'cod') {
        // Cash on Delivery
        setPaymentMessage('Processing your order...')
        try {
          const response = await paymentAPI.processPayment(paymentData)
          
          if (response.data.success) {
            setPaymentStep('success')
            setPaymentMessage('Order placed successfully!')
            toast.success(response.data.message)
            clearAllItems()
            
            // Redirect after showing success
            setTimeout(() => {
              navigate('/orders', { 
                state: { 
                  message: 'Order placed successfully!',
                  orderId: response.data.data.order._id
                }
              })
            }, 2000)
          } else {
            setPaymentStep('error')
            setPaymentMessage(response.data.message || 'Failed to place order')
            toast.error(response.data.message || 'Failed to place order')
          }
        } catch (error) {
          console.error('COD order error:', error)
          setPaymentStep('error')
          setPaymentMessage('Failed to place order. Please try again.')
          toast.error('Failed to place order. Please try again.')
        }
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setPaymentStep('error')
      setPaymentMessage('Something went wrong. Please try again.')
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Payment processing states
  if (paymentStep === 'processing') {
    const processingSteps = [
      { title: 'Order Details', description: 'Validating your order' },
      { title: 'Payment', description: 'Processing payment' },
      { title: 'Confirmation', description: 'Confirming order' }
    ]
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Processing Your Order</h2>
            <p className="text-gray-600">{paymentMessage}</p>
          </div>
          
          <PaymentSteps currentStep={1} steps={processingSteps} />
          
          <div className="space-y-2 text-sm text-gray-500 text-center">
            <p>• Validating your order details</p>
            <p>• Processing payment information</p>
            <p>• Confirming with our systems</p>
          </div>
        </div>
      </div>
    )
  }

  if (paymentStep === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Successful!</h2>
          <p className="text-gray-600 mb-6">{paymentMessage}</p>
          <p className="text-sm text-gray-500">Redirecting to your orders...</p>
        </div>
      </div>
    )
  }

  if (paymentStep === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Failed</h2>
          <p className="text-gray-600 mb-6">{paymentMessage}</p>
          <div className="space-y-3">
            <Button
              onClick={() => {
                setPaymentStep('form')
                setPaymentMessage('')
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Try Again
            </Button>
            <Button
              onClick={() => navigate('/cart')}
              variant="outline"
              className="w-full"
            >
              Back to Cart
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your purchase securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        {...register('fullName', { required: 'Full name is required' })}
                        type="text"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        {...register('phone', { 
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: 'Please enter a valid 10-digit phone number'
                          }
                        })}
                        type="tel"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Please enter a valid email address'
                        }
                      })}
                      type="email"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Address Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      {...register('street', { required: 'Street address is required' })}
                      type="text"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your street address"
                    />
                  </div>
                  {errors.street && (
                    <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      {...register('city', { required: 'City is required' })}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your city"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      {...register('state', { required: 'State is required' })}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your state"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PIN Code *
                    </label>
                    <input
                      {...register('pincode', { 
                        required: 'PIN code is required',
                        pattern: {
                          value: /^[0-9]{6}$/,
                          message: 'Please enter a valid 6-digit PIN code'
                        }
                      })}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter PIN code"
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-sm mt-1">{errors.pincode.message}</p>
                    )}
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Payment Method *
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="razorpay"
                        name="paymentMethod"
                        value="razorpay"
                        checked={paymentMethod === 'razorpay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <label htmlFor="razorpay" className="ml-3 flex items-center">
                        <CreditCard className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Online Payment</span>
                        <span className="ml-2 text-xs text-gray-500">(Credit/Debit Card, UPI, Net Banking)</span>
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                      />
                      <label htmlFor="cod" className="ml-3 flex items-center">
                        <Truck className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-700">Cash on Delivery</span>
                        <span className="ml-2 text-xs text-gray-500">(Pay when you receive)</span>
                      </label>
                    </div>
                  </div>
                  
                  {paymentMethod === 'razorpay' && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex items-start">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium">Secure Payment</p>
                          <p className="text-blue-600">Your payment information is encrypted and secure. We use Razorpay for all online transactions.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'cod' && (
                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <div className="flex items-start">
                        <Lock className="w-5 h-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                        <div className="text-sm text-yellow-800">
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-yellow-600">Pay with cash when your order is delivered. Additional ₹20 COD charge applies.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    {...register('notes')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Any special instructions for delivery..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading || paymentLoading || !paymentMethod}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading || paymentLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    `Proceed to ${paymentMethod === 'razorpay' ? 'Payment' : 'Order'}`
                  )}
                </Button>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6">
                {items && items.length > 0 ? (
                  items.map((item) => (
                    <div key={item._id || item.id} className="flex items-center space-x-3">
                      <img
                        src={getProductImage(item)}
                        alt={item.name || 'Product'}
                        className="w-12 h-12 rounded-md object-cover"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = aiImageUrl('organic product placeholder, simple minimal background', 600, 600, 1)
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{item.name || 'Product'}</h4>
                        <p className="text-sm text-gray-600">Qty: {item.quantity || 1}</p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency((item.price || 0) * (item.quantity || 1))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No items in cart</p>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatCurrency(totalPrice)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charge</span>
                  <span className="text-gray-900">
                    {deliveryCharge === 0 ? 'Free' : formatCurrency(deliveryCharge)}
                  </span>
                </div>
                
                {codCharge > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">COD Charge</span>
                    <span className="text-gray-900">{formatCurrency(codCharge)}</span>
                  </div>
                )}
                
                {totalSavings > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Total Savings</span>
                    <span>-{formatCurrency(totalSavings)}</span>
                  </div>
                )}
                
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Amount</span>
                    <span>{formatCurrency(finalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-gray-600 mt-0.5 mr-2 flex-shrink-0" />
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">Secure Checkout</p>
                    <p>Your payment information is protected with bank-level security.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout