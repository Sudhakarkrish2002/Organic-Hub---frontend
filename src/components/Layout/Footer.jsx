import React from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Facebook, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-green-800 to-green-900 text-white w-full">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-20">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            {/* Company Info */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
                  <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-display">Organic Hub</span>
              </div>
              <p className="text-green-100 mb-4 sm:mb-6 leading-relaxed font-body text-sm sm:text-base">
                Fresh, organic, and healthy products delivered right to your doorstep. 
                Supporting sustainable farming and your healthy lifestyle.
              </p>
              <div className="flex space-x-4 sm:space-x-5">
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-green-300 hover:text-white cursor-pointer transition-all duration-200 hover:scale-110" />
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6 text-green-300 hover:text-white cursor-pointer transition-all duration-200 hover:scale-110" />
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-green-300 hover:text-white cursor-pointer transition-all duration-200 hover:scale-110" />
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg sm:text-xl font-heading mb-4 sm:mb-6">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><Link to="/products" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block">All Products</Link></li>
                <li><Link to="/seasonal" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block">Seasonal</Link></li>
                <li><Link to="/about" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block">About Us</Link></li>
                <li><Link to="/contact" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block">Contact</Link></li>
              </ul>
            </div>
            
            {/* Categories */}
            <div>
              <h3 className="text-lg sm:text-xl font-heading mb-4 sm:mb-6">Categories</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><Link to="/products?category=vegetables" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block">🥦 Vegetables</Link></li>
                <li><Link to="/products?category=fruits" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block">🍎 Fruits</Link></li>
                <li><Link to="/products?category=dairy" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block">🥛 Dairy</Link></li>
                <li><Link to="/products?category=grains" className="text-green-100 hover:text-white transition-all duration-200 font-accent text-sm sm:text-base hover:translate-x-2 inline-block">🌾 Grains</Link></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg sm:text-xl font-heading mb-4 sm:mb-6">Contact Us</h3>
              <ul className="space-y-3 sm:space-y-4">
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
            </div>
          </div>
          
          <div className="border-t border-green-700 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
            <p className="text-green-200 font-body text-sm sm:text-base">
              © 2024 Organic Hub. All rights reserved. | 
              <Link to="/privacy" className="hover:text-white transition-colors font-accent"> Privacy Policy</Link> | 
              <Link to="/terms" className="hover:text-white transition-colors font-accent"> Terms of Service</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
