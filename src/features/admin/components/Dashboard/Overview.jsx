import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, TrendingUp, MapPin, ShoppingBag, Star } from 'lucide-react'

const Overview = () => {
  const overviewData = {
    sales: {
      today: 12450,
      week: 87500,
      month: 325000,
      growth: '+18.5%'
    },
    orders: {
      today: 47,
      week: 312,
      month: 1247,
      growth: '+22.3%'
    },
    customers: {
      today: 12,
      week: 89,
      month: 456,
      growth: '+15.7%'
    }
  }

  const recentOrders = [
    { id: 'ORD001', customer: 'John Doe', amount: 1240, status: 'pending', time: '2 min ago' },
    { id: 'ORD002', customer: 'Jane Smith', amount: 890, status: 'processing', time: '15 min ago' },
    { id: 'ORD003', customer: 'Mike Johnson', amount: 2100, status: 'completed', time: '1 hour ago' },
    { id: 'ORD004', customer: 'Sarah Wilson', amount: 650, status: 'pending', time: '2 hours ago' }
  ]

  const topCategories = [
    { name: 'Vegetables', sales: 45, revenue: 54000, icon: '🥦' },
    { name: 'Fruits', sales: 38, revenue: 76000, icon: '🍎' },
    { name: 'Dairy', sales: 32, revenue: 25600, icon: '🥛' },
    { name: 'Grains', sales: 28, revenue: 16800, icon: '🌾' },
    { name: 'Natural', sales: 25, revenue: 87500, icon: '🍯' }
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
      processing: { color: 'bg-blue-100 text-blue-800', text: 'Processing' },
      completed: { color: 'bg-green-100 text-green-800', text: 'Completed' }
    }
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.text}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Sales Overview', data: overviewData.sales, icon: <TrendingUp className="w-6 h-6" />, color: 'bg-green-500' },
          { title: 'Orders Overview', data: overviewData.orders, icon: <ShoppingBag className="w-6 h-6" />, color: 'bg-blue-500' },
          { title: 'Customers Overview', data: overviewData.customers, icon: <Star className="w-6 h-6" />, color: 'bg-purple-500' }
        ].map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              <div className={`p-2 rounded-lg ${section.color}`}>
                {section.icon}
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Today</span>
                <span className="text-lg font-semibold text-gray-900">
                  {section.title.includes('Sales') ? `₹${(section.data.today / 1000).toFixed(1)}K` : section.data.today}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="text-sm font-medium text-gray-900">
                  {section.title.includes('Sales') ? `₹${(section.data.week / 1000).toFixed(1)}K` : section.data.week}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Month</span>
                <span className="text-sm font-medium text-gray-900">
                  {section.title.includes('Sales') ? `₹${(section.data.month / 1000).toFixed(1)}K` : section.data.month}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Growth</span>
                  <span className="text-sm font-medium text-green-600">{section.data.growth}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders & Top Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.id} • {order.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">₹{order.amount}</p>
                  {getStatusBadge(order.status)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Categories */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Categories</h3>
            <MapPin className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topCategories.map((category, index) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">{category.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{category.name}</p>
                    <p className="text-xs text-gray-500">{category.sales}% of sales</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">₹{(category.revenue / 1000).toFixed(1)}K</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Peak Hours', value: '2 PM - 6 PM', icon: <Clock className="w-5 h-5 text-blue-600" /> },
            { label: 'Best Day', value: 'Saturday', icon: <Calendar className="w-5 h-5 text-green-600" /> },
            { label: 'Avg. Rating', value: '4.8/5', icon: <Star className="w-5 h-5 text-yellow-600" /> },
            { label: 'Return Rate', value: '1.8%', icon: <ShoppingBag className="w-5 h-5 text-purple-600" /> }
          ].map((insight, index) => (
            <div key={insight.label} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-center mb-2">
                {insight.icon}
              </div>
              <p className="text-lg font-semibold text-gray-900">{insight.value}</p>
              <p className="text-sm text-gray-600">{insight.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Overview


