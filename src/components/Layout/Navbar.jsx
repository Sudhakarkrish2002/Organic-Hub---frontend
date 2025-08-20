import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-green-700 font-semibold">Organic Mart</Link>
        <div className="hidden sm:flex items-center gap-4">
          <Link to="/products" className="hover:text-green-700">Products</Link>
          <Link to="/cart" className="hover:text-green-700">Cart</Link>
          <Link to="/login" className="hover:text-green-700">Login</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


