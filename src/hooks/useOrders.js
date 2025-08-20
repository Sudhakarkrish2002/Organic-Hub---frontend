import { useSelector, useDispatch } from 'react-redux'
import { setOrders, setCurrentOrder } from '@/store/slices/orderSlice'
import toast from 'react-hot-toast'

const useOrders = () => {
  const dispatch = useDispatch()
  const { orders, currentOrder, loading, error } = useSelector((state) => state.orders)
  
  const loadOrders = (orders = []) => dispatch(setOrders(orders))
  
  const loadOrder = (order) => dispatch(setCurrentOrder(order))
  
  const placeOrder = async (orderData) => {
    toast.success('Order placed successfully!')
    return { _id: Date.now().toString(), ...orderData }
  }
  
  return {
    orders,
    currentOrder,
    loading,
    error,
    loadOrders,
    loadOrder,
    placeOrder,
  }
}

export default useOrders;