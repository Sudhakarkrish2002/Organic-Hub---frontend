import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Trash2 } from 'lucide-react'
import ProductGrid from '@/components/Product/ProductGrid'
import ProductCard from '@/components/Product/ProductCard'
import useWishlist from '@/hooks/useWishlist'
import useCart from '@/hooks/useCart.jsx'

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist, toggleWishlist } = useWishlist()
  const { addItemToCart } = useCart()

  const handleAddToCart = (product) => {
    addItemToCart(product, 1)
  }

  const handleRemove = (productId) => {
    removeFromWishlist(productId)
  }

  const handleWishlist = (product) => {
    toggleWishlist(product)
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 py-4 sm:py-6 md:py-8">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-6 sm:mb-8"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-display text-green-800 mb-1">Your Wishlist</h1>
            <p className="text-gray-600 font-body">Save items you love and purchase anytime</p>
          </div>
          {wishlistItems.length > 0 && (
            <button
              onClick={clearWishlist}
              className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </motion.div>

        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 sm:py-10 bg-white rounded-2xl shadow-md"
          >
            <Heart className="w-12 h-12 mx-auto mb-4 text-green-400" />
            <h3 className="text-xl sm:text-2xl font-heading text-green-800 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 font-body text-sm sm:text-base">
              Browse products and tap the heart to save your favorites
            </p>
          </motion.div>
        ) : (
          <ProductGrid>
            {wishlistItems.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="relative"
              >
                <button
                  onClick={() => handleRemove(product._id)}
                  className="absolute -top-2 -right-2 z-10 bg-white rounded-full p-2 shadow hover:bg-red-50 text-red-600"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onWishlist={handleWishlist}
                />
              </motion.div>
            ))}
          </ProductGrid>
        )}
      </div>
    </div>
  )
}

export default Wishlist
