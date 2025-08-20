import api from './api'

const paymentAPI = {
  createRazorpayOrder: async (amount, currency = 'INR') => {
    return await api.post('/payments/create-order', { amount, currency })
  },
  
  verifyPayment: async (paymentData) => {
    return await api.post('/payments/verify', paymentData)
  },
  
  processPayment: async (orderData) => {
    return await api.post('/payments/process', orderData)
  }
}

export default paymentAPI;
