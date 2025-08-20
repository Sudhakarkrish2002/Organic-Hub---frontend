import api from './api'

const orderAPI = {
  createOrder: async (orderData) => {
    return await api.post('/orders', orderData)
  },
  
  getOrders: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return await api.get(`/orders?${queryString}`)
  },
  
  getOrder: async (orderId) => {
    return await api.get(`/orders/${orderId}`)
  },
  
  cancelOrder: async (orderId) => {
    return await api.patch(`/orders/${orderId}/cancel`)
  },
  
  trackOrder: async (orderId) => {
    return await api.get(`/orders/${orderId}/track`)
  }
}

export default orderAPI;