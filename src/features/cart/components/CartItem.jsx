import React from 'react'
import { Trash2, Minus, Plus } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity } from '@/core/store/slices/cartSlice'
import { aiImageUrl } from '@/shared/utils/helpers'

const CartItem = ({ item }) => {
  const dispatch = useDispatch()

  const getItemId = (item) => {
    return item._id || item.id
  }

  const handleRemove = () => {
    dispatch(removeFromCart(getItemId(item)))
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: getItemId(item), quantity: newQuantity }))
    }
  }

  // Handle different image properties
  const getProductImage = (item) => {
    if (item.image) return item.image
    if (item.images && item.images.length > 0) return item.images[0]
    return aiImageUrl('organic product placeholder, simple minimal background', 600, 600, 1)
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-3 sm:py-4 border-b border-green-100 last:border-b-0">
      {/* Product Image */}
      <div className="flex-shrink-0 self-center sm:self-auto">
        <img 
          src={getProductImage(item)} 
          alt={item.name} 
          className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-lg sm:rounded-xl border border-green-100"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = aiImageUrl('organic product placeholder, simple minimal background', 600, 600, 1)
          }}
        />
      </div>
      
      {/* Product Info */}
      <div className="flex-1 min-w-0 text-center sm:text-left">
        <h3 className="font-heading text-base sm:text-lg text-green-800 mb-1 sm:mb-2">{item.name}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2 hidden sm:block">{item.description}</p>
        
        {/* Price */}
        <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
          <span className="font-accent text-lg sm:text-xl text-green-700">₹{item.price}</span>
          {item.originalPrice && item.originalPrice > item.price && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">₹{item.originalPrice}</span>
          )}
        </div>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1.5 sm:p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200"
        >
          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
        
        <span className="font-accent text-base sm:text-lg text-green-800 min-w-[1.5rem] sm:min-w-[2rem] text-center">
          {item.quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1.5 sm:p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200"
        >
          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
      
      {/* Total Price */}
      <div className="text-center sm:text-right min-w-[4rem] sm:min-w-[6rem]">
        <div className="font-accent text-base sm:text-lg text-green-700">
          ₹{item.price * item.quantity}
        </div>
        {item.quantity > 1 && (
          <div className="text-xs sm:text-sm text-gray-500 hidden sm:block">
            ₹{item.price} each
          </div>
        )}
      </div>
      
      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="p-1.5 sm:p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 self-center sm:self-auto"
        title="Remove item"
      >
        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  )
}

export default CartItem


