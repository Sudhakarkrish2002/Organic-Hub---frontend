import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react'
import useCart from '@/hooks/useCart'
import CartItem from '@/components/Cart/CartItem'
import CartSummary from '@/components/Cart/CartSummary'
import Button from '@/components/UI/Button'

const Cart = () => {
  const { items, totalItems, totalPrice, totalSavings, clearAllItems } = useCart()
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">🛒</div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display text-green-800 mb-3 sm:mb-4">
                Your cart is empty
              </h1>
              <p className="text-green-600 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg font-body px-4">
                Looks like you haven't added any organic products to your cart yet.
              </p>
              <Link to="/products">
                <Button className="inline-flex items-center gap-2 text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3">
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  Start Shopping
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Link 
              to="/products" 
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors font-accent text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Continue Shopping
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-green-100">
                <div className="p-4 sm:p-6 border-b border-green-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-heading text-green-800">
                      Shopping Cart ({totalItems} items)
                    </h1>
                    <button
                      onClick={clearAllItems}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 text-xs sm:text-sm transition-colors font-accent self-start sm:self-auto"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      Clear Cart
                    </button>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {items.map((item) => (
                    <CartItem key={item._id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary 
                totalPrice={totalPrice}
                totalSavings={totalSavings}
                items={items}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart