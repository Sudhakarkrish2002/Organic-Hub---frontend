// src/utils/seasonDetector.js

export const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1 // 1-12
    
    if (month >= 3 && month <= 5) return 'spring'
    if (month >= 6 && month <= 8) return 'summer'
    if (month >= 9 && month <= 11) return 'monsoon'
    return 'winter'
  }
  
  export const getSeasonalTheme = (season) => {
    const themes = {
      spring: {
        primary: '#84cc16',
        background: 'bg-gradient-to-br from-lime-50 to-green-50',
        badge: 'badge-spring',
      },
      summer: {
        primary: '#22c55e',
        background: 'bg-gradient-to-br from-green-50 to-emerald-50',
        badge: 'badge-summer',
      },
      monsoon: {
        primary: '#059669',
        background: 'bg-gradient-to-br from-teal-50 to-emerald-50',
        badge: 'badge-monsoon',
      },
      winter: {
        primary: '#065f46',
        background: 'bg-gradient-to-br from-emerald-50 to-green-50',
        badge: 'badge-winter',
      },
    }
    
    return themes[season] || themes.summer
  }
  
  export const getSeasonalProducts = (products, season) => {
    return products.filter(product => 
      product.seasonal && (product.season === season || product.season === 'all-year')
    )
  }