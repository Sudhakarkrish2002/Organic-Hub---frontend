import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { addToCart } from '@/store/slices/cartSlice'
import { aiImageUrl } from '@/utils/helpers'
import { formatCurrency } from '@/utils/bulkCalculator'
import useWishlist from '@/hooks/useWishlist'
import Badge from '../UI/Badge'
import Button from '../UI/Button'

const ProductCard = ({ product, onAddToCart, onWishlist }) => {
  const dispatch = useDispatch()
  const { isInWishlist, toggleWishlist } = useWishlist()
  
  // Local state for immediate UI feedback
  const [localWishlistState, setLocalWishlistState] = useState(null)
  
  // Sync local state with actual wishlist state
  useEffect(() => {
    setLocalWishlistState(isInWishlist(product._id))
  }, [isInWishlist, product._id])
  
  // Use local state if available, otherwise fall back to hook state
  const isProductInWishlist = localWishlistState !== null ? localWishlistState : isInWishlist(product._id)
  
  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onAddToCart) {
      onAddToCart(product)
    } else {
      dispatch(addToCart({ product, quantity: 1 }))
    }
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Immediately toggle local state for instant UI feedback
    const currentState = isProductInWishlist
    setLocalWishlistState(!currentState)
    
    if (onWishlist) {
      onWishlist(product)
    } else {
      // Fallback: use the hook directly if no onWishlist prop is provided
      toggleWishlist(product)
    }
  }
  
  const getDisplayWeight = (p) => {
    if (p.weight) return p.weight
    const nameLower = (p.name || '').toLowerCase()
    // Exclusions: do not show weight for paneer/panner, butter, yogurt
    if (/(paneer|panner|butter|yogurt)/i.test(nameLower)) {
      return ''
    }
    const isLiquid = Boolean(
      p.isLiquid ||
      p.unit === 'L' ||
      (Array.isArray(p.tags) && p.tags.includes('liquid')) ||
      /(milk|oil|juice|honey|ghee|curd|buttermilk|butter\s?milk|yogurt)/i.test(nameLower)
    )
    return isLiquid ? '1 litre' : '1 kg'
  }
  const displayWeight = getDisplayWeight(product)

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className={`bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-3 relative group h-80 sm:h-88 border-green-100 hover:border-green-200`}
    >
      <Link to={`/products/${product._id}`} className="flex flex-col h-full">
        {/* Product Image */}
        <div className="relative mb-3 overflow-hidden rounded-xl w-full h-48 sm:h-56 bg-gray-50">
          <img
            src={product.image || product.images?.[0] || aiImageUrl('organic produce, fruits and vegetables, studio lighting, high detail', 800, 600, 99)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = aiImageUrl('organic product minimal placeholder', 800, 600, 1)
            }}
          />
          
          {/* Badges */}
          <div className="absolute top-1.5 left-1.5 space-y-0.5">
            {product.category === 'natural' && (
              <Badge variant="natural" className="text-[10px] bg-amber-100 text-amber-800 border-amber-200">
                🍯 Natural
              </Badge>
            )}
            {product.category === 'grains' && (
              <Badge variant="grains" className="text-[10px] bg-yellow-100 text-yellow-800 border-yellow-200">
                🌾 Grains
              </Badge>
            )}
            {product.seasonal && (
              <Badge variant={product.season || 'seasonal'} className="text-[10px]">
                🌱 Seasonal
              </Badge>
            )}
            {product.bulkDiscount && (
              <Badge variant="discount" className="text-[10px]">
                Bulk Discount
              </Badge>
            )}
            {product.discount && (
              <Badge variant="discount" className="text-[10px]">
                -{product.discount}%
              </Badge>
            )}
          </div>
          
          {/* Wishlist Button */}
          <button 
            onClick={handleWishlist}
            className={`absolute top-2 right-2 p-1.5 sm:p-2 bg-white rounded-full transition-all duration-200 shadow-sm z-10 hover:scale-110 active:scale-95 ${
              isProductInWishlist 
                ? 'opacity-100 hover:bg-red-50' 
                : 'opacity-0 group-hover:opacity-100 hover:bg-green-50'
            }`}
            title={isProductInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart 
              className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-200 ${
                isProductInWishlist 
                  ? 'text-red-500 fill-red-500 scale-110 animate-pulse' 
                  : 'text-green-700 hover:text-red-400'
              }`} 
            />
          </button>
        </div>
        
        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold text-green-800 mb-0.5 group-hover:text-green-700 transition-colors text-sm sm:text-base line-clamp-1">
            {product.name}
          </h3>
          {displayWeight && (
            <div className="text-[11px] sm:text-xs text-gray-500 mb-1">
              {displayWeight}
            </div>
          )}
          
          <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2 flex-1">
            {product.description}
          </p>
          
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating || 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviews || product.rating || 0})
            </span>
          </div>
          
          {/* Price and Add to Cart */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-base sm:text-lg font-bold text-green-700">
                  ₹{product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-gray-500 ml-1 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              
              {product.bulkDiscount && (
                <Badge variant="discount" className="text-[9px]">
                  {product.bulkDiscount.discountPercent}% off
                </Badge>
              )}
            </div>
            
            {/* Add to Cart Button - Inside the card */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-3 rounded-lg transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-1 hover:shadow-sm transform hover:scale-[0.98] active:scale-95"
            >
              <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard
