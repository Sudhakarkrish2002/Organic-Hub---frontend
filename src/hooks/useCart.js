import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice'
import toast from 'react-hot-toast'

const useCart = () => {
  const dispatch = useDispatch()
  const { items, totalItems, totalPrice, totalSavings, bulkDiscounts } = useSelector((state) => state.cart)
  
  const addItemToCart = (product, quantity = 1) => {
    dispatch(addToCart({ product, quantity }))
    toast.success(`${product.name} added to cart!`)
  }
  
  const removeItemFromCart = (productId) => {
    dispatch(removeFromCart(productId))
    toast.success('Item removed from cart')
  }
  
  const updateItemQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItemFromCart(productId)
    } else {
      dispatch(updateQuantity({ id: productId, quantity }))
    }
  }
  
  const clearAllItems = () => {
    dispatch(clearCart())
    toast.success('Cart cleared')
  }
  
  const getItemQuantity = (productId) => {
    const item = items.find(item => item._id === productId)
    return item ? item.quantity : 0
  }
  
  const isItemInCart = (productId) => {
    return items.some(item => item._id === productId)
  }
  
  return {
    items,
    totalItems,
    totalPrice,
    totalSavings,
    bulkDiscounts,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearAllItems,
    getItemQuantity,
    isItemInCart,
  }
}

export default useCart;