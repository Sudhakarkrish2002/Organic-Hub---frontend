import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf } from 'lucide-react'
import { getSeasonalTheme } from '@/utils/seasonDetector'
import { aiImageUrl, seasonalBannerAi } from '@/utils/helpers'
import Button from '../UI/Button'

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
    <div className={`relative ${theme.background} section-padding overflow-hidden w-full`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-4xl sm:text-5xl md:text-6xl animate-pulse">{content.icon}</div>
        <div className="absolute top-32 right-20 text-3xl sm:text-4xl animate-bounce delay-300">{content.icon}</div>
        <div className="absolute bottom-20 left-32 text-4xl sm:text-5xl animate-pulse delay-700">{content.icon}</div>
      </div>
      
      <div className="w-full container-padding relative z-10">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <Leaf className="w-12 h-12 text-green-600 mr-4" />
                <span className="text-green-700 font-accent text-xl sm:text-2xl">
                  {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)} Collection
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display text-green-800 mb-8 lg:mb-10 leading-tight">
                {content.title}
              </h1>
              
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-green-700 mb-10 lg:mb-12 leading-relaxed font-body max-w-2xl mx-auto lg:mx-0">
                {content.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <Button size="lg" className="group text-lg px-12 py-5">
                  Shop {currentSeason} Collection
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
                
                <Button variant="outline" size="lg" className="text-lg px-12 py-5">
                  View All Products
                </Button>
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
                  className="w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = content.image
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute top-8 right-8 bg-white rounded-2xl px-6 py-3 shadow-xl">
                  <span className="text-lg font-accent text-green-800">
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