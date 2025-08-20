import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Star, ShoppingCart, Heart, Leaf, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { aiImageUrl } from '@/utils/helpers'
import SeasonalHero from '@/components/Seasonal/SeasonalHero'
import SeasonalBanner from '@/components/Seasonal/SeasonalBanner'
import ProductGrid from '@/components/Product/ProductGrid'
import ProductCard from '@/components/Product/ProductCard'

const SeasonalProducts = () => {
  const { currentSeason } = useSelector((state) => state.seasonal)
  const [seasonalProducts, setSeasonalProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Seasonal content configuration
  const seasonalContent = {
    spring: {
      title: 'Spring Freshness',
      subtitle: 'Welcome the season with fresh, vibrant produce',
      description: 'Spring brings new life and fresh flavors. Enjoy the season\'s best organic vegetables and fruits.',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50',
      products: [
        {
          id: 'spring-1',
          name: 'Fresh Asparagus',
          category: 'vegetables',
          price: 180,
          originalPrice: 220,
          rating: 4.9,
          reviews: 89,
          image: aiImageUrl('fresh organic asparagus, spring vegetables, green, crisp, natural lighting', 600, 600, 401),
          description: 'Tender spring asparagus rich in vitamins and minerals',
          inStock: true,
          discount: 18,
          tags: ['spring', 'organic', 'vitamins'],
          seasonality: 'March - May'
        },
        {
          id: 'spring-2',
          name: 'Spring Peas',
          category: 'vegetables',
          price: 120,
          originalPrice: 150,
          rating: 4.7,
          reviews: 67,
          image: aiImageUrl('fresh organic spring peas, green, sweet, natural background', 600, 600, 402),
          description: 'Sweet spring peas packed with protein and fiber',
          inStock: true,
          discount: 20,
          tags: ['spring', 'organic', 'protein'],
          seasonality: 'March - June'
        },
        {
          id: 'spring-3',
          name: 'Fresh Strawberries',
          category: 'fruits',
          price: 250,
          originalPrice: 300,
          rating: 4.9,
          reviews: 156,
          image: aiImageUrl('fresh organic strawberries, spring fruits, red, sweet, natural lighting', 600, 600, 403),
          description: 'Sweet spring strawberries rich in antioxidants',
          inStock: true,
          discount: 17,
          tags: ['spring', 'organic', 'antioxidants'],
          seasonality: 'April - June'
        },
        {
          id: 'spring-4',
          name: 'Spring Onions',
          category: 'vegetables',
          price: 80,
          originalPrice: 100,
          rating: 4.6,
          reviews: 45,
          image: aiImageUrl('fresh organic spring onions, green, mild, natural background', 600, 600, 404),
          description: 'Mild spring onions perfect for salads and cooking',
          inStock: true,
          discount: 20,
          tags: ['spring', 'organic', 'mild'],
          seasonality: 'March - May'
        }
      ]
    },
    summer: {
      title: 'Summer Bounty',
      subtitle: 'Enjoy the sun-ripened flavors of summer',
      description: 'Summer brings the most colorful and flavorful organic produce. Perfect for refreshing meals and healthy snacks.',
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'from-orange-50 to-yellow-50',
      products: [
        {
          id: 'summer-1',
          name: 'Fresh Watermelon',
          category: 'fruits',
          price: 120,
          originalPrice: 150,
          rating: 4.8,
          reviews: 234,
          image: aiImageUrl('fresh organic watermelon, summer fruit, red, juicy, natural lighting', 600, 600, 405),
          description: 'Juicy summer watermelon perfect for hydration',
          inStock: true,
          discount: 20,
          tags: ['summer', 'organic', 'hydration'],
          seasonality: 'June - August'
        },
        {
          id: 'summer-2',
          name: 'Summer Corn',
          category: 'vegetables',
          price: 90,
          originalPrice: 110,
          rating: 4.7,
          reviews: 89,
          image: aiImageUrl('fresh organic summer corn, yellow, sweet, natural background', 600, 600, 406),
          description: 'Sweet summer corn rich in fiber and nutrients',
          inStock: true,
          discount: 18,
          tags: ['summer', 'organic', 'fiber'],
          seasonality: 'June - September'
        },
        {
          id: 'summer-3',
          name: 'Fresh Cucumber',
          category: 'vegetables',
          price: 60,
          originalPrice: 75,
          rating: 4.6,
          reviews: 123,
          image: aiImageUrl('fresh organic cucumber, summer vegetable, green, crisp, natural lighting', 600, 600, 407),
          description: 'Crisp summer cucumber perfect for salads',
          inStock: true,
          discount: 20,
          tags: ['summer', 'organic', 'crisp'],
          seasonality: 'June - September'
        },
        {
          id: 'summer-4',
          name: 'Summer Berries',
          category: 'fruits',
          price: 200,
          originalPrice: 250,
          rating: 4.9,
          reviews: 178,
          image: aiImageUrl('fresh organic summer berries, mixed, colorful, natural lighting', 600, 600, 408),
          description: 'Mixed summer berries rich in antioxidants',
          inStock: true,
          discount: 20,
          tags: ['summer', 'organic', 'antioxidants'],
          seasonality: 'June - August'
        }
      ]
    },
    monsoon: {
      title: 'Monsoon Magic',
      subtitle: 'Embrace the rains with fresh monsoon produce',
      description: 'Monsoon season brings unique flavors and fresh produce. Perfect for warm, comforting meals.',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
      products: [
        {
          id: 'monsoon-1',
          name: 'Fresh Mushrooms',
          category: 'vegetables',
          price: 140,
          originalPrice: 175,
          rating: 4.8,
          reviews: 67,
          image: aiImageUrl('fresh organic mushrooms, monsoon vegetables, natural, earthy, natural lighting', 600, 600, 409),
          description: 'Fresh monsoon mushrooms rich in protein',
          inStock: true,
          discount: 20,
          tags: ['monsoon', 'organic', 'protein'],
          seasonality: 'July - September'
        },
        {
          id: 'monsoon-2',
          name: 'Monsoon Greens',
          category: 'vegetables',
          price: 100,
          originalPrice: 125,
          rating: 4.7,
          reviews: 89,
          image: aiImageUrl('fresh organic monsoon greens, leafy vegetables, natural background', 600, 600, 410),
          description: 'Nutrient-rich monsoon greens for healthy meals',
          inStock: true,
          discount: 20,
          tags: ['monsoon', 'organic', 'nutrients'],
          seasonality: 'July - September'
        },
        {
          id: 'monsoon-3',
          name: 'Fresh Ginger',
          category: 'natural',
          price: 120,
          originalPrice: 150,
          rating: 4.9,
          reviews: 156,
          image: aiImageUrl('fresh organic ginger, monsoon spice, natural, aromatic, natural lighting', 600, 600, 411),
          description: 'Aromatic monsoon ginger perfect for teas and cooking',
          inStock: true,
          discount: 20,
          tags: ['monsoon', 'organic', 'aromatic'],
          seasonality: 'July - September'
        },
        {
          id: 'monsoon-4',
          name: 'Monsoon Herbs',
          category: 'natural',
          price: 80,
          originalPrice: 100,
          rating: 4.6,
          reviews: 78,
          image: aiImageUrl('fresh organic monsoon herbs, mixed herbs, natural, aromatic', 600, 600, 412),
          description: 'Fresh monsoon herbs for enhanced flavors',
          inStock: true,
          discount: 20,
          tags: ['monsoon', 'organic', 'herbs'],
          seasonality: 'July - September'
        }
      ]
    },
    winter: {
      title: 'Winter Warmth',
      subtitle: 'Cozy up with winter\'s finest produce',
      description: 'Winter brings hearty vegetables and citrus fruits. Perfect for warming meals and immune support.',
      color: 'from-purple-500 to-blue-500',
      bgColor: 'from-purple-50 to-blue-50',
      products: [
        {
          id: 'winter-1',
          name: 'Winter Squash',
          category: 'vegetables',
          price: 160,
          originalPrice: 200,
          rating: 4.8,
          reviews: 134,
          image: aiImageUrl('fresh organic winter squash, orange, hearty, natural lighting', 600, 600, 413),
          description: 'Hearty winter squash rich in vitamins',
          inStock: true,
          discount: 20,
          tags: ['winter', 'organic', 'vitamins'],
          seasonality: 'December - February'
        },
        {
          id: 'winter-2',
          name: 'Fresh Citrus',
          category: 'fruits',
          price: 180,
          originalPrice: 225,
          rating: 4.9,
          reviews: 189,
          image: aiImageUrl('fresh organic citrus fruits, winter, oranges lemons, natural lighting', 600, 600, 414),
          description: 'Fresh winter citrus rich in vitamin C',
          inStock: true,
          discount: 20,
          tags: ['winter', 'organic', 'vitamin-c'],
          seasonality: 'December - March'
        },
        {
          id: 'winter-3',
          name: 'Root Vegetables',
          category: 'vegetables',
          price: 140,
          originalPrice: 175,
          rating: 4.7,
          reviews: 98,
          image: aiImageUrl('fresh organic root vegetables, winter, carrots potatoes, natural background', 600, 600, 415),
          description: 'Nutritious winter root vegetables',
          inStock: true,
          discount: 20,
          tags: ['winter', 'organic', 'nutritious'],
          seasonality: 'December - February'
        },
        {
          id: 'winter-4',
          name: 'Winter Greens',
          category: 'vegetables',
          price: 120,
          originalPrice: 150,
          rating: 4.6,
          reviews: 76,
          image: aiImageUrl('fresh organic winter greens, leafy vegetables, natural lighting', 600, 600, 416),
          description: 'Fresh winter greens for healthy meals',
          inStock: true,
          discount: 20,
          tags: ['winter', 'organic', 'healthy'],
          seasonality: 'December - February'
        }
      ]
    }
  }

  const currentSeasonData = seasonalContent[currentSeason] || seasonalContent.spring

  useEffect(() => {
    setSeasonalProducts(currentSeasonData.products)
  }, [currentSeason, currentSeasonData])

  const filteredProducts = selectedCategory === 'all' 
    ? seasonalProducts 
    : seasonalProducts.filter(product => product.category === selectedCategory)

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥦' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'natural', name: 'Natural', icon: '🍯' }
  ]

  const handleAddToCart = (product) => {
    // TODO: Implement add to cart functionality
    console.log('Added to cart:', product.name)
  }

  const handleWishlist = (product) => {
    // TODO: Implement wishlist functionality
    console.log('Added to wishlist:', product.name)
  }

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <SeasonalHero />

      {/* Seasonal Banner */}
      <section className="py-12 sm:py-16 bg-white w-full">
        <SeasonalBanner 
          title={`${currentSeasonData.title} Collection`}
          subtitle={currentSeasonData.subtitle}
        />
      </section>

      {/* Seasonal Description */}
      <section className={`py-16 sm:py-20 bg-gradient-to-br ${currentSeasonData.bgColor} w-full`}>
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-green-800 mb-6">
                {currentSeasonData.title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 font-body leading-relaxed">
                {currentSeasonData.description}
              </p>
              
              {/* Season Info */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span className="font-accent text-green-800">Current Season</span>
                </div>
                <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="font-accent text-green-800">
                    {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)} Products
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white w-full">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-heading text-green-800 mb-4">
              Browse by Category
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-accent transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Products */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-green-50 to-emerald-50 w-full">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-green-800 mb-6">
              {currentSeasonData.title} Products
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-body">
              Handpicked seasonal products for the best flavors and nutrition
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <ProductGrid>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = aiImageUrl('organic product placeholder', 600, 600, 1)
                        }}
                      />
                      
                      {/* Season Badge */}
                      <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-accent">
                        {currentSeason}
                      </div>
                      
                      {/* Discount Badge */}
                      {product.discount > 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-accent">
                          -{product.discount}%
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-heading text-xl text-green-800">{product.name}</h3>
                        <button
                          onClick={() => handleWishlist(product)}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                        >
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <p className="text-gray-600 font-body mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      
                      {/* Seasonality */}
                      <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 font-body">
                        <Calendar className="w-4 h-4" />
                        <span>{product.seasonality}</span>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 font-body">
                          ({product.reviews})
                        </span>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="font-accent text-2xl text-green-700">
                            ₹{product.price}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="font-body text-lg text-gray-400 line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 font-accent flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </ProductGrid>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🍂</div>
              <h3 className="text-2xl font-heading text-green-800 mb-2">No products in this category</h3>
              <p className="text-gray-600 font-body mb-6">
                Try selecting a different category or check back later
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-green-600 to-green-700 w-full">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6">
                Ready to Experience Seasonal Freshness?
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-green-100 mb-8 font-body">
                Explore our complete collection of organic products
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/products"
                  className="group bg-white text-green-700 hover:bg-green-50 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 font-accent text-lg flex items-center gap-3"
                >
                  View All Products
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                
                <Link
                  to="/cart"
                  className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-700 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 font-accent text-lg"
                >
                  Go to Cart
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
  </div>
)
}

export default SeasonalProducts
