import { useSelector, useDispatch } from 'react-redux'
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
} from '@/store/slices/orderSlice'
import toast from 'react-hot-toast'

const useOrders = () => {
  const dispatch = useDispatch()
  const { orders, currentOrder, loading, error, filters } = useSelector((state) => state.orders)
  
  const loadOrders = async (params = {}) => {
    try {
      await dispatch(fetchOrders(params)).unwrap()
    } catch (error) {
      console.error('Failed to load orders:', error)
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
      const result = await dispatch(createOrder(orderData)).unwrap()
      return result
    } catch (error) {
      console.error('Failed to place order:', error)
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
  const getOrderById = (orderId) => {
    return orders.find(order => order._id === orderId)
  }
  
  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status)
  }
  
  const getTotalOrders = () => orders.length
  
  const getOrdersStats = () => {
    const stats = {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length
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