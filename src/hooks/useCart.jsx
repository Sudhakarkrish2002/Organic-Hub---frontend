import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart, removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice'
import toast from 'react-hot-toast'

const useCart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, totalItems, totalPrice, totalSavings, bulkDiscounts } = useSelector((state) => state.cart)
  
  const addItemToCart = (product, quantity = 1) => {
    dispatch(addToCart({ product, quantity }))
    toast.custom((t) => (
      <div className={`px-4 py-3 rounded-xl shadow-lg border ${t.visible ? 'animate-enter' : 'animate-leave'} bg-white border-green-200 text-green-800 flex items-center gap-3`}>
        <span className="font-accent">{product.name} added to cart</span>
        <button
          onClick={() => { toast.dismiss(t.id); navigate('/cart') }}
          className="ml-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm"
        >
          View Cart
        </button>
      </div>
    ))
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
    const item = items.find(item => (item._id || item.id) === productId)
    return item ? item.quantity : 0
  }
  
  const isItemInCart = (productId) => {
    return items.some(item => (item._id || item.id) === productId)
  }

  const isFreeDelivery = () => totalItems >= 5 || totalPrice >= 500
  
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
    isFreeDelivery,
  }
}

export default useCart
