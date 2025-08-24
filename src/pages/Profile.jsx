import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Edit, Package, Clock, CheckCircle, Truck, Eye } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import useOrders from '@/hooks/useOrders'
import Button from '@/components/UI/Button'
import toast from 'react-hot-toast'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { orders, loading, loadOrders } = useOrders()
  const [activeTab, setActiveTab] = useState('profile')
  const [selectedStatus, setSelectedStatus] = useState('all')

  useEffect(() => {
    // Load user's orders
    loadOrders()
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
      case 'processing': return Package
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
    : orders.filter(order => order.orderStatus === selectedStatus)

  const statusFilters = [
    { value: 'all', label: 'All Orders', count: orders.length },
    { value: 'pending', label: 'Pending', count: orders.filter(o => o.orderStatus === 'pending').length },
    { value: 'processing', label: 'Processing', count: orders.filter(o => o.orderStatus === 'processing').length },
    { value: 'shipped', label: 'Shipped', count: orders.filter(o => o.orderStatus === 'shipped').length },
    { value: 'delivered', label: 'Delivered', count: orders.filter(o => o.orderStatus === 'delivered').length }
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
              My Profile
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-body">
              Manage your account and view your orders
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-4 mb-8"
          >
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 rounded-lg font-accent text-sm transition-all duration-200 ${
                  activeTab === 'profile'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-3 rounded-lg font-accent text-sm transition-all duration-200 ${
                  activeTab === 'orders'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                }`}
              >
                My Orders ({orders.length})
              </button>
            </div>
          </motion.div>

          {/* Tab Content */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-heading text-green-800">Profile Information</h2>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="p-3 bg-green-100 rounded-full">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-body">Full Name</p>
                    <p className="font-heading text-green-800">{user?.name || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-body">Email Address</p>
                    <p className="font-heading text-green-800">{user?.email || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-body">Phone Number</p>
                    <p className="font-heading text-green-800">{user?.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="p-3 bg-green-100 rounded-full">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-body">Address</p>
                    <p className="font-heading text-green-800">{user?.address || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Order Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
              </div>

              {/* Order Filters */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
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
              </div>

              {/* Orders List */}
              <div className="space-y-6">
                {loading ? (
                  <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your orders...</p>
                  </div>
                ) : filteredOrders.length > 0 ? (
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
                          {order.items && order.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center gap-4">
                              <img
                                src={item.product?.images?.[0] || '/placeholder-product.jpg'}
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
                                  {order.shippingAddress?.street}<br />
                                  {order.shippingAddress?.city}, {order.shippingAddress?.state}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Package className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm font-medium text-gray-700">Payment Method</p>
                                <p className="text-xs text-gray-600 font-body capitalize">
                                  {order.paymentMethod} - {order.paymentStatus}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 text-gray-400">₹</div>
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
                    className="bg-white rounded-xl shadow-lg p-8 text-center"
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
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
