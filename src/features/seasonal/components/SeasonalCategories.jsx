import React from 'react'

const SeasonalCategories = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {['Vegetables', 'Fruits', 'Dairy', 'Grains'].map((c) => (
      <div key={c} className="border rounded-md p-3 text-center">{c}</div>
    ))}
  </div>
)

export default SeasonalCategories
