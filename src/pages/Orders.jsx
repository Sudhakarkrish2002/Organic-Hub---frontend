import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Clock, CheckCircle, Truck, MapPin, Calendar, DollarSign, Eye, RefreshCw } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import useOrders from '@/hooks/useOrders'

const Orders = () => {
  const { user } = useSelector((state) => state.auth)
  const { orders, loading, loadOrders } = useOrders()
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Sample orders data - replace with actual API call
  const sampleOrders = [
    {
      _id: 'order-1',
      orderNumber: 'OH-2024-001',
      items: [
        { name: 'Fresh Organic Tomatoes', quantity: 2, price: 120, image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=100&h=100&fit=crop' },
        { name: 'Organic Bananas', quantity: 1, price: 80, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100&h=100&fit=crop' }
      ],
      totalAmount: 320,
      status: 'delivered',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-17',
      shippingAddress: {
        fullName: 'John Doe',
        address: '123 Main Street',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600001'
      },
      paymentMethod: 'razorpay',
      paymentStatus: 'paid'
    },
    {
      _id: 'order-2',
      orderNumber: 'OH-2024-002',
      items: [
        { name: 'Fresh Spinach Leaves', quantity: 1, price: 60, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100&h=100&fit=crop' },
        { name: 'Organic Apples', quantity: 3, price: 200, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100&h=100&fit=crop' }
      ],
      totalAmount: 660,
      status: 'processing',
      orderDate: '2024-01-18',
      deliveryDate: '2024-01-20',
      shippingAddress: {
        fullName: 'John Doe',
        address: '123 Main Street',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600001'
      },
      paymentMethod: 'cod',
      paymentStatus: 'pending'
    },
    {
      _id: 'order-3',
      orderNumber: 'OH-2024-003',
      items: [
        { name: 'Fresh Carrots', quantity: 2, price: 90, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=100&h=100&fit=crop' }
      ],
      totalAmount: 180,
      status: 'shipped',
      orderDate: '2024-01-20',
      deliveryDate: '2024-01-22',
      shippingAddress: {
        fullName: 'John Doe',
        address: '123 Main Street',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600001'
      },
      paymentMethod: 'razorpay',
      paymentStatus: 'paid'
    }
  ]

  useEffect(() => {
    // Load orders - replace with actual API call
    loadOrders(sampleOrders)
  }, [loadOrders])

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

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus)

  const statusFilters = [
    { value: 'all', label: 'All Orders', count: orders.length },
    { value: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { value: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
    { value: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { value: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length }
  ]

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
                        <div className={`p-3 rounded-full ${getStatusColor(order.status)}`}>
                          {React.createElement(getStatusIcon(order.status), { className: 'w-6 h-6' })}
                        </div>
                        <div>
                          <h3 className="text-lg font-heading text-green-800">{order.orderNumber}</h3>
                          <p className="text-sm text-gray-600 font-body">
                            Ordered on {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-accent ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
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
                      {order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
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
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Delivery Address</p>
                            <p className="text-xs text-gray-600 font-body">
                              {order.shippingAddress.fullName}<br />
                              {order.shippingAddress.address}, {order.shippingAddress.city}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">Expected Delivery</p>
                            <p className="text-xs text-gray-600 font-body">
                              {new Date(order.deliveryDate).toLocaleDateString()}
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
