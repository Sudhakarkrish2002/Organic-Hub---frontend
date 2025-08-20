import api from './api'

const cartAPI = {
  getCart: async () => {
    return await api.get('/cart')
  },
  
  addToCart: async (productId, quantity = 1) => {
    return await api.post('/cart/add', { productId, quantity })
  },
  
  updateCartItem: async (itemId, quantity) => {
    return await api.put(`/cart/items/${itemId}`, { quantity })
  },
  
  removeFromCart: async (itemId) => {
    return await api.delete(`/cart/items/${itemId}`)
  },
  
  clearCart: async () => {
    return await api.delete('/cart')
  },
  
  applyCoupon: async (couponCode) => {
    return await api.post('/cart/coupon', { couponCode })
  }
}

export default cartAPI;