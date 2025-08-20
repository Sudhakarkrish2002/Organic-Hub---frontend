import React from 'react'

const Overview = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
    {[
      { label: 'Total Sales', value: '₹0' },
      { label: 'Orders', value: '0' },
      { label: 'Products', value: '0' },
    ].map((card) => (
      <div key={card.label} className="border rounded-md p-4">
        <div className="text-sm text-gray-600">{card.label}</div>
        <div className="text-xl font-semibold">{card.value}</div>
      </div>
    ))}
  </div>
)

export default Overview


