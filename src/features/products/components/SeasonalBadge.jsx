import React from 'react'

const SeasonalBadge = ({ season = 'seasonal', label }) => {
  const seasonConfig = {
    spring: { emoji: '🌸', text: 'Spring Fresh', color: 'bg-pink-100 text-pink-700 border-pink-200' },
    summer: { emoji: '☀️', text: 'Summer Harvest', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    autumn: { emoji: '🍂', text: 'Autumn Bounty', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    fall: { emoji: '🍂', text: 'Fall Harvest', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    winter: { emoji: '❄️', text: 'Winter Fresh', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    monsoon: { emoji: '🌧️', text: 'Monsoon Fresh', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
    seasonal: { emoji: '🌱', text: 'Seasonal', color: 'bg-green-100 text-green-700 border-green-200' }
  }
  
  const config = seasonConfig[season] || seasonConfig.seasonal
  const displayText = label || config.text
  
  return (
    <span className={`inline-flex items-center text-xs px-2 py-1 rounded-full border ${config.color}`}>
      {config.emoji} {displayText}
    </span>
  )
}

export default SeasonalBadge


