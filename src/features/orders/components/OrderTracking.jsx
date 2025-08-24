import React from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  CheckCircle2, 
  Clock, 
  Truck, 
  MapPin, 
  Phone,
  Calendar,
  AlertCircle
} from 'lucide-react'

const OrderTracking = ({ 
  status = 'Processing', 
  orderNumber = 'ORD-12345',
  estimatedDelivery = '2024-01-20',
  currentLocation = 'Mumbai Hub',
  courierName = 'Express Delivery',
  courierPhone = '+91 98765 43210',
  trackingNumber = 'TRK123456789'
}) => {
  const steps = [
    { 
      key: 'Processing', 
      label: 'Order Confirmed', 
      description: 'Your order has been confirmed and is being processed',
      icon: Package,
      color: 'bg-blue-500'
    },
    { 
      key: 'Packed', 
      label: 'Order Packed', 
      description: 'Your order has been packed and is ready for shipping',
      icon: Package,
      color: 'bg-yellow-500'
    },
    { 
      key: 'Shipped', 
      label: 'Order Shipped', 
      description: 'Your order is on its way to you',
      icon: Truck,
      color: 'bg-purple-500'
    },
    { 
      key: 'Delivered', 
      label: 'Order Delivered', 
      description: 'Your order has been delivered successfully',
      icon: CheckCircle2,
      color: 'bg-green-500'
    }
  ]

  const getCurrentStepIndex = () => {
    return steps.findIndex(step => step.key === status)
  }

  const currentStepIndex = getCurrentStepIndex()

  const getStatusColor = (stepIndex) => {
    if (stepIndex < currentStepIndex) return 'text-green-600 bg-green-100 border-green-300'
    if (stepIndex === currentStepIndex) return 'text-blue-600 bg-blue-100 border-blue-300'
    return 'text-gray-400 bg-gray-100 border-gray-200'
  }

  const getIconColor = (stepIndex) => {
    if (stepIndex < currentStepIndex) return 'text-green-600'
    if (stepIndex === currentStepIndex) return 'text-blue-600'
    return 'text-gray-400'
  }

  const getProgressPercentage = () => {
    if (currentStepIndex === -1) return 0
    return ((currentStepIndex + 1) / steps.length) * 100
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">Order Tracking</h3>
          <span className="text-sm text-gray-500">#{orderNumber}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Estimated Delivery: {new Date(estimatedDelivery).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Status: {status}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${getProgressPercentage()}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-2 text-center">
          {Math.round(getProgressPercentage())}% Complete
        </div>
      </div>

      {/* Tracking Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const IconComponent = step.icon
          const isCompleted = index <= currentStepIndex
          const isCurrent = index === currentStepIndex
          
          return (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex items-start gap-4 p-4 rounded-lg border-2 transition-all duration-300 ${
                getStatusColor(index)
              }`}
            >
              {/* Step Icon */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                isCompleted ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-gray-100'
              }`}>
                <IconComponent className={`w-5 h-5 ${getIconColor(index)}`} />
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900">{step.label}</h4>
                  {isCurrent && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Current
                    </span>
                  )}
                  {isCompleted && (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                
                {/* Step-specific details */}
                {isCurrent && step.key === 'Shipped' && (
                  <div className="bg-blue-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Truck className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Current Location:</span>
                      <span className="text-blue-700">{currentLocation}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Package className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Courier:</span>
                      <span className="text-blue-700">{courierName}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Step Status */}
              <div className="flex-shrink-0 text-right">
                {isCompleted ? (
                  <div className="text-green-600 text-sm font-medium">✓ Completed</div>
                ) : isCurrent ? (
                  <div className="text-blue-600 text-sm font-medium">In Progress</div>
                ) : (
                  <div className="text-gray-400 text-sm">Pending</div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Delivery Information */}
      {status === 'Shipped' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 rounded-lg p-4 border border-blue-200"
        >
          <h4 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Delivery Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700">{currentLocation}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700">{courierName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700">{courierPhone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700">Track: {trackingNumber}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
        <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
          Track on Courier Website
        </button>
        <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium">
          Download Invoice
        </button>
        <button className="flex-1 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors font-medium">
          Contact Support
        </button>
      </div>
    </div>
  )
}

export default OrderTracking


