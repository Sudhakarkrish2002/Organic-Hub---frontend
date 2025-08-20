import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star } from 'lucide-react'
import { addToCart } from '@/store/slices/cartSlice'
import { aiImageUrl } from '@/utils/helpers'
import { formatCurrency } from '@/utils/bulkCalculator'
import Badge from '../UI/Badge'
import Button from '../UI/Button'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  
  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addToCart({ product, quantity: 1 }))
  }
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-green-100 rounded-lg shadow-sm hover:shadow transition p-3 sm:p-4 relative group"
    >
      <Link to={`/products/${product._id}`}>
        {/* Product Image */}
        <div className="relative mb-3 sm:mb-4 overflow-hidden rounded-lg aspect-[4/3]">
          <img
            src={product.images?.[0] || aiImageUrl('organic produce, fruits and vegetables, studio lighting, high detail', 600, 450, 99)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = aiImageUrl('organic product minimal placeholder', 600, 450, 1)
            }}
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 space-y-1">
            {product.seasonal && (
              <Badge variant={product.season || 'seasonal'} className="text-xs">
                🌱 Seasonal
              </Badge>
            )}
            {product.bulkDiscount && (
              <Badge variant="discount" className="text-xs">
                Bulk Discount
              </Badge>
            )}
          </div>
          
          {/* Wishlist Button */}
          <button className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-green-50">
            <Heart className="w-4 h-4 text-green-700" />
          </button>
        </div>
        
        {/* Product Info */}
        <div>
          <h3 className="font-semibold text-green-800 mb-1 group-hover:text-green-700 transition-colors">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating || 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({product.rating || 0})
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-lg font-bold text-green-700">
                {formatCurrency(product.price)}
              </span>
              <span className="text-sm text-gray-500 ml-1">
                / {product.unit || 'kg'}
              </span>
            </div>
            
            {product.bulkDiscount && (
              <Badge variant="discount" className="text-xs">
                {product.bulkDiscount.discountPercent}% off on bulk
              </Badge>
            )}
          </div>
        </div>
      </Link>
      
      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        className="w-full"
        size="sm"
      >
        <ShoppingCart className="w-4 h-4" />
        Add to Cart
      </Button>
    </motion.div>
  )
}

export default ProductCard
