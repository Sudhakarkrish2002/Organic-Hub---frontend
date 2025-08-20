import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, User, Search, Menu, X, Leaf } from 'lucide-react'
import { logout } from '@/store/slices/authSlice'
import Badge from '../UI/Badge'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { totalItems } = useSelector((state) => state.cart)
  const { currentSeason } = useSelector((state) => state.seasonal)
  
  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    setIsMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
    setIsSearchOpen(false)
  }
  
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-green-100 sticky top-0 z-50 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0" onClick={closeMobileMenu}>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
              <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-display text-green-800">
              Organic Hub
            </span>
          </Link>
          
          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-8 xl:mx-16">
            <div className="flex items-center space-x-8 xl:space-x-16">
              <Link 
                to="/" 
                className="text-green-700 hover:text-green-600 transition-all duration-200 font-accent text-base px-4 xl:px-6 py-2 xl:py-3 hover:bg-green-50 rounded-xl hover:scale-105 border border-transparent hover:border-green-200"
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="text-green-700 hover:text-green-600 transition-all duration-200 font-accent text-base px-4 xl:px-6 py-2 xl:py-3 hover:bg-green-50 rounded-xl hover:scale-105 border border-transparent hover:border-green-200"
              >
                Products
              </Link>
              <Link 
                to="/seasonal" 
                className="text-green-700 hover:text-green-600 transition-all duration-200 font-accent text-base px-4 xl:px-6 py-2 xl:py-3 hover:bg-green-50 rounded-xl hover:scale-105 flex items-center gap-2 border border-transparent hover:border-green-200"
              >
                Seasonal
                <Badge variant={currentSeason} className="text-xs">
                  {currentSeason}
                </Badge>
              </Link>
            </div>
          </nav>
          
          {/* Right Side Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 flex-shrink-0">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 sm:p-3 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-105"
            >
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2 sm:p-3 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg sm:rounded-xl transition-all duration-200 hover:scale-105"
              onClick={closeMobileMenu}
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-accent">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 sm:space-x-3 text-green-600 hover:text-green-700 transition-all duration-200 font-accent px-2 sm:px-4 py-2 sm:py-3 hover:bg-green-50 rounded-lg sm:rounded-xl hover:scale-105">
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden md:block">{user?.name}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 sm:mt-3 w-48 sm:w-56 bg-white rounded-xl sm:rounded-2xl shadow-xl py-2 sm:py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-green-100">
                  <Link to="/profile" className="block px-4 sm:px-6 py-2 sm:py-3 hover:bg-green-50 transition-colors font-accent text-sm sm:text-base">
                    Profile
                  </Link>
                  <Link to="/orders" className="block px-4 sm:px-6 py-2 sm:py-3 hover:bg-green-50 transition-colors font-accent text-sm sm:text-base">
                    Orders
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="block px-4 sm:px-6 py-2 sm:py-3 hover:bg-green-50 transition-colors font-accent text-sm sm:text-base">
                      Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 hover:bg-green-50 transition-colors text-red-600 font-accent text-sm sm:text-base"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-green-600 hover:text-green-700 transition-all duration-200 font-accent text-sm sm:text-base font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-3 hover:bg-green-50 rounded-lg sm:rounded-xl hover:scale-105"
              >
                Login
              </Link>
            )}
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 sm:p-3 text-green-600 hover:bg-green-50 rounded-lg sm:rounded-xl transition-all duration-200"
            >
              {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-green-100 py-4 sm:py-6 w-full"
            >
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search organic products..."
                  className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-4 sm:px-5 py-3 sm:py-4 pr-12 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 font-body text-base sm:text-lg"
                />
                <Search className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-green-100 py-4 sm:py-6 w-full"
            >
              <nav className="space-y-3 sm:space-y-4 text-center">
                <Link 
                  to="/" 
                  className="block text-green-700 hover:text-green-600 transition-colors font-accent text-base sm:text-lg py-2 sm:py-3 hover:bg-green-50 rounded-lg sm:rounded-xl"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <Link 
                  to="/products" 
                  className="block text-green-700 hover:text-green-600 transition-colors font-accent text-base sm:text-lg py-2 sm:py-3 hover:bg-green-50 rounded-lg sm:rounded-xl"
                  onClick={closeMobileMenu}
                >
                  Products
                </Link>
                <Link 
                  to="/seasonal" 
                  className="block text-green-700 hover:text-green-600 transition-colors font-accent text-base sm:text-lg py-2 sm:py-3 hover:bg-green-50 rounded-lg sm:rounded-xl"
                  onClick={closeMobileMenu}
                >
                  Seasonal Products
                </Link>
                
                {/* Mobile User Actions */}
                {!isAuthenticated && (
                  <div className="pt-4 border-t border-green-100">
                    <Link
                      to="/login"
                      className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 font-accent"
                      onClick={closeMobileMenu}
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header