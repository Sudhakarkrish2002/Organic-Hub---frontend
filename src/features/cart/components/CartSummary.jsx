import React from 'react'
import { ShoppingCart, Truck, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const CartSummary = ({ totalPrice = 0, totalSavings = 0, items = [] }) => {
  const subtotal = totalPrice + totalSavings
  const total = totalPrice
  const totalItems = items.reduce((a, b) => a + (b.quantity || 0), 0)

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-green-100 p-4 sm:p-6 lg:sticky lg:top-24">
      <h2 className="text-lg sm:text-xl font-heading text-green-800 mb-4 sm:mb-6">Order Summary</h2>
      
      {/* Summary Details */}
      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
        <div className="flex items-center justify-between text-gray-600 text-sm sm:text-base">
          <span>Items ({items.length})</span>
          <span>₹{subtotal}</span>
        </div>
        
        {totalSavings > 0 && (
          <div className="flex items-center justify-between text-green-600 text-sm sm:text-base">
            <span>Total Savings</span>
            <span>-₹{totalSavings}</span>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-3 sm:pt-4">
          <div className="flex items-center justify-between font-heading text-lg sm:text-xl text-green-800">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
      
      {/* Features */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600">
        <div className="flex items-center gap-2 sm:gap-3">
          <Truck className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
          <span>Free delivery on orders above ₹500 or 5+ items</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
          <span>100% organic guarantee</span>
        </div>
      </div>
      
      {/* Checkout Button */}
      <Link
        to="/checkout"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-colors duration-200 font-accent text-center block mb-3 sm:mb-4 text-sm sm:text-base"
      >
        Proceed to Checkout
      </Link>
      
      {/* Continue Shopping */}
      <Link
        to="/products"
        className="w-full bg-transparent border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-200 font-accent text-center block text-sm sm:text-base"
      >
        Continue Shopping
      </Link>
    </div>
  )
}

export default CartSummary


