import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Upload, Trash2, Edit, Archive, Tag, Package } from 'lucide-react'
import { toast } from 'react-hot-toast'

const BulkActions = () => {
  const [selectedAction, setSelectedAction] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const bulkActions = [
    {
      id: 'export',
      name: 'Export Products',
      description: 'Download product data as CSV/Excel',
      icon: <Download className="w-5 h-5" />,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'import',
      name: 'Import Products',
      description: 'Upload product data from file',
      icon: <Upload className="w-5 h-5" />,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'bulk-edit',
      name: 'Bulk Edit',
      description: 'Edit multiple products at once',
      icon: <Edit className="w-5 h-5" />,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'bulk-delete',
      name: 'Bulk Delete',
      description: 'Remove multiple products',
      icon: <Trash2 className="w-5 h-5" />,
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      id: 'bulk-archive',
      name: 'Bulk Archive',
      description: 'Archive multiple products',
      icon: <Archive className="w-5 h-5" />,
      color: 'bg-gray-500 hover:bg-gray-600'
    },
    {
      id: 'bulk-tag',
      name: 'Bulk Tag',
      description: 'Add/remove tags from products',
      icon: <Tag className="w-5 h-5" />,
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ]

  const handleBulkAction = async (actionId) => {
    setSelectedAction(actionId)
    setIsProcessing(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success(`${bulkActions.find(a => a.id === actionId)?.name} completed successfully!`)
    } catch (error) {
      toast.error('Failed to complete bulk action')
    } finally {
      setIsProcessing(false)
      setSelectedAction('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Package className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Bulk Actions</h3>
          <p className="text-sm text-gray-600">Manage multiple products at once</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bulkActions.map((action) => (
          <motion.button
            key={action.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleBulkAction(action.id)}
            disabled={isProcessing}
            className={`${action.color} text-white p-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <div className="flex items-center gap-3">
              {action.icon}
              <div className="text-left">
                <p className="font-medium">{action.name}</p>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </div>
            
            {isProcessing && selectedAction === action.id && (
              <div className="mt-3 flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span className="ml-2 text-sm">Processing...</span>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Stats</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Products', value: '89', color: 'text-blue-600' },
            { label: 'Active', value: '76', color: 'text-green-600' },
            { label: 'Draft', value: '8', color: 'text-yellow-600' },
            { label: 'Archived', value: '5', color: 'text-gray-600' }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className={`text-lg font-semibold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default BulkActions


