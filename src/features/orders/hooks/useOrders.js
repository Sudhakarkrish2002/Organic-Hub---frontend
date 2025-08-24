import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { 
  fetchOrders, 
  fetchOrderById, 
  createOrder, 
  cancelOrder,
  setOrders,
  setCurrentOrder,
  clearCurrentOrder,
  setFilters,
  clearFilters,
  updateOrderStatus
} from '@/core/store/slices/orderSlice'
import toast from 'react-hot-toast'

const useOrders = () => {
  const dispatch = useDispatch()
  const { orders, currentOrder, loading, error, filters } = useSelector((state) => state.orders)
  const [lastLoadTime, setLastLoadTime] = useState(0)
  
  const loadOrders = async (params = {}) => {
    try {
      // Prevent loading if already loading
      if (loading) {
        console.log('⏳ Already loading orders, skipping...')
        return
      }
      
      // Prevent loading if we loaded recently (within 30 seconds)
      const now = Date.now()
      if (now - lastLoadTime < 30000) {
        console.log('⏳ Orders loaded recently, skipping...')
        return
      }
      
      console.log('🔄 Loading orders...')
      setLastLoadTime(now)
      const result = await dispatch(fetchOrders(params)).unwrap()
      console.log('📦 Orders loaded:', result)
    } catch (error) {
      console.error('❌ Failed to load orders:', error)
    }
  }
  
  const loadOrder = async (orderId) => {
    try {
      await dispatch(fetchOrderById(orderId)).unwrap()
    } catch (error) {
      console.error('Failed to load order:', error)
    }
  }
  
  const placeOrder = async (orderData) => {
    try {
      console.log('🔄 Dispatching createOrder...')
      const result = await dispatch(createOrder(orderData)).unwrap()
      console.log('📦 Result from createOrder:', result)
      return result
    } catch (error) {
      console.error('❌ Failed to place order:', error)
      throw error
    }
  }
  
  const cancelOrderById = async (orderId) => {
    try {
      await dispatch(cancelOrder(orderId)).unwrap()
    } catch (error) {
      console.error('Failed to cancel order:', error)
    }
  }
  
  const setOrderFilters = (newFilters) => {
    dispatch(setFilters(newFilters))
  }
  
  const clearOrderFilters = () => {
    dispatch(clearFilters())
  }
  
  const updateOrderStatusById = (orderId, status) => {
    dispatch(updateOrderStatus({ orderId, status }))
  }
  
  const setOrdersData = (ordersData) => {
    dispatch(setOrders(ordersData))
  }
  
  const setCurrentOrderData = (orderData) => {
    dispatch(setCurrentOrder(orderData))
  }
  
  const clearCurrentOrderData = () => {
    dispatch(clearCurrentOrder())
  }
  
  // Helper functions
  const ordersArray = Array.isArray(orders) ? orders : []
  
  const getOrderById = (orderId) => {
    return ordersArray.find(order => order._id === orderId)
  }
  
  const getOrdersByStatus = (status) => {
    return ordersArray.filter(order => order.orderStatus === status)
  }
  
  const getTotalOrders = () => ordersArray.length
  
  const getOrdersStats = () => {
    const stats = {
      total: ordersArray.length,
      pending: ordersArray.filter(o => o.orderStatus === 'pending').length,
      processing: ordersArray.filter(o => o.orderStatus === 'processing').length,
      shipped: ordersArray.filter(o => o.orderStatus === 'shipped').length,
      delivered: ordersArray.filter(o => o.orderStatus === 'delivered').length,
      cancelled: ordersArray.filter(o => o.orderStatus === 'cancelled').length
    }
    return stats
  }
  
  return {
    // State
    orders,
    currentOrder,
    loading,
    error,
    filters,
    
    // Actions
    loadOrders,
    loadOrder,
    placeOrder,
    cancelOrder: cancelOrderById,
    setFilters: setOrderFilters,
    clearFilters: clearOrderFilters,
    updateOrderStatus: updateOrderStatusById,
    setOrders: setOrdersData,
    setCurrentOrder: setCurrentOrderData,
    clearCurrentOrder: clearCurrentOrderData,
    
    // Helper functions
    getOrderById,
    getOrdersByStatus,
    getTotalOrders,
    getOrdersStats
  }
}

export default useOrders