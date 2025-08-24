// src/store/slices/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderAPI from '@/features/orders/services/orderAPI'
import toast from 'react-hot-toast'

// Async thunks
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await orderAPI.getOrders(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders')
    }
  }
)

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderAPI.getOrder(orderId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch order')
    }
  }
)

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      console.log('🔄 Creating order in slice...')
      const response = await orderAPI.createOrder(orderData)
      console.log('📦 API response in slice:', response)
      
      // Handle both backend and local storage response formats
      if (response && response.data) {
        console.log('✅ Returning response.data:', response.data)
        return response.data
      } else if (response && response.success) {
        // Local storage fallback format
        console.log('✅ Returning local storage response:', response)
        return response
      } else {
        console.error('❌ Invalid response format:', response)
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error('❌ Error in createOrder slice:', error)
      // If it's a network error, the API should have already fallen back to local storage
      // Only reject if it's a genuine error, not a fallback scenario
      if (error.message === 'Failed to create order locally') {
        return rejectWithValue('Failed to create order')
      }
      
      // Check if we have a successful response from local storage fallback
      if (error.response && error.response.data) {
        return error.response.data
      }
      
      return rejectWithValue(error.response?.data?.message || 'Failed to create order')
    }
  }
)

export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await orderAPI.cancelOrder(orderId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to cancel order')
    }
  }
)

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
    filters: {
      status: 'all',
      dateRange: null,
      search: ''
    }
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = {
        status: 'all',
        dateRange: null,
        search: ''
      }
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload
      const order = state.orders.find(o => o._id === orderId)
      if (order) {
        order.orderStatus = status
      }
      if (state.currentOrder && state.currentOrder._id === orderId) {
        state.currentOrder.orderStatus = status
      }
    },
    addOrder: (state, action) => {
      state.orders.unshift(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false
        // Handle different response formats
        if (Array.isArray(action.payload)) {
          state.orders = action.payload
        } else if (action.payload && action.payload.data && Array.isArray(action.payload.data.orders)) {
          // Backend response format: { success: true, data: { orders: [...] } }
          state.orders = action.payload.data.orders
        } else if (action.payload && Array.isArray(action.payload.data)) {
          // Alternative format: { data: [...] }
          state.orders = action.payload.data
        } else if (action.payload && Array.isArray(action.payload.orders)) {
          // Direct format: { orders: [...] }
          state.orders = action.payload.orders
        } else {
          // Fallback to empty array if payload is not in expected format
          console.warn('Unexpected orders response format:', action.payload)
          state.orders = []
        }
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      
      // Fetch Order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false
        // Handle different response formats for single order
        if (action.payload && action.payload.data && action.payload.data.order) {
          // Backend response format: { success: true, data: { order: {...} } }
          state.currentOrder = action.payload.data.order
        } else if (action.payload && action.payload.data) {
          // Alternative format: { data: {...} }
          state.currentOrder = action.payload.data
        } else {
          // Direct format: {...}
          state.currentOrder = action.payload
        }
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        // Handle different response formats for created order
        let orderData
        if (action.payload && action.payload.data && action.payload.data.order) {
          // Backend response format: { success: true, data: { order: {...} } }
          orderData = action.payload.data.order
        } else if (action.payload && action.payload.data) {
          // Alternative format: { data: {...} }
          orderData = action.payload.data
        } else {
          // Direct format: {...}
          orderData = action.payload
        }
        
        state.orders.unshift(orderData)
        state.currentOrder = orderData
        toast.success('Order created successfully!')
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      
      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false
        const order = state.orders.find(o => o._id === action.payload._id)
        if (order) {
          order.orderStatus = 'cancelled'
        }
        if (state.currentOrder && state.currentOrder._id === action.payload._id) {
          state.currentOrder.orderStatus = 'cancelled'
        }
        toast.success('Order cancelled successfully!')
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
  }
})

export const { 
  setOrders, 
  setCurrentOrder, 
  clearCurrentOrder, 
  setFilters, 
  clearFilters,
  updateOrderStatus,
  addOrder
} = orderSlice.actions

export default orderSlice.reducer


