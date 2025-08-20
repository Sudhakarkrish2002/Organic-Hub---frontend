import React from 'react'

const SeasonalBadge = ({ label = 'Fresh this season!' }) => (
  <span className="inline-flex items-center text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
    🌸 {label}
  </span>
)

export default SeasonalBadge


