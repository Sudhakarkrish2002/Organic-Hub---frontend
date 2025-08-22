import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import { aiImageUrl } from '@/utils/helpers'
import useCart from '@/hooks/useCart.jsx'
import ProductGrid from '@/components/Product/ProductGrid'
import ProductCard from '@/components/Product/ProductCard'
import useWishlist from '@/hooks/useWishlist'

const Products = () => {
  const { addItemToCart, isItemInCart } = useCart()
  const { toggleWishlist } = useWishlist()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [sortBy, setSortBy] = useState('name')
  const [showFilters, setShowFilters] = useState(false)

  // Sample organic products with AI images
  const sampleProducts = [
    {
      _id: 1,
      name: 'Fresh Organic Tomatoes',
      category: 'vegetables',
      price: 120,
      originalPrice: 150,
      rating: 4.8,
      reviews: 156,
      image: aiImageUrl('fresh organic red tomatoes, high quality, natural lighting, studio photography', 600, 600, 301),
      description: 'Fresh, juicy organic tomatoes rich in lycopene and antioxidants',
      inStock: true,
      discount: 20,
      tags: ['organic', 'fresh', 'antioxidants']
    },
    {
      _id: 2,
      name: 'Organic Bananas',
      category: 'fruits',
      price: 80,
      originalPrice: 100,
      rating: 4.6,
      reviews: 89,
      image: aiImageUrl('organic yellow bananas, fresh, natural, high detail photography', 600, 600, 302),
      description: 'Sweet organic bananas packed with potassium and natural energy',
      inStock: true,
      discount: 20,
      tags: ['organic', 'energy', 'potassium']
    },
    {
      _id: 3,
      name: 'Fresh Spinach Leaves',
      category: 'vegetables',
      price: 60,
      originalPrice: 75,
      rating: 4.9,
      reviews: 203,
      image: aiImageUrl('fresh organic spinach leaves, green, crisp, macro photography', 600, 600, 303),
      description: 'Nutrient-rich organic spinach with iron and vitamins',
      inStock: true,
      discount: 20,
      tags: ['organic', 'iron', 'vitamins']
    },
    {
      _id: 4,
      name: 'Organic Apples',
      category: 'fruits',
      price: 200,
      originalPrice: 250,
      rating: 4.7,
      reviews: 134,
      image: aiImageUrl('organic red apples, fresh, crisp, natural lighting, food photography', 600, 600, 304),
      description: 'Crisp organic apples with natural sweetness and fiber',
      inStock: true,
      discount: 20,
      tags: ['organic', 'fiber', 'antioxidants']
    },
    {
      _id: 5,
      name: 'Fresh Carrots',
      category: 'vegetables',
      price: 90,
      originalPrice: 110,
      rating: 4.5,
      reviews: 78,
      image: aiImageUrl('fresh organic carrots, orange, crisp, natural background', 600, 600, 305),
      description: 'Sweet organic carrots rich in beta-carotene and fiber',
      inStock: true,
      discount: 18,
      tags: ['organic', 'beta-carotene', 'fiber']
    },
    {
      _id: 6,
      name: 'Organic Oranges',
      category: 'fruits',
      price: 150,
      originalPrice: 180,
      rating: 4.8,
      reviews: 167,
      image: aiImageUrl('organic oranges, fresh, juicy, citrus, natural lighting', 600, 600, 306),
      description: 'Juicy organic oranges packed with vitamin C and antioxidants',
      inStock: true,
      discount: 17,
      tags: ['organic', 'vitamin-c', 'antioxidants']
    },
    {
      _id: 7,
      name: 'Fresh Broccoli',
      category: 'vegetables',
      price: 100,
      originalPrice: 120,
      rating: 4.6,
      reviews: 92,
      image: aiImageUrl('fresh organic broccoli, green, crisp, macro photography', 600, 600, 307),
      description: 'Nutritious organic broccoli with vitamins and minerals',
      inStock: true,
      discount: 17,
      tags: ['organic', 'vitamins', 'minerals']
    },
    {
      _id: 8,
      name: 'Organic Strawberries',
      category: 'fruits',
      price: 180,
      originalPrice: 220,
      rating: 4.9,
      reviews: 245,
      image: aiImageUrl('organic strawberries, red, fresh, sweet, natural lighting', 600, 600, 308),
      description: 'Sweet organic strawberries rich in antioxidants and vitamin C',
      inStock: true,
      discount: 18,
      tags: ['organic', 'antioxidants', 'vitamin-c']
    },
    {
      _id: 9,
      name: 'Fresh Cauliflower',
      category: 'vegetables',
      price: 85,
      originalPrice: 105,
      rating: 4.4,
      reviews: 67,
      image: aiImageUrl('fresh organic cauliflower, white, crisp, natural background', 600, 600, 309),
      description: 'Fresh organic cauliflower with anti-inflammatory properties',
      inStock: true,
      discount: 19,
      tags: ['organic', 'anti-inflammatory', 'fiber']
    },
    {
      _id: 10,
      name: 'Organic Grapes',
      category: 'fruits',
      price: 160,
      originalPrice: 200,
      rating: 4.7,
      reviews: 123,
      image: aiImageUrl('organic grapes, purple, fresh, natural, food photography', 600, 600, 310),
      description: 'Sweet organic grapes with natural sugars and antioxidants',
      inStock: true,
      discount: 20,
      tags: ['organic', 'antioxidants', 'natural-sugar']
    },
    {
      _id: 11,
      name: 'Fresh Bell Peppers',
      category: 'vegetables',
      price: 120,
      originalPrice: 150,
      rating: 4.5,
      reviews: 89,
      image: aiImageUrl('fresh organic bell peppers, colorful, crisp, natural lighting', 600, 600, 311),
      description: 'Colorful organic bell peppers rich in vitamins and antioxidants',
      inStock: true,
      discount: 20,
      tags: ['organic', 'vitamins', 'antioxidants']
    },
    {
      _id: 12,
      name: 'Organic Mangoes',
      category: 'fruits',
      price: 250,
      originalPrice: 300,
      rating: 4.8,
      reviews: 178,
      image: aiImageUrl('organic mangoes, ripe, yellow, tropical, natural lighting', 600, 600, 312),
      description: 'Sweet organic mangoes with tropical flavor and vitamins',
      inStock: true,
      discount: 17,
      tags: ['organic', 'tropical', 'vitamins']
    },
    // Dairy
    {
      _id: 13,
      name: 'Organic Whole Milk (1L)',
      category: 'dairy',
      price: 70,
      originalPrice: 85,
      rating: 4.7,
      reviews: 210,
      image: aiImageUrl('glass bottle of organic whole milk, minimal aesthetic, soft natural lighting, condensation, studio photography', 600, 600, 401),
      description: 'Creamy farm-fresh organic whole milk, antibiotic-free and hormone-free',
      inStock: true,
      discount: 18,
      tags: ['dairy', 'organic', 'calcium']
    },
    {
      _id: 14,
      name: 'Farm Fresh Yogurt (500g)',
      category: 'dairy',
      price: 65,
      originalPrice: 80,
      rating: 4.6,
      reviews: 164,
      image: aiImageUrl('organic plain yogurt in ceramic bowl with spoon, creamy texture, soft daylight food photography', 600, 600, 402),
      description: 'Thick and creamy probiotic-rich organic yogurt',
      inStock: true,
      discount: 19,
      tags: ['dairy', 'probiotics', 'organic']
    },
    {
      _id: 15,
      name: 'Grass-Fed Butter (200g)',
      category: 'dairy',
      price: 160,
      originalPrice: 190,
      rating: 4.8,
      reviews: 132,
      image: aiImageUrl('organic grass-fed butter block on parchment, golden color, rustic wooden board, soft light', 600, 600, 403),
      description: 'Rich, golden butter made from grass-fed organic milk',
      inStock: true,
      discount: 16,
      tags: ['dairy', 'grass-fed', 'healthy-fats']
    },
    {
      _id: 16,
      name: 'Organic Paneer (200g)',
      category: 'dairy',
      price: 95,
      originalPrice: 120,
      rating: 4.5,
      reviews: 98,
      image: aiImageUrl('fresh organic paneer cubes on a plate, soft texture, bright clean lighting, food photography', 600, 600, 404),
      description: 'Soft, fresh organic paneer with high protein content',
      inStock: true,
      discount: 21,
      tags: ['dairy', 'protein', 'fresh']
    },
    // Grains
    {
      _id: 17,
      name: 'Organic Brown Rice (1kg)',
      category: 'grains',
      price: 140,
      originalPrice: 170,
      rating: 4.7,
      reviews: 187,
      image: aiImageUrl('organic brown rice grains in a bowl, earthy tones, natural light, high detail', 600, 600, 405),
      description: 'Whole-grain brown rice rich in fiber and nutrients',
      inStock: true,
      discount: 18,
      tags: ['grains', 'fiber', 'whole-grain']
    },
    {
      _id: 18,
      name: 'Organic Quinoa (500g)',
      category: 'grains',
      price: 220,
      originalPrice: 260,
      rating: 4.6,
      reviews: 143,
      image: aiImageUrl('raw organic quinoa seeds in glass jar, clean minimal style, studio lighting', 600, 600, 406),
      description: 'High-protein organic quinoa, complete plant protein source',
      inStock: true,
      discount: 15,
      tags: ['grains', 'protein', 'gluten-free']
    },
    {
      _id: 19,
      name: 'Whole Wheat Flour (Atta) 1kg',
      category: 'grains',
      price: 70,
      originalPrice: 90,
      rating: 4.5,
      reviews: 165,
      image: aiImageUrl('organic whole wheat flour in bowl with grains, rustic kitchen scene, soft daylight', 600, 600, 407),
      description: 'Stone-ground organic whole wheat flour for healthier rotis and baking',
      inStock: true,
      discount: 22,
      tags: ['grains', 'whole-wheat', 'fiber']
    },
    {
      _id: 20,
      name: 'Rolled Oats (1kg)',
      category: 'grains',
      price: 180,
      originalPrice: 210,
      rating: 4.7,
      reviews: 121,
      image: aiImageUrl('organic rolled oats in bowl with spoon, cozy breakfast aesthetic, high detail', 600, 600, 408),
      description: 'Heart-healthy organic rolled oats for wholesome breakfast bowls',
      inStock: true,
      discount: 14,
      tags: ['grains', 'fiber', 'breakfast']
    },
    // Natural
    {
      _id: 21,
      name: 'Raw Forest Honey (500g)',
      category: 'natural',
      price: 320,
      originalPrice: 380,
      rating: 4.8,
      reviews: 204,
      image: aiImageUrl('jar of raw organic honey with honey dipper, golden glow, sunlight, high detail', 600, 600, 409),
      description: 'Unprocessed raw honey rich in enzymes and antioxidants',
      inStock: true,
      discount: 16,
      tags: ['natural', 'antioxidants', 'raw']
    },
    {
      _id: 22,
      name: 'Cold-Pressed Coconut Oil (500ml)',
      category: 'natural',
      price: 280,
      originalPrice: 330,
      rating: 4.7,
      reviews: 149,
      image: aiImageUrl('clear bottle of cold pressed organic coconut oil, coconut halves, clean minimal scene, soft light', 600, 600, 410),
      description: 'Pure cold-pressed coconut oil for cooking and wellness',
      inStock: true,
      discount: 15,
      tags: ['natural', 'cold-pressed', 'healthy-fats']
    },
    {
      _id: 23,
      name: 'Organic Jaggery (800g)',
      category: 'natural',
      price: 180,
      originalPrice: 220,
      rating: 4.6,
      reviews: 112,
      image: aiImageUrl('organic jaggery blocks on a plate, rustic look, warm tones, high detail', 600, 600, 411),
      description: 'Natural unrefined cane sweetener rich in minerals',
      inStock: true,
      discount: 18,
      tags: ['natural', 'unrefined', 'minerals']
    },
    {
      _id: 24,
      name: 'Raw Almonds (500g)',
      category: 'natural',
      price: 420,
      originalPrice: 480,
      rating: 4.9,
      reviews: 256,
      image: aiImageUrl('raw organic almonds in bowl, top-down, clean background, studio lighting, high detail', 600, 600, 412),
      description: 'Crunchy raw almonds packed with healthy fats and vitamin E',
      inStock: true,
      discount: 12,
      tags: ['natural', 'nuts', 'vitamin-e']
    }
  ]

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥦' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'dairy', name: 'Dairy', icon: '🥛' },
    { id: 'grains', name: 'Grains', icon: '🌾' },
    { id: 'natural', name: 'Natural', icon: '🍯' }
  ]

  useEffect(() => {
    setProducts(sampleProducts)
    setFilteredProducts(sampleProducts)
  }, [])

  useEffect(() => {
    let filtered = products

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, priceRange, sortBy, products])

  const handleAddToCart = (product) => {
    addItemToCart(product, 1)
  }

  const handleWishlist = (product) => {
    toggleWishlist(product)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setPriceRange([0, 2000])
    setSortBy('name')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-6 sm:py-8 md:py-12">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-green-800 mb-4 sm:mb-6">
            Our Products
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-body px-4">
            Discover our premium selection of organic products
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 font-body text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 font-body text-sm sm:text-base"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:w-auto px-4 sm:px-6 py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg sm:rounded-xl transition-colors duration-200 font-accent text-sm sm:text-base flex items-center gap-2 justify-center"
            >
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {/* Categories */}
                <div>
                  <h3 className="font-heading text-base sm:text-lg text-green-800 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={selectedCategory === category.id}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="text-green-600 focus:ring-green-500"
                        />
                        <span className="text-xl sm:text-2xl">{category.icon}</span>
                        <span className="font-body text-sm sm:text-base">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-heading text-base sm:text-lg text-green-800 mb-3">Price Range</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="font-body text-xs sm:text-sm">₹{priceRange[0]}</span>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <span className="font-body text-xs sm:text-sm">₹{priceRange[1]}</span>
                    </div>
                    <div className="text-center">
                      <span className="font-accent text-sm sm:text-base text-green-600">
                        ₹{priceRange[0]} - ₹{priceRange[1]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div>
                  <h3 className="font-heading text-base sm:text-lg text-green-800 mb-3">Quick Stats</h3>
                  <div className="space-y-2 text-xs sm:text-sm font-body">
                    <div className="flex justify-between">
                      <span>Total Products:</span>
                      <span className="font-semibold text-green-600">{filteredProducts.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Categories:</span>
                      <span className="font-semibold text-green-600">{categories.length - 1}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Rating:</span>
                      <span className="font-semibold text-green-600">
                        {(filteredProducts.reduce((acc, p) => acc + p.rating, 0) / Math.max(filteredProducts.length, 1)).toFixed(1)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Clear Filters Button */}
                  <button
                    onClick={clearFilters}
                    className="mt-3 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 font-accent text-xs sm:text-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-gray-600 font-body text-sm sm:text-base">
            Showing <span className="font-semibold text-green-600">{filteredProducts.length}</span> products
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <ProductGrid>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onWishlist={handleWishlist}
                />
              </motion.div>
            ))}
          </ProductGrid>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16"
          >
            <div className="text-4xl sm:text-6xl mb-4">🔍</div>
            <h3 className="text-xl sm:text-2xl font-heading text-green-800 mb-2">No products found</h3>
            <p className="text-gray-600 font-body mb-6 text-sm sm:text-base">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={clearFilters}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-colors duration-200 font-accent text-sm sm:text-base"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Products


