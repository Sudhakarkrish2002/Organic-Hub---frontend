import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ShoppingCart, User, AlertCircle } from 'lucide-react'
import { useAuthContext } from '@/features/auth/context/AuthContext'

const CartBottomBar = () => {
  const { totalItems, totalPrice, isGuest } = useSelector((state) => state.cart)
  const { isAuthenticated } = useAuthContext()

  if (!totalItems || totalItems <= 0) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[1150] bg-white/95 backdrop-blur border-t border-green-200 shadow-lg pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShoppingCart className="w-5 h-5 text-green-700" />
          <span className="font-accent text-green-800">{totalItems} item{totalItems>1?'s':''} in cart</span>
          
          {/* Guest User Warning */}
          {isGuest && (
            <div className="flex items-center gap-1 text-amber-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Guest cart</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <span className="font-heading text-green-700">₹{totalPrice}</span>
          
          {isAuthenticated ? (
            <Link
              to="/cart"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
              aria-label="View Cart"
            >
              View Cart
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-amber-600 text-sm">
                <User className="w-4 h-4" />
                <span>Sign in to save cart</span>
              </div>
              <Link
                to="/cart"
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
                aria-label="View Guest Cart"
              >
                View Cart
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartBottomBar
