import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { CreditCard, Truck, MapPin, Phone, User, Mail, Shield, Lock, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import useCart from '@/hooks/useCart.jsx'
import useOrders from '@/hooks/useOrders'
import Button from '@/components/UI/Button'
import { formatCurrency } from '@/utils/bulkCalculator'
import toast from 'react-hot-toast'

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('razorpay')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { items, totalPrice, totalSavings, clearAllItems } = useCart()
  const { placeOrder } = useOrders()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm()
  
  const deliveryCharge = totalPrice >= 500 ? 0 : 50
  const finalAmount = totalPrice + deliveryCharge
  
  // Auto-fill form if user data exists
  useEffect(() => {
    // TODO: Get user data from auth context and auto-fill
    setValue('fullName', 'John Doe')
    setValue('email', 'john@example.com')
    setValue('phone', '9876543210')
  }, [setValue])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const orderData = {
        items: items.map(item => ({
          product: item._id || item.id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: {
          fullName: data.fullName,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
        },
        paymentMethod,
        totalAmount: finalAmount,
        deliveryCharge,
        savings: totalSavings
      }
      
      const order = await placeOrder(orderData)
      
      if (paymentMethod === 'razorpay') {
        // Initialize Razorpay payment
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY',
          amount: finalAmount * 100, // Convert to paise
          currency: 'INR',
          name: 'Organic Hub',
          description: `Order ${order.orderNumber || 'Payment'}`,
          order_id: order.razorpayOrderId || `order_${Date.now()}`,
          handler: (response) => {
            toast.success('Payment successful!')
            clearAllItems()
            navigate(`/orders/${order._id}`)
          },
          prefill: {
            name: data.fullName,
            email: data.email,
            contact: data.phone
          },
          theme: {
            color: '#16a34a'
          },
          modal: {
            ondismiss: () => {
              setLoading(false)
            }
          }
        }
        
        const razorpay = new window.Razorpay(options)
        razorpay.open()
      } else {
        // COD order
        toast.success('Order placed successfully!')
        clearAllItems()
        navigate(`/orders/${order._id}`)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  if (items.length === 0) {
    navigate('/cart')
    return null
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 sm:py-12">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <Link 
                to="/cart" 
                className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors font-accent"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Cart
              </Link>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-green-800 mb-4">
              Checkout
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-body">
              Complete your order and choose your preferred payment method
            </p>
          </motion.div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8"
              >
                <h2 className="text-xl sm:text-2xl font-heading text-green-800 mb-6 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-green-600" />
                  Delivery Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        {...register('fullName', { required: 'Full name is required' })}
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 font-body"
                        placeholder="Enter full name"
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Please enter a valid email address'
                          }
                        })}
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 font-body"
                        placeholder="Enter email address"
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        {...register('phone', { 
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: 'Please enter a valid 10-digit phone number'
                          }
                        })}
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 font-body"
                        placeholder="Enter phone number"
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Delivery Address *
                    </label>
                    <div className="relative">
                      <textarea
                        {...register('address', { required: 'Address is required' })}
                        className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 font-body min-h-[100px] resize-none"
                        placeholder="Enter complete delivery address"
                      />
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    </div>
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      City *
                    </label>
                    <input
                      {...register('city', { required: 'City is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 font-body"
                      placeholder="Enter city"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      State *
                    </label>
                    <input
                      {...register('state', { required: 'State is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 font-body"
                      placeholder="Enter state"
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Pincode *
                    </label>
                    <input
                      {...register('pincode', { 
                        required: 'Pincode is required',
                        pattern: {
                          value: /^\d{6}$/,
                          message: 'Please enter a valid 6-digit pincode'
                        }
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 font-body"
                      placeholder="Enter pincode"
                    />
                    {errors.pincode && (
                      <p className="mt-1 text-sm text-red-600">{errors.pincode.message}</p>
                    )}
                  </div>
                </div>
              </motion.div>
              
              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8"
              >
                <h2 className="text-xl sm:text-2xl font-heading text-green-800 mb-6 flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-green-600" />
                  Payment Method
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center p-4 border-2 border-green-200 rounded-lg bg-green-50">
                    <input
                      id="razorpay"
                      type="radio"
                      value="razorpay"
                      checked={paymentMethod === 'razorpay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <label htmlFor="razorpay" className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold text-green-800">Online Payment</p>
                          <p className="text-sm text-gray-600">Pay securely with cards, UPI, or digital wallets</p>
                        </div>
                        <div className="flex items-center gap-2 text-green-600">
                          <Shield className="w-5 h-5" />
                          <span className="text-sm font-medium">Secure</span>
                        </div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-green-200 hover:bg-green-50 transition-colors duration-200">
                    <input
                      id="cod"
                      type="radio"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <label htmlFor="cod" className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold text-gray-800">Cash on Delivery</p>
                          <p className="text-sm text-gray-600">Pay when you receive your order</p>
                        </div>
                        <div className="text-gray-500">
                          <span className="text-sm">Extra ₹20 charge</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 sticky top-4"
              >
                <h2 className="text-xl sm:text-2xl font-heading text-green-800 mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item._id || item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.image || item.images?.[0]}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-heading text-green-800 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-accent text-green-700">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">₹{totalPrice}</span>
                  </div>
                  
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Bulk Savings:</span>
                      <span>-₹{totalSavings}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Charge:</span>
                    <span className={deliveryCharge === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                      {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  
                  {paymentMethod === 'cod' && (
                    <div className="flex justify-between text-sm text-red-600">
                      <span>COD Charge:</span>
                      <span>₹20</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">
                      ₹{paymentMethod === 'cod' ? finalAmount + 20 : finalAmount}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <Button
                    type="submit"
                    className="w-full"
                    loading={loading}
                    disabled={loading}
                  >
                    {paymentMethod === 'cod' ? 'Place Order' : 'Proceed to Payment'}
                  </Button>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Lock className="w-4 h-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-heading text-green-800 mb-2">Delivery Information</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Free delivery on orders above ₹500</li>
                    <li>• Same day delivery for orders placed before 2 PM</li>
                    <li>• Next day delivery for orders placed after 2 PM</li>
                    <li>• Contact us for any delivery queries</li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Checkout