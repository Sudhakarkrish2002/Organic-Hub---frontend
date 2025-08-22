import React, { createContext, useContext, useState, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  XCircle, 
  Bell,
  ShoppingCart,
  Package,
  Truck,
  Star,
  Heart
} from 'lucide-react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const getToastStyle = (type) => {
    const baseStyle = {
      style: {
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        border: '1px solid',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        minWidth: '300px'
      }
    }

    switch (type) {
      case 'success':
        return {
          ...baseStyle,
          style: {
            ...baseStyle.style,
            backgroundColor: '#f0fdf4',
            borderColor: '#bbf7d0',
            color: '#166534'
          }
        }
      case 'error':
        return {
          ...baseStyle,
          style: {
            ...baseStyle.style,
            backgroundColor: '#fef2f2',
            borderColor: '#fecaca',
            color: '#dc2626'
          }
        }
      case 'warning':
        return {
          ...baseStyle,
          style: {
            ...baseStyle.style,
            backgroundColor: '#fffbeb',
            borderColor: '#fed7aa',
            color: '#d97706'
          }
        }
      case 'info':
        return {
          ...baseStyle,
          style: {
            ...baseStyle.style,
            backgroundColor: '#eff6ff',
            borderColor: '#bfdbfe',
            color: '#1d4ed8'
          }
        }
      default:
        return baseStyle
    }
  }

  // Basic toast notifications
  const notify = useCallback((message, type = 'success', options = {}) => {
    const icon = getToastIcon(type)
    const style = getToastStyle(type)
    
    toast(
      <div className="flex items-center gap-3">
        {icon}
        <span>{message}</span>
      </div>,
      {
        duration: options.duration || 4000,
        position: options.position || 'top-right',
        ...style,
        ...options
      }
    )
  }, [])

  const success = useCallback((message, options = {}) => {
    notify(message, 'success', options)
  }, [notify])

  const error = useCallback((message, options = {}) => {
    notify(message, 'error', options)
  }, [notify])

  const warning = useCallback((message, options = {}) => {
    notify(message, 'warning', options)
  }, [notify])

  const info = useCallback((message, options = {}) => {
    notify(message, 'info', options)
  }, [notify])

  // E-commerce specific notifications
  const cartNotification = useCallback((message, type = 'success') => {
    const icon = <ShoppingCart className="w-5 h-5 text-green-500" />
    notify(
      <div className="flex items-center gap-3">
        {icon}
        <span>{message}</span>
      </div>,
      type,
      { duration: 3000 }
    )
  }, [notify])

  const orderNotification = useCallback((message, type = 'success') => {
    const icon = <Package className="w-5 h-5 text-blue-500" />
    notify(
      <div className="flex items-center gap-3">
        {icon}
        <span>{message}</span>
      </div>,
      type,
      { duration: 5000 }
    )
  }, [notify])

  const deliveryNotification = useCallback((message, type = 'info') => {
    const icon = <Truck className="w-5 h-5 text-purple-500" />
    notify(
      <div className="flex items-center gap-3">
        {icon}
        <span>{message}</span>
      </div>,
      type,
      { duration: 6000 }
    )
  }, [notify])

  const reviewNotification = useCallback((message, type = 'success') => {
    const icon = <Star className="w-5 h-5 text-yellow-500" />
    notify(
      <div className="flex items-center gap-3">
        {icon}
        <span>{message}</span>
      </div>,
      type,
      { duration: 4000 }
    )
  }, [notify])

  const wishlistNotification = useCallback((message, type = 'success') => {
    const icon = <Heart className="w-5 h-5 text-red-500" />
    notify(
      <div className="flex items-center gap-3">
        {icon}
        <span>{message}</span>
      </div>,
      type,
      { duration: 3000 }
    )
  }, [notify])

  // Persistent notifications (stored in state)
  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...notification
    }
    
    setNotifications(prev => [newNotification, ...prev])
    setUnreadCount(prev => prev + 1)
    
    // Auto-remove after specified duration
    if (notification.autoRemove !== false) {
      setTimeout(() => {
        removeNotification(newNotification.id)
      }, notification.duration || 10000)
    }
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const markAsRead = useCallback((id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }, [])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
    setUnreadCount(0)
  }, [])

  // Bulk operations notifications
  const bulkOperationNotification = useCallback((operation, count, type = 'success') => {
    const messages = {
      add: `Added ${count} item${count > 1 ? 's' : ''} to cart`,
      remove: `Removed ${count} item${count > 1 ? 's' : ''} from cart`,
      update: `Updated ${count} item${count > 1 ? 's' : ''}`,
      delete: `Deleted ${count} item${count > 1 ? 's' : ''}`,
      import: `Imported ${count} item${count > 1 ? 's' : ''}`,
      export: `Exported ${count} item${count > 1 ? 's' : ''}`
    }
    
    notify(messages[operation] || operation, type)
  }, [notify])

  // Form validation notifications
  const formError = useCallback((field, message) => {
    error(`${field}: ${message}`)
  }, [error])

  const formSuccess = useCallback((message) => {
    success(message)
  }, [success])

  // Loading states
  const showLoading = useCallback((message = 'Loading...') => {
    return toast.loading(message, {
      style: {
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        color: '#475569'
      }
    })
  }, [])

  const dismissLoading = useCallback((toastId) => {
    toast.dismiss(toastId)
  }, [])

  const value = {
    // Basic notifications
    notify,
    success,
    error,
    warning,
    info,
    
    // E-commerce specific
    cartNotification,
    orderNotification,
    deliveryNotification,
    reviewNotification,
    wishlistNotification,
    
    // Persistent notifications
    notifications,
    unreadCount,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    
    // Bulk operations
    bulkOperationNotification,
    
    // Form notifications
    formError,
    formSuccess,
    
    // Loading states
    showLoading,
    dismissLoading
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

export default NotificationContext


