import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Clock, CheckCircle, Truck, MapPin, Calendar, DollarSign, Eye, RefreshCw, RotateCcw } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useOrders from '@/features/orders/hooks/useOrders'

const Orders = () => {
  const { user } = useSelector((state) => state.auth)
  const { orders, loading, loadOrders } = useOrders()
  const [selectedStatus, setSelectedStatus] = useState('all')

  useEffect(() => {
    // Load orders from backend
    loadOrders()
  }, []) // Remove loadOrders from dependency array to prevent infinite re-renders

  // Function to refresh orders (useful for updating existing orders)
  const refreshOrders = () => {
    console.log('🔄 Manually refreshing orders...')
    loadOrders()
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'processing': return 'text-blue-600 bg-blue-100'
      case 'shipped': return 'text-purple-600 bg-purple-100'
      case 'delivered': return 'text-green-600 bg-green-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return Clock
      case 'processing': return RefreshCw
      case 'shipped': return Truck
      case 'delivered': return CheckCircle
      case 'cancelled': return Package
      default: return Package
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pending'
      case 'processing': return 'Processing'
      case 'shipped': return 'Shipped'
      case 'delivered': return 'Delivered'
      case 'cancelled': return 'Cancelled'
      default: return 'Unknown'
    }
  }

  // Ensure orders is always an array
  const ordersArray = Array.isArray(orders) ? orders : []
  
  // Debug: Log orders data
  console.log('📦 Orders data:', ordersArray)
  console.log('📦 Orders array length:', ordersArray.length)
  console.log('🔍 Current user ID from localStorage:', localStorage.getItem('userId'))
  console.log('🔍 Current user from localStorage:', localStorage.getItem('user'))
  
  // Debug: Check first order structure
  if (ordersArray.length > 0) {
    console.log('🔍 First order structure:', ordersArray[0])
    console.log('🔍 First order items:', ordersArray[0].items)
  }
  
  const filteredOrders = selectedStatus === 'all' 
    ? ordersArray 
    : ordersArray.filter(order => order.orderStatus === selectedStatus)

  const statusFilters = [
    { value: 'all', label: 'All Orders', count: ordersArray.length },
    { value: 'pending', label: 'Pending', count: ordersArray.filter(o => o.orderStatus === 'pending').length },
    { value: 'processing', label: 'Processing', count: ordersArray.filter(o => o.orderStatus === 'processing').length },
    { value: 'shipped', label: 'Shipped', count: ordersArray.filter(o => o.orderStatus === 'shipped').length },
    { value: 'delivered', label: 'Delivered', count: ordersArray.filter(o => o.orderStatus === 'delivered').length }
  ]
  
  // Debug: Log status counts
  console.log('📊 Status counts:', {
    all: ordersArray.length,
    pending: ordersArray.filter(o => o.orderStatus === 'pending').length,
    processing: ordersArray.filter(o => o.orderStatus === 'processing').length,
    shipped: ordersArray.filter(o => o.orderStatus === 'shipped').length,
    delivered: ordersArray.filter(o => o.orderStatus === 'delivered').length
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 sm:py-12">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your orders...</p>
          </div>
        </div>
      </div>
    )
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
            className="text-center mb-8 sm:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-green-800 mb-4">
              My Orders
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-body">
              Track your orders and view order history
            </p>
            <button
              onClick={refreshOrders}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Refresh Orders
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
          >
            {statusFilters.slice(1).map((filter) => (
              <div key={filter.value} className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-body">{filter.label}</p>
                    <p className="text-2xl sm:text-3xl font-bold text-green-800">{filter.count}</p>
                  </div>
                  <div className={`p-3 rounded-full ${getStatusColor(filter.value)}`}>
                    {React.createElement(getStatusIcon(filter.value), { className: 'w-6 h-6' })}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8"
          >
            <div className="flex flex-wrap gap-2 sm:gap-4">
              {statusFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedStatus(filter.value)}
                  className={`px-4 py-2 rounded-lg font-accent text-sm transition-all duration-200 ${
                    selectedStatus === filter.value
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>
          </motion.div>

          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-4 sm:p-6 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${getStatusColor(order.orderStatus)}`}>
                          {React.createElement(getStatusIcon(order.orderStatus), { className: 'w-6 h-6' })}
                        </div>
                        <div>
                          <h3 className="text-lg font-heading text-green-800">{order.orderNumber}</h3>
                          <p className="text-sm text-gray-600 font-body">
                            Ordered on {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-accent ${getStatusColor(order.orderStatus)}`}>
                          {getStatusText(order.orderStatus)}
                        </span>
                        <Link
                          to={`/orders/${order._id}`}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 font-accent text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 sm:p-6">
                    <div className="space-y-4">
                      {order.items && order.items.map((item, itemIndex) => {
                        // Generate a fallback image based on product name if no image is available
                        const getFallbackImage = (productName) => {
                          if (!productName) return '/organic-logo.png'
                          
                          const name = productName.toLowerCase()
                          if (name.includes('oil') || name.includes('coconut')) return '/organic-logo.png'
                          if (name.includes('fruit') || name.includes('apple') || name.includes('banana')) return '/organic-logo.png'
                          if (name.includes('vegetable') || name.includes('tomato') || name.includes('potato')) return '/organic-logo.png'
                          if (name.includes('grain') || name.includes('rice') || name.includes('wheat')) return '/organic-logo.png'
                          if (name.includes('dairy') || name.includes('milk') || name.includes('cheese')) return '/organic-logo.png'
                          
                          return '/organic-logo.png'
                        }
                        
                        const imageSrc = item.product?.images?.[0] || 
                                        item.images?.[0] || 
                                        item.image || 
                                        getFallbackImage(item.name)
                        
                        console.log('🖼️ Order item image data:', {
                          itemName: item.name,
                          productImages: item.product?.images,
                          itemImages: item.images,
                          itemImage: item.image,
                          finalSrc: imageSrc
                        })
                        return (
                          <div key={itemIndex} className="flex items-center gap-4">
                          <img
                            src={imageSrc}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                            onError={(e) => {
                              e.currentTarget.onerror = null
                              e.currentTarget.src = '/organic-logo.png'
                            }}
                          />
                          <div className="flex-1">
                            <h4 className="font-heading text-green-800">{item.name}</h4>
                            <p className="text-sm text-gray-600 font-body">
                              Quantity: {item.quantity} × ₹{item.price}
                            </p>
                          </div>
                                                      <div className="text-right">
                              <p className="font-accent text-green-700">₹{item.quantity * item.price}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Delivery Address</p>
                            <p className="text-xs text-gray-600 font-body">
                              {order.shippingAddress?.street}<br />
                              {order.shippingAddress?.city}, {order.shippingAddress?.state}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Payment Method</p>
                            <p className="text-xs text-gray-600 font-body capitalize">
                              {order.paymentMethod} - {order.paymentStatus}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <DollarSign className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Total Amount</p>
                            <p className="text-lg font-bold text-green-700">₹{order.totalAmount}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-2xl font-heading text-green-800 mb-2">No orders found</h3>
                <p className="text-gray-600 font-body mb-6">
                  {selectedStatus === 'all' 
                    ? "You haven't placed any orders yet." 
                    : `No ${selectedStatus} orders found.`
                  }
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 font-accent"
                >
                  Start Shopping
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
