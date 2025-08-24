import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, Eye, Star } from 'lucide-react'

const QuickStats = () => {
  const stats = [
    {
      title: 'Today\'s Revenue',
      value: '₹12,450',
      change: '+15.3%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6 text-white" />,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Today\'s Orders',
      value: '47',
      change: '+8.2%',
      trend: 'up',
      icon: <ShoppingCart className="w-6 h-6 text-white" />,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'New Customers',
      value: '12',
      change: '+23.1%',
      trend: 'up',
      icon: <Users className="w-6 h-6 text-white" />,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Low Stock Items',
      value: '8',
      change: '-12.5%',
      trend: 'down',
      icon: <Package className="w-6 h-6 text-white" />,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    }
  ]

  const quickMetrics = [
    { label: 'Average Order Value', value: '₹2,847', icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Customer Satisfaction', value: '4.8/5', icon: <Star className="w-4 h-4" /> },
    { label: 'Conversion Rate', value: '3.2%', icon: <Eye className="w-4 h-4" /> },
    { label: 'Return Rate', value: '1.8%', icon: <Package className="w-4 h-4" /> }
  ]

  return (
    <div className="space-y-6">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-xl border border-gray-200 p-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs yesterday</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickMetrics.map((metric, index) => (
            <div key={metric.label} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {metric.icon}
                </div>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Real-time Updates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time Updates</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-800">New order received</span>
            </div>
            <span className="text-xs text-green-600">Just now</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-800">Payment processed</span>
            </div>
            <span className="text-xs text-blue-600">2 min ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-purple-800">New customer registered</span>
            </div>
            <span className="text-xs text-purple-600">5 min ago</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default QuickStats


