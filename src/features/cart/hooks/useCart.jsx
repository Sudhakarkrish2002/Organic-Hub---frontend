import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart, removeFromCart, updateQuantity, clearCart } from '@/core/store/slices/cartSlice'
import toast from 'react-hot-toast'

const useCart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items, totalItems, totalPrice, totalSavings, bulkDiscounts } = useSelector((state) => state.cart)
  
  const addItemToCart = (product, quantity = 1) => {
    dispatch(addToCart({ product, quantity }))
    toast.success(`${product.name} added to cart!`, { duration: 2000 })
  }
  
  const removeItemFromCart = (productId) => {
    const item = items.find(item => item._id === productId || item.id === productId)
    if (item) {
      dispatch(removeFromCart(productId))
      toast.success('Item removed from cart', { duration: 2000 })
    }
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
    toast.success('Cart cleared', { duration: 2000 })
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
