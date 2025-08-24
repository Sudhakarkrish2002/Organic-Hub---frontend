// src/pages/Home.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Star, Truck, Shield, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { aiImageUrl } from '@/shared/utils/helpers'
import useCart from '@/features/cart/hooks/useCart.jsx'

const Home = () => {
  const { addItemToCart, isItemInCart } = useCart()

  const categories = [
    { name: 'Vegetables', icon: '🥦', path: '/products?category=vegetables', img: aiImageUrl('fresh organic vegetables in basket, high detail, natural light', 600, 400, 101) },
    { name: 'Fruits', icon: '🍎', path: '/products?category=fruits', img: aiImageUrl('fresh organic fruits assortment, apples berries citrus, colorful, realistic', 600, 400, 102) },
    { name: 'Dairy', icon: '🥛', path: '/products?category=dairy', img: aiImageUrl('organic dairy milk and cheese on rustic table, soft lighting, photorealistic', 600, 400, 103) },
    { name: 'Grains', icon: '🌾', path: '/products?category=grains', img: aiImageUrl('organic grains and rice in bowls, minimal aesthetic, top view', 600, 400, 104) },
    { name: 'Natural', icon: '🍯', path: '/products?category=natural', img: aiImageUrl('organic honey and spices, warm tones, macro photography', 600, 400, 105) },
  ]

  const features = [
    {
      icon: <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />,
      title: '100% Organic',
      description: 'Certified organic products from trusted farmers'
    },
    {
      icon: <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />,
      title: 'Fast Delivery',
      description: 'Same day delivery for fresh products'
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />,
      title: 'Quality Assured',
      description: 'Premium quality guaranteed on every order'
    },
    {
      icon: <Star className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />,
      title: 'Best Prices',
      description: 'Competitive prices for organic products'
    }
  ]

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section with Blur Banner */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 w-full overflow-hidden">
        {/* Background Image with Blur */}
        <div className="absolute inset-0 z-0">
          <img
            src={aiImageUrl('organic farm landscape, fresh vegetables, fruits, natural lighting, bokeh effect, professional photography', 1920, 1080, 201)}
            alt="Organic Farm Landscape"
            className="w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src = aiImageUrl('organic vegetables fruits farm, natural background', 1920, 1080, 202)
            }}
          />
          {/* Overlay with blur effect */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-4xl lg:max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 sm:mb-8"
            >
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-md rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 border border-white/30">
                <Leaf className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                <span className="text-white font-accent text-xs sm:text-sm">Fresh from the Farm</span>
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-display text-white mb-4 sm:mb-6 lg:mb-8 leading-tight drop-shadow-2xl"
            >
              Fresh Organic
              <span className="block text-green-300">Products</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/90 mb-8 sm:mb-10 lg:mb-12 font-body leading-relaxed max-w-3xl mx-auto drop-shadow-lg px-4"
            >
              Discover the finest organic produce, handpicked and delivered fresh to your doorstep. 
              Supporting sustainable farming and your healthy lifestyle.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            >
              <Link
                to="/products"
                className="group bg-green-600 hover:bg-green-700 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl transform hover:scale-105 font-accent text-base sm:text-lg flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/seasonal"
                className="group bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl border border-white/30 transition-all duration-300 hover:scale-105 font-accent text-base sm:text-lg w-full sm:w-auto text-center"
              >
                Seasonal Offers
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white w-full">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-heading text-green-800 mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 font-body">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-green-50 to-emerald-50 w-full">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display text-green-800 mb-4 sm:mb-6">
              Shop by Category
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-body px-4">
              Explore our wide range of organic products
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link to={category.path} className="block">
                  <div className="bg-white border-2 border-green-100 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={category.img}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = aiImageUrl('organic category placeholder, simple minimal background', 600, 400, 5)
                        }}
                      />
                    </div>
                    <div className="p-3 sm:p-4 md:p-6 text-center">
                      <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">{category.icon}</div>
                      <div className="font-heading text-sm sm:text-base md:text-lg lg:text-xl text-green-800">{category.name}</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white w-full">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display text-green-800 mb-4 sm:mb-6">
              Featured Products
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-body px-4">
              Handpicked organic products for you
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                _id: 'home-1',
                name: 'Fresh Organic Tomatoes',
                price: 120,
                image: aiImageUrl('fresh organic red tomatoes, high quality, natural lighting, studio photography', 600, 600, 401)
              },
              {
                _id: 'home-2',
                name: 'Organic Bananas',
                price: 80,
                image: aiImageUrl('organic yellow bananas, fresh, natural, high detail photography', 600, 600, 402)
              },
              {
                _id: 'home-3',
                name: 'Fresh Spinach Leaves',
                price: 60,
                image: aiImageUrl('fresh organic spinach leaves, green, crisp, macro photography', 600, 600, 403)
              },
              {
                _id: 'home-4',
                name: 'Organic Apples',
                price: 200,
                image: aiImageUrl('organic red apples, fresh, crisp, natural lighting, food photography', 600, 600, 404)
              }
            ].map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-green-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg sm:rounded-xl mb-3 sm:mb-4 aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = aiImageUrl('organic product placeholder, simple minimal background', 600, 600, 405)
                    }}
                  />
                </div>
                <div className="font-heading text-lg sm:text-xl text-green-800 mb-2 sm:mb-3">{product.name}</div>
                <div className="font-accent text-xl sm:text-2xl text-green-700 mb-3 sm:mb-4">₹{product.price}</div>
                <button
                  onClick={() => addItemToCart(product, 1)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-colors duration-200 font-accent text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {isItemInCart(product._id) ? 'Added' : 'Add to Cart'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home