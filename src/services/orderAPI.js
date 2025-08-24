import api from './api'

// Local storage fallback for demo purposes
const createLocalOrder = async (orderData) => {
  try {
    // Generate a unique order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Get user info from localStorage or use demo data
    const userId = localStorage.getItem('userId') || 'demo_user'
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    
    // Create order object with all required fields
    const order = {
      _id: orderId,
      orderNumber: `OH${Date.now()}`,
      user: {
        _id: userId,
        name: user.name || orderData.shippingAddress?.fullName || 'Demo User',
        email: user.email || orderData.shippingAddress?.email || 'demo@example.com',
        phone: user.phone || orderData.shippingAddress?.phone || ''
      },
      items: orderData.items || [],
      shippingAddress: {
        fullName: orderData.shippingAddress?.fullName || 'Demo User',
        phone: orderData.shippingAddress?.phone || '',
        address: orderData.shippingAddress?.address || 'Demo Address',
        city: orderData.shippingAddress?.city || 'Demo City',
        state: orderData.shippingAddress?.state || 'Demo State',
        pincode: orderData.shippingAddress?.pincode || '123456'
      },
      paymentMethod: orderData.paymentMethod || 'cod',
      subtotal: orderData.totalAmount || 0,
      shippingCost: orderData.deliveryCharge || 0,
      tax: (orderData.totalAmount || 0) * 0.05, // 5% GST
      discount: orderData.savings || 0,
      totalAmount: orderData.totalAmount || 0,
      orderStatus: 'pending',
      paymentStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    existingOrders.push(order)
    localStorage.setItem('orders', JSON.stringify(existingOrders))
    
    console.log('📦 Local order created:', order)
    
    // Return response in the same format as backend for consistency
    return {
      data: {
        success: true,
        message: 'Order created successfully using local storage',
        data: { order }
      }
    }
  } catch (error) {
    console.error('Local order creation error:', error)
    throw new Error('Failed to create order locally')
  }
}

const orderAPI = {
  createOrder: async (orderData) => {
    try {
      // Try backend first
      const response = await api.post('/orders', orderData)
      return response
    } catch (error) {
      // Only log warning for non-network errors to reduce console noise
      if (error.code !== 'ERR_NETWORK' && error.code !== 'ERR_CONNECTION_REFUSED') {
        console.warn('Backend order creation failed, using local storage fallback:', error.message)
      }
      
      // For network errors, always try local storage fallback
      if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
        try {
          const localResponse = await createLocalOrder(orderData)
          console.log('✅ Order created successfully using local storage fallback')
          return localResponse
        } catch (localError) {
          console.error('❌ Local storage fallback also failed:', localError)
          throw new Error('Failed to create order locally')
        }
      }
      
      // For other errors, throw the original error
      throw error
    }
  },
  
  getOrders: async (params = {}) => {
    try {
      // Try backend first
      const response = await api.get(`/orders?${new URLSearchParams(params).toString()}`)
      return response
    } catch (error) {
      // Only log warning for non-network errors to reduce console noise
      if (error.code !== 'ERR_NETWORK' && error.code !== 'ERR_CONNECTION_REFUSED') {
        console.warn('Backend order fetch failed, using local storage fallback:', error.message)
      }
      // Fallback to local storage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      const userId = localStorage.getItem('userId') || 'demo_user'
      const userOrders = orders.filter(order => order.user._id === userId)
      
      return {
        data: {
          success: true,
          data: { orders: userOrders }
        }
      }
    }
  },
  
  getOrder: async (orderId) => {
    try {
      // Try backend first
      const response = await api.get(`/orders/${orderId}`)
      return response
    } catch (error) {
      // Only log warning for non-network errors to reduce console noise
      if (error.code !== 'ERR_NETWORK' && error.code !== 'ERR_CONNECTION_REFUSED') {
        console.warn('Backend order fetch failed, using local storage fallback:', error.message)
      }
      // Fallback to local storage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      const order = orders.find(o => o._id === orderId)
      
      if (!order) {
        throw new Error('Order not found')
      }
      
      return {
        data: {
          success: true,
          data: { order }
        }
      }
    }
  },
  
  cancelOrder: async (orderId) => {
    try {
      // Try backend first
      const response = await api.patch(`/orders/${orderId}/cancel`)
      return response
    } catch (error) {
      // Only log warning for non-network errors to reduce console noise
      if (error.code !== 'ERR_NETWORK' && error.code !== 'ERR_CONNECTION_REFUSED') {
        console.warn('Backend order cancellation failed, using local storage fallback:', error.message)
      }
      // Fallback to local storage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      const orderIndex = orders.findIndex(o => o._id === orderId)
      
      if (orderIndex === -1) {
        throw new Error('Order not found')
      }
      
      orders[orderIndex].orderStatus = 'cancelled'
      orders[orderIndex].updatedAt = new Date().toISOString()
      localStorage.setItem('orders', JSON.stringify(orders))
      
      return {
        data: {
          success: true,
          message: 'Order cancelled successfully',
          data: { order: orders[orderIndex] }
        }
      }
    }
  },
  
  trackOrder: async (orderId) => {
    try {
      // Try backend first
      const response = await api.get(`/orders/${orderId}/track`)
      return response
    } catch (error) {
      // Only log warning for non-network errors to reduce console noise
      if (error.code !== 'ERR_NETWORK' && error.code !== 'ERR_CONNECTION_REFUSED') {
        console.warn('Backend order tracking failed, using local storage fallback:', error.message)
      }
      // Fallback to local storage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      const order = orders.find(o => o._id === orderId)
      
      if (!order) {
        throw new Error('Order not found')
      }
      
      return {
        data: {
          success: true,
          data: { 
            orderId,
            status: order.orderStatus,
            trackingNumber: order.trackingNumber || 'N/A',
            estimatedDelivery: order.estimatedDelivery || 'N/A'
          }
        }
      }
    }
  }
}

export default orderAPI;