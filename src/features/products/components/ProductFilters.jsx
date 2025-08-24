import React from 'react'

const ProductFilters = () => (
  <div className="flex flex-wrap gap-2 items-center">
    <select className="border rounded px-2 py-1">
      <option value="">All Categories</option>
      <option value="vegetables">Vegetables</option>
      <option value="fruits">Fruits</option>
      <option value="dairy">Dairy</option>
      <option value="grains">Grains</option>
      <option value="natural">Natural</option>
    </select>
    <select className="border rounded px-2 py-1">
      <option value="">Sort</option>
      <option value="popular">Popular</option>
      <option value="new">New</option>
      <option value="price_low">Price: Low to High</option>
      <option value="price_high">Price: High to Low</option>
    </select>
  </div>
)

export default ProductFilters


