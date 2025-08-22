// src/store/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { calculateBulkDiscount } from '@/utils/bulkCalculator'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    totalSavings: 0,
    bulkDiscounts: {},
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload
      const productId = product._id || product.id
      const existingItem = state.items.find(item => (item._id || item.id) === productId)
      
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ ...product, quantity })
      }
      
      cartSlice.caseReducers.calculateTotals(state)
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => (item._id || item.id) !== productId)
      cartSlice.caseReducers.calculateTotals(state)
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => (item._id || item.id) === id)
      if (item) {
        item.quantity = quantity
      }
      cartSlice.caseReducers.calculateTotals(state)
    },
    
    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalPrice = 0
      state.totalSavings = 0
      state.bulkDiscounts = {}
    },
    
    calculateTotals: (state) => {
      let totalItems = 0
      let totalPrice = 0
      let totalSavings = 0
      const bulkDiscounts = {}
      
      state.items.forEach(item => {
        totalItems += item.quantity
        const originalPrice = item.price * item.quantity
        
        // Calculate bulk discount if applicable
        if (item.bulkDiscount && item.quantity >= item.bulkDiscount.minQty) {
          const discount = calculateBulkDiscount(item.price, item.quantity, item.bulkDiscount)
          const discountAmount = originalPrice - discount.finalPrice
          
          totalPrice += discount.finalPrice
          totalSavings += discountAmount
          bulkDiscounts[item._id || item.id] = discount
        } else {
          totalPrice += originalPrice
        }
      })
      
      state.totalItems = totalItems
      state.totalPrice = totalPrice
      state.totalSavings = totalSavings
      state.bulkDiscounts = bulkDiscounts
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer