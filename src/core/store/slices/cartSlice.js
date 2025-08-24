// src/store/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { calculateBulkDiscount } from '@/shared/utils/bulkCalculator'

// Safe localStorage access
const safeLocalStorage = {
  getItem: (key) => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(key)
      } catch (error) {
        console.error('Error accessing localStorage:', error)
        return null
      }
    }
    return null
  },
  setItem: (key, value) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, value)
      } catch (error) {
        console.error('Error setting localStorage:', error)
      }
    }
  },
  removeItem: (key) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(key)
      } catch (error) {
        console.error('Error removing from localStorage:', error)
      }
    }
  }
}

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = safeLocalStorage.getItem('organicHubCart')
    return savedCart ? JSON.parse(savedCart) : null
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
    return null
  }
}

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    safeLocalStorage.setItem('organicHubCart', JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    totalSavings: 0,
    bulkDiscounts: {},
    isGuest: true, // Track if user is guest or authenticated
    lastUpdated: null,
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
      
      state.lastUpdated = new Date().toISOString()
      cartSlice.caseReducers.calculateTotals(state)
      saveCartToStorage(state)
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => (item._id || item.id) !== productId)
      state.lastUpdated = new Date().toISOString()
      cartSlice.caseReducers.calculateTotals(state)
      saveCartToStorage(state)
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => (item._id || item.id) === id)
      if (item) {
        item.quantity = quantity
      }
      state.lastUpdated = new Date().toISOString()
      cartSlice.caseReducers.calculateTotals(state)
      saveCartToStorage(state)
    },
    
    clearCart: (state) => {
      state.items = []
      state.totalItems = 0
      state.totalPrice = 0
      state.totalSavings = 0
      state.bulkDiscounts = {}
      state.lastUpdated = new Date().toISOString()
      saveCartToStorage(state)
    },
    
    loadCart: (state, action) => {
      const savedCart = action.payload
      if (savedCart && savedCart.items) {
        state.items = savedCart.items
        state.isGuest = savedCart.isGuest || true
        state.lastUpdated = savedCart.lastUpdated
        cartSlice.caseReducers.calculateTotals(state)
      }
    },
    
    setGuestStatus: (state, action) => {
      state.isGuest = action.payload
      state.lastUpdated = new Date().toISOString()
      saveCartToStorage(state)
    },
    
    mergeGuestCart: (state, action) => {
      const guestCart = action.payload
      if (guestCart && guestCart.items && guestCart.items.length > 0) {
        // Merge guest cart items with existing items
        guestCart.items.forEach(guestItem => {
          const existingItem = state.items.find(item => (item._id || item.id) === (guestItem._id || guestItem.id))
          if (existingItem) {
            existingItem.quantity += guestItem.quantity
          } else {
            state.items.push(guestItem)
          }
        })
        
        state.isGuest = false
        state.lastUpdated = new Date().toISOString()
        cartSlice.caseReducers.calculateTotals(state)
        saveCartToStorage(state)
      }
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

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  loadCart, 
  setGuestStatus,
  mergeGuestCart
} = cartSlice.actions
export default cartSlice.reducer