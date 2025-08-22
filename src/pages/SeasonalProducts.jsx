import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import SeasonalHero from '@/components/Seasonal/SeasonalHero'
import ProductCard from '@/components/Product/ProductCard'
import useCart from '@/hooks/useCart.jsx'
import useWishlist from '@/hooks/useWishlist'
import { Calendar, Star, Home, ChevronRight } from 'lucide-react'

const SeasonalProducts = () => {
  const { currentSeason } = useSelector((state) => state.seasonal)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { addItemToCart } = useCart()
  const { toggleWishlist } = useWishlist()

  const seasonalProducts = useMemo(() => {
    const productsBySeason = {
      spring: [
        { _id: 'spring-1', name: 'Fresh Asparagus', category: 'vegetables', price: 180, originalPrice: 220, rating: 5, reviews: 89, image: 'https://image.pollinations.ai/prompt/fresh%20organic%20asparagus%20spears%20on%20wooden%20board%2C%20green%20vegetables%2C%20natural%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=531', seasonality: 'Mar - May', description: 'Tender spring asparagus rich in vitamins' },
        { _id: 'spring-2', name: 'Farm Fresh Yogurt', category: 'dairy', price: 65, originalPrice: 80, rating: 5, reviews: 144, image: 'https://image.pollinations.ai/prompt/farm%20fresh%20organic%20yogurt%20in%20ceramic%20bowl%2C%20creamy%20texture%2C%20soft%20daylight?width=800&height=600&nologo=true&seed=521', seasonality: 'Mar - May', description: 'Creamy probiotic yogurt' },
        { _id: 'spring-3', name: 'Raw Forest Honey', category: 'natural', price: 320, originalPrice: 380, rating: 5, reviews: 204, image: 'https://image.pollinations.ai/prompt/jar%20of%20raw%20organic%20honey%20with%20dipper%2C%20golden%20glow%2C%20sunlight%2C%20high%20detail?width=800&height=600&nologo=true&seed=522', seasonality: 'All year', description: 'Unprocessed raw honey' },
      ],
      summer: [
        { _id: 'summer-1', name: 'Fresh Watermelon', category: 'fruits', price: 120, originalPrice: 150, rating: 5, reviews: 234, image: 'https://image.pollinations.ai/prompt/fresh%20organic%20watermelon%20sliced%20open%2C%20bright%20red%20flesh%2C%20green%20rind%2C%20juicy%20summer%20fruit%2C%20natural%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=529', seasonality: 'Jun - Aug', description: 'Juicy summer watermelon rich in hydration and vitamins' },
        { _id: 'summer-2', name: 'Fresh Cucumber', category: 'vegetables', price: 60, originalPrice: 75, rating: 5, reviews: 123, image: 'https://image.pollinations.ai/prompt/fresh%20organic%20cucumbers%20on%20wooden%20board%2C%20crisp%20green%20vegetables%2C%20natural%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=530', seasonality: 'Jun - Sep', description: 'Crisp and refreshing organic cucumbers' },
        { _id: 'summer-3', name: 'Organic Whole Milk', category: 'dairy', price: 70, originalPrice: 85, rating: 5, reviews: 210, image: 'https://image.pollinations.ai/prompt/glass%20bottle%20of%20organic%20whole%20milk%2C%20minimal%20aesthetic%2C%20soft%20natural%20lighting%2C%20condensation%2C%20studio%20photography?width=800&height=600&nologo=true&seed=523', seasonality: 'All year', description: 'Creamy whole milk' },
        { _id: 'summer-4', name: 'Cold-Pressed Coconut Oil', category: 'natural', price: 280, originalPrice: 330, rating: 5, reviews: 149, image: 'https://image.pollinations.ai/prompt/clear%20bottle%20of%20cold%20pressed%20organic%20coconut%20oil%2C%20coconut%20halves%2C%20clean%20minimal%20scene%2C%20soft%20light?width=800&height=600&nologo=true&seed=524', seasonality: 'All year', description: 'Pure coconut oil' },
      ],
      monsoon: [
        { _id: 'monsoon-1', name: 'Fresh Mushrooms', category: 'vegetables', price: 140, originalPrice: 175, rating: 5, reviews: 67, image: 'https://image.pollinations.ai/prompt/fresh%20organic%20mushrooms%20on%20wooden%20board%2C%20brown%20and%20white%20varieties%2C%20natural%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=532', seasonality: 'Jul - Sep', description: 'Protein-rich mushrooms' },
        { _id: 'monsoon-2', name: 'Organic Brown Rice', category: 'grains', price: 140, originalPrice: 170, rating: 5, reviews: 187, image: 'https://image.pollinations.ai/prompt/organic%20brown%20rice%20grains%20in%20a%20bowl%2C%20earthy%20tones%2C%20natural%20light%2C%20high%20detail?width=800&height=600&nologo=true&seed=525', seasonality: 'All year', description: 'Fiber-rich brown rice' },
        { _id: 'monsoon-3', name: 'Organic Paneer', category: 'dairy', price: 95, originalPrice: 120, rating: 5, reviews: 98, image: 'https://image.pollinations.ai/prompt/fresh%20organic%20paneer%20cubes%20on%20a%20plate%2C%20soft%20texture%2C%20bright%20clean%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=526', seasonality: 'All year', description: 'Fresh high-protein paneer' },
      ],
      winter: [
        { _id: 'winter-1', name: 'Winter Squash', category: 'vegetables', price: 160, originalPrice: 200, rating: 5, reviews: 134, image: 'https://image.pollinations.ai/prompt/organic%20winter%20squash%20on%20wooden%20board%2C%20orange%20and%20green%20varieties%2C%20natural%20lighting%2C%20food%20photography?width=800&height=600&nologo=true&seed=533', seasonality: 'Dec - Feb', description: 'Hearty winter squash' },
        { _id: 'winter-2', name: 'Rolled Oats', category: 'grains', price: 180, originalPrice: 210, rating: 5, reviews: 121, image: 'https://image.pollinations.ai/prompt/organic%20rolled%20oats%20in%20bowl%20with%20spoon%2C%20cozy%20breakfast%20aesthetic%2C%20high%20detail?width=800&height=600&nologo=true&seed=527', seasonality: 'All year', description: 'Wholesome breakfast oats' },
        { _id: 'winter-3', name: 'Raw Almonds', category: 'natural', price: 420, originalPrice: 480, rating: 5, reviews: 256, image: 'https://image.pollinations.ai/prompt/raw%20organic%20almonds%20in%20bowl%2C%20top-down%2C%20clean%20background%2C%20studio%20lighting%2C%20high%20detail?width=800&height=600&nologo=true&seed=528', seasonality: 'All year', description: 'Vitamin E rich almonds' },
      ]
    }
    return productsBySeason[currentSeason] || productsBySeason.summer
  }, [currentSeason])

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥦' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'dairy', name: 'Dairy', icon: '🥛' },
    { id: 'grains', name: 'Grains', icon: '🌾' },
    { id: 'natural', name: 'Natural', icon: '🍯' }
  ]

  const filtered = selectedCategory === 'all' ? seasonalProducts : seasonalProducts.filter(p => p.category === selectedCategory)

  const handleAddToCart = (product) => {
    addItemToCart(product, 1)
  }

  const handleWishlist = (product) => {
    toggleWishlist(product)
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Breadcrumb */}
      <section className="bg-white border-b border-gray-200 py-3">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="flex items-center gap-1 hover:text-green-600">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-green-700 font-medium">Seasonal Collection</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <SeasonalHero />

      {/* Category Filter */}
      <section className="py-10 bg-white w-full">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-heading text-green-800">Browse by Category</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-accent transition ${selectedCategory === c.id ? 'bg-green-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'}`}
              >
                <span>{c.icon}</span>
                <span>{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="season-products" className="py-10 bg-gradient-to-br from-green-50 to-emerald-50 w-full">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {filtered.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard
                  product={{
                    ...product,
                    seasonal: true,
                    season: currentSeason
                  }}
                  onAddToCart={handleAddToCart}
                  onWishlist={handleWishlist}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SeasonalProducts


