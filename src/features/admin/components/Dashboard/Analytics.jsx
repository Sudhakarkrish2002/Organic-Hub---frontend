import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from 'lucide-react'

const Analytics = () => {
  // Sample analytics data
  const analyticsData = {
    revenue: {
      current: 125000,
      previous: 98000,
      change: '+27.6%',
      trend: 'up'
    },
    orders: {
      current: 1247,
      previous: 892,
      change: '+39.8%',
      trend: 'up'
    },
    customers: {
      current: 456,
      previous: 398,
      change: '+14.6%',
      trend: 'up'
    },
    products: {
      current: 89,
      previous: 76,
      change: '+17.1%',
      trend: 'up'
    }
  }

  const monthlyData = [
    { month: 'Jan', revenue: 85000, orders: 650 },
    { month: 'Feb', revenue: 92000, orders: 720 },
    { month: 'Mar', revenue: 78000, orders: 580 },
    { month: 'Apr', revenue: 105000, orders: 890 },
    { month: 'May', revenue: 118000, orders: 1020 },
    { month: 'Jun', revenue: 125000, orders: 1247 }
  ]

  const topProducts = [
    { name: 'Organic Tomatoes', sales: 234, revenue: 28080 },
    { name: 'Fresh Apples', sales: 189, revenue: 37800 },
    { name: 'Pure Honey', sales: 156, revenue: 54600 },
    { name: 'Organic Milk', sales: 143, revenue: 11440 },
    { name: 'Fresh Bread', sales: 98, revenue: 5880 }
  ]

  const recentActivity = [
    { type: 'order', message: 'New order #ORD001 received', time: '2 minutes ago' },
    { type: 'payment', message: 'Payment completed for order #ORD002', time: '15 minutes ago' },
    { type: 'user', message: 'New user registration: jane@example.com', time: '1 hour ago' },
    { type: 'product', message: 'Product "Organic Spinach" stock updated', time: '2 hours ago' }
  ]

  const getMetricCard = (title, data, icon, color) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">
            {title.includes('Revenue') ? `₹${(data.current / 1000).toFixed(0)}K` : data.current}
          </p>
          <div className="flex items-center mt-2">
            {data.trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${
              data.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {data.change}
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  )

  const getActivityIcon = (type) => {
    switch (type) {
      case 'order': return <ShoppingCart className="w-4 h-4 text-blue-600" />
      case 'payment': return <DollarSign className="w-4 h-4 text-green-600" />
      case 'user': return <Users className="w-4 h-4 text-purple-600" />
      case 'product': return <Package className="w-4 h-4 text-orange-600" />
      default: return <Package className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getMetricCard('Total Revenue', analyticsData.revenue, <DollarSign className="w-6 h-6 text-white" />, 'bg-green-500')}
        {getMetricCard('Total Orders', analyticsData.orders, <ShoppingCart className="w-6 h-6 text-white" />, 'bg-blue-500')}
        {getMetricCard('Total Customers', analyticsData.customers, <Users className="w-6 h-6 text-white" />, 'bg-purple-500')}
        {getMetricCard('Total Products', analyticsData.products, <Package className="w-6 h-6 text-white" />, 'bg-orange-500')}
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="space-y-3">
            {monthlyData.map((month, index) => (
              <div key={month.month} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{month.month}</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(month.revenue / 125000) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">₹{(month.revenue / 1000).toFixed(0)}K</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-green-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} units sold</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">₹{product.revenue}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
            <div className="text-center">
              <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-green-800">Add Product</p>
            </div>
          </button>
          <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
            <div className="text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-800">Manage Users</p>
            </div>
          </button>
          <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors">
            <div className="text-center">
              <ShoppingCart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-purple-800">View Orders</p>
            </div>
          </button>
        </div>
      </motion.div>
  </div>
)
}

export default Analytics


