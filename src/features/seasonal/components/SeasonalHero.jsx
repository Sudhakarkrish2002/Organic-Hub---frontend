import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf } from 'lucide-react'
import { getSeasonalTheme } from '@/shared/utils/seasonDetector'
import { seasonalBannerAi } from '@/shared/utils/helpers'
import Button from '@/shared/components/Button'
import { Link } from 'react-router-dom'

const SeasonalHero = () => {
  const { currentSeason } = useSelector((state) => state.seasonal)
  const theme = getSeasonalTheme(currentSeason)
  
  const seasonalContent = {
    spring: {
      title: "Spring Fresh Arrivals",
      subtitle: "New season, fresh beginnings! Discover tender vegetables and crisp fruits.",
      image: seasonalBannerAi.spring,
      imageLocal: '/seasonal/spring-ai.jpg',
      icon: "🌸"
    },
    summer: {
      title: "Summer Hydration Heroes",
      subtitle: "Beat the heat with juicy watermelons, refreshing cucumbers & more!",
      image: seasonalBannerAi.summer,
      imageLocal: '/seasonal/summer-ai.jpg',
      icon: "☀️"
    },
    monsoon: {
      title: "Monsoon Immunity Boosters",
      subtitle: "Stay healthy with vitamin-rich greens and antioxidant-packed fruits.",
      image: seasonalBannerAi.monsoon,
      imageLocal: '/seasonal/monsoon-ai.jpg',
      icon: "🌧️"
    },
    winter: {
      title: "Winter Warmth Collection",
      subtitle: "Hearty root vegetables and citrus fruits to keep you cozy.",
      image: seasonalBannerAi.winter,
      imageLocal: '/seasonal/winter-ai.jpg',
      icon: "❄️"
    }
  }
  
  const content = seasonalContent[currentSeason] || seasonalContent.summer
  
  return (
    <div className={`relative ${theme.background} overflow-hidden w-full`}>
      {/* Background removed for cleaner look */}
      
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <Leaf className="w-9 h-9 text-green-600 mr-3" />
                <span className="text-green-700 font-accent text-lg sm:text-xl">
                  {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)} Collection
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-green-800 mb-6 lg:mb-8 leading-tight">
                {content.title}
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-green-700 mb-8 lg:mb-10 leading-relaxed font-body max-w-2xl mx-auto lg:mx-0">
                {content.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link to="/seasonal#season-products">
                  <Button size="sm" className="group text-sm px-5 py-2.5">
                    Shop {currentSeason} Collection
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </Link>
                
                <Link to="/products">
                  <Button variant="outline" size="sm" className="text-sm px-5 py-2.5">
                    View All Products
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={content.imageLocal}
                  alt={`${currentSeason} products`}
                  className="w-full h-72 sm:h-96 md:h-[480px] lg:h-[560px] object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = content.image
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-white rounded-2xl px-5 py-2.5 shadow-xl">
                  <span className="text-base font-accent text-green-800">
                    Fresh {content.icon}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeasonalHero