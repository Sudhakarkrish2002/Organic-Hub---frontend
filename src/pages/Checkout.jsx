import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { CreditCard, Truck, MapPin, Phone, User } from 'lucide-react'
import useCart from '@/hooks/useCart'
import useOrders from '@/hooks/useOrders'
import Button from '@/components/UI/Button'
import { formatCurrency } from '@/utils/bulkCalculator'
import toast from 'react-hot-toast'

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('razorpay')
  const navigate = useNavigate()
  const { items, totalPrice, totalSavings, clearAllItems } = useCart()
  const { placeOrder, loading } = useOrders()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  
  const deliveryCharge = totalPrice >= 500 ? 0 : 50
  const finalAmount = totalPrice + deliveryCharge
  
  const onSubmit = async (data) => {
    try {
      const orderData = {
        items: items.map(item => ({
          product: item._id,
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
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: finalAmount * 100, // Convert to paise
          currency: 'INR',
          name: 'Organic Hub',
          description: 'Order Payment',
          order_id: order.razorpayOrderId,
          handler: (response) => {
            toast.success('Payment successful!')
            clearAllItems()
            navigate(`/orders/${order._id}`)
          },
          prefill: {
            name: data.fullName,
            email: data.email,
            contact: data.phone
          }
        }
        
        const razorpay = new window.Razorpay(options)
        razorpay.open()
      } else {
        // COD order
        clearAllItems()
        navigate(`/orders/${order._id}`)
      }
    } catch (error) {
      toast.error('Failed to place order')
    }
  }
  
  if (items.length === 0) {
    navigate('/cart')
    return null
  }
  
  return (
    <div className="min-h-screen bg-green-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-green-800 mb-8">Checkout</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shipping Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Delivery Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        {...register('fullName', { required: 'Full name is required' })}
                        className="input-organic w-full pl-10"
                        placeholder="Enter full name"
                      />
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        {...register('phone', { 
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: 'Please enter a valid phone number'
                          }
                        })}
                        className="input-organic w-full pl-10"
                        placeholder="Enter phone number"
                      />
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <textarea
                        {...register('address', { required: 'Address is required' })}
                        className="input-organic w-full pl-10 min-h-[100px]"
                        placeholder="Enter full address"
                      />
                      <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    </div>
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-2">
                        City
                      </label>
                      <input
                        {...register('city', { required: 'City is required' })}
                        className="input-organic w-full"
                        placeholder="Enter city"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-green-700 mb-2">
                        State
                      </label>
                      <input
                        {...register('state', { required: 'State is required' })}
                        className="input-organic w-full"
                        placeholder="Enter state"
                      />
                      {errors.state && (
                        <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-green-700 mb-2">
                      Pincode
                    </label>
                    <input
                      {...register('pincode', { 
                        required: 'Pincode is required',
                        pattern: {
                          value: /^\d{6}$/,
                          message: 'Please enter a valid 6-digit pincode'
                        }
                      })}
                      className="input-organic w-full"
                      placeholder="Enter pincode"
                    />
                    {errors.pincode && (
                      <p className="mt-1 text-sm text-red-600">{errors.pincode.message}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h2>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="razorpay"
                      type="radio"
                      value="razorpay"
                      checked={paymentMethod === 'razorpay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <label htmlFor="razorpay" className="ml-3 block text-sm font-medium text-gray-700">
                      Online Payment (Card/UPI/Wallet)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="cod"
                      type="radio"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                    />
                    <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
                      Cash on Delivery
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-green-800 mb-4">
                  Order Summary
                </h2>
                
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item._id} className="flex justify-between">
                      <span className="text-sm text-gray-600">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-sm font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Bulk Savings:</span>
                      <span>-{formatCurrency(totalSavings)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Delivery Charge:</span>
                    <span>
                      {deliveryCharge === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        formatCurrency(deliveryCharge)
                      )}
                    </span>
                  </div>
                  
                  <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-green-600">{formatCurrency(finalAmount)}</span>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full mt-6"
                  loading={loading}
                >
                  {paymentMethod === 'cod' ? 'Place Order' : 'Proceed to Payment'}
                </Button>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  By placing your order, you agree to our Terms & Conditions
                </p>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Checkout;