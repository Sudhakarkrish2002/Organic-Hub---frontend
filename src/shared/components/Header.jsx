import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, User, Search, Menu, X, Leaf, LogOut, Package, Settings, Heart } from 'lucide-react'
import { logout } from '@/core/store/slices/authSlice'
import { useAuthContext } from '@/features/auth/context/AuthContext'
import Badge from './Badge'
import NotificationBell from './NotificationBell'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, user, logout: logoutUser } = useAuthContext()
  const { totalItems } = useSelector((state) => state.cart)
  const { currentSeason } = useSelector((state) => state.seasonal)
  
  const handleLogout = () => {
    logoutUser()
    navigate('/')
    setIsMenuOpen(false)
    setIsUserMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMenuOpen(false)
    setIsSearchOpen(false)
  }

  const isActiveRoute = (path) => {
    return location.pathname === path
  }
  
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-green-100 sticky top-0 z-50 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0" onClick={closeMobileMenu}>
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-display text-green-800">
              Organic Hub
            </span>
          </Link>
          
          {/* Desktop Navigation - Center */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-6 xl:mx-12">
            <div className="flex items-center space-x-6 xl:space-x-12">
              <Link 
                to="/" 
                className={`transition-all duration-200 font-accent text-base px-3 xl:px-5 py-2 rounded-xl hover:scale-105 border border-transparent hover:border-green-200 ${
                  isActiveRoute('/') 
                    ? 'text-green-600 bg-green-50 border-green-200' 
                    : 'text-green-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`transition-all duration-200 font-accent text-base px-3 xl:px-5 py-2 rounded-xl hover:scale-105 border border-transparent hover:border-green-200 ${
                  isActiveRoute('/products') 
                    ? 'text-green-600 bg-green-50 border-green-200' 
                    : 'text-green-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                Products
              </Link>
              <Link 
                to="/seasonal" 
                className={`transition-all duration-200 font-accent text-base px-3 xl:px-5 py-2 rounded-xl hover:scale-105 flex items-center gap-2 border border-transparent hover:border-green-200 ${
                  isActiveRoute('/seasonal') 
                    ? 'text-green-600 bg-green-50 border-green-200' 
                    : 'text-green-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                Seasonal
                <Badge variant={currentSeason} className="text-xs">
                  {currentSeason}
                </Badge>
              </Link>
              {isAuthenticated && (
                <Link 
                  to="/orders" 
                  className={`transition-all duration-200 font-accent text-base px-3 xl:px-5 py-2 rounded-xl hover:scale-105 border border-transparent hover:border-green-200 ${
                    isActiveRoute('/orders') 
                      ? 'text-green-600 bg-green-50 border-green-200' 
                      : 'text-green-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  Orders
                </Link>
              )}
            </div>
          </nav>
          
          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0">
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
                <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-accent pointer-events-none">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 sm:space-x-3 text-green-600 hover:text-green-700 transition-all duration-200 font-accent px-2 sm:px-3 py-2 hover:bg-green-50 rounded-lg sm:rounded-xl hover:scale-105"
                >
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden md:block">{user?.name || 'User'}</span>
                </button>
                
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl py-2 border border-green-100"
                    >
                      <div className="px-4 py-3 border-b border-green-100">
                        <p className="text-sm font-medium text-green-800">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                      
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors font-accent text-sm"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      
                      <Link 
                        to="/orders" 
                        className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors font-accent text-sm"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Package className="w-4 h-4" />
                        My Orders
                      </Link>
                      
                      <Link 
                        to="/wishlist" 
                        className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors font-accent text-sm"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Heart className="w-4 h-4" />
                        Wishlist
                      </Link>
                      
                      {user?.role === 'admin' && (
                        <Link 
                          to="/admin" 
                          className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors font-accent text-sm"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      )}
                      
                      <div className="border-t border-green-100 mt-2">
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600 font-accent text-sm w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="text-green-600 hover:text-green-700 transition-all duration-200 font-accent text-sm sm:text-base font-semibold px-3 sm:px-5 md:px-6 py-2 hover:bg-green-50 rounded-lg sm:rounded-xl hover:scale-105"
              >
                Sign In
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
              className="border-t border-green-100 py-3 sm:py-4 w-full"
            >
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search organic products..."
                  className="w-full border border-gray-300 rounded-lg sm:rounded-xl px-4 sm:px-5 py-2 sm:py-3 pr-12 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 font-body text-base sm:text-lg"
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
              className="lg:hidden border-t border-green-100 py-3 sm:py-4 w-full"
            >
              <nav className="space-y-2 sm:space-y-3 text-center">
                <Link 
                  to="/" 
                  className={`block transition-colors font-accent text-base sm:text-lg py-2 rounded-lg sm:rounded-xl ${
                    isActiveRoute('/') 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-green-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                <Link 
                  to="/products" 
                  className={`block transition-colors font-accent text-base sm:text-lg py-2 rounded-lg sm:rounded-xl ${
                    isActiveRoute('/products') 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-green-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                  onClick={closeMobileMenu}
                >
                  Products
                </Link>
                <Link 
                  to="/seasonal" 
                  className={`block transition-colors font-accent text-base sm:text-lg py-2 rounded-lg sm:rounded-xl ${
                    isActiveRoute('/seasonal') 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-green-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                  onClick={closeMobileMenu}
                >
                  Seasonal Products
                </Link>
                
                {isAuthenticated && (
                  <>
                    <Link 
                      to="/orders" 
                      className={`block transition-colors font-accent text-base sm:text-lg py-2 rounded-lg sm:rounded-xl ${
                        isActiveRoute('/orders') 
                          ? 'text-green-600 bg-green-50' 
                          : 'text-green-700 hover:text-green-600 hover:bg-green-50'
                      }`}
                      onClick={closeMobileMenu}
                    >
                      My Orders
                    </Link>
                    <Link 
                      to="/profile" 
                      className={`block transition-colors font-accent text-base sm:text-lg py-2 rounded-lg sm:rounded-xl ${
                        isActiveRoute('/profile') 
                          ? 'text-green-600 bg-green-50' 
                          : 'text-green-700 hover:text-green-600 hover:bg-green-50'
                      }`}
                      onClick={closeMobileMenu}
                    >
                      Profile
                    </Link>
                  </>
                )}
                
                {/* Mobile User Actions */}
                {!isAuthenticated && (
                  <div className="pt-3 border-t border-green-100">
                    <Link
                      to="/auth"
                      className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-xl transition-colors duration-200 font-accent"
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