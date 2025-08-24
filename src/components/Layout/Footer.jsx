import React from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Facebook, Twitter, Instagram, Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-green-800 to-green-900 text-white w-full">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 lg:py-8">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {/* Company Info */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
                  <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-display">Organic Hub</span>
              </div>
              <p className="text-green-100 mb-2 sm:mb-3 leading-relaxed font-body text-sm sm:text-base">
                Fresh, organic, and healthy products delivered right to your doorstep. 
                Supporting sustainable farming and your healthy lifestyle.
              </p>
              <div className="flex space-x-4 sm:space-x-5">
                <a href="#" className="text-green-300 hover:text-white cursor-pointer transition-all duration-200 hover:scale-110">
                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="#" className="text-green-300 hover:text-white cursor-pointer transition-all duration-200 hover:scale-110">
                  <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="#" className="text-green-300 hover:text-white cursor-pointer transition-all duration-200 hover:scale-110">
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg sm:text-xl font-heading mb-2 sm:mb-3">Quick Links</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <Link to="/products" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/seasonal" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
                    Seasonal Products
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Categories */}
            <div>
              <h3 className="text-lg sm:text-xl font-heading mb-2 sm:mb-3">Categories</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <Link to="/products?category=vegetables" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
                    <span>🥦</span>
                    Vegetables
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=fruits" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
                    <span>🍎</span>
                    Fruits
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=dairy" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
                    <span>🥛</span>
                    Dairy
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=grains" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
                    <span>🌾</span>
                    Grains
                  </Link>
                </li>
                <li>
                  <Link to="/products?category=natural" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
                    <span>🍯</span>
                    Natural Products
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg sm:text-xl font-heading mb-2 sm:mb-3">Contact Us</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li className="flex items-center space-x-2 sm:space-x-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 flex-shrink-0" />
                  <span className="text-green-100 font-accent text-sm sm:text-base">+91 98765 43210</span>
                </li>
                <li className="flex items-center space-x-2 sm:space-x-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 flex-shrink-0" />
                  <span className="text-green-100 font-accent text-sm sm:text-base">hello@organichub.com</span>
                </li>
                <li className="flex items-start space-x-2 sm:space-x-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-300 flex-shrink-0 mt-1" />
                  <span className="text-green-100 font-accent text-sm sm:text-base leading-relaxed">
                    123 Organic Street,<br />
                    Green City, Tamil Nadu 600001
                  </span>
                </li>
              </ul>
              
              {/* Newsletter Signup */}
              <div className="mt-3 sm:mt-4">
                <h4 className="text-sm sm:text-base font-heading mb-2">Newsletter</h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 text-sm bg-green-700 border border-green-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-green-300"
                  />
                  <button className="px-3 py-2 bg-green-600 hover:bg-green-500 text-white text-sm rounded-r-lg transition-colors duration-200">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-green-700 mt-4 sm:mt-6 pt-3 sm:pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-green-200 font-body text-sm sm:text-base text-center sm:text-left">
                © 2024 Organic Hub. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <Link to="/privacy" className="text-green-200 hover:text-white transition-colors font-accent">
                  Privacy Policy
                </Link>
                <span className="text-green-600">|</span>
                <Link to="/terms" className="text-green-200 hover:text-white transition-colors font-accent">
                  Terms of Service
                </Link>
                <span className="text-green-600">|</span>
                <Link to="/shipping" className="text-green-200 hover:text-white transition-colors font-accent">
                  Shipping Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
