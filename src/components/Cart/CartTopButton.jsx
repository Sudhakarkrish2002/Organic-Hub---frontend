import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

const CartTopButton = () => {
  const { totalItems } = useSelector((state) => state.cart)
  const navigate = useNavigate()

  if (!totalItems || totalItems <= 0) return null

  return (
    <button
      onClick={() => navigate('/cart')}
      className="fixed top-20 right-4 z-[1100] bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg px-4 py-3 flex items-center gap-2 lg:hidden"
      aria-label="Open cart"
    >
      <ShoppingCart className="w-5 h-5" />
      <span className="font-accent">{totalItems}</span>
    </button>
  )
}

export default CartTopButton
