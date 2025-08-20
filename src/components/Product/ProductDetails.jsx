import React from 'react'

const ProductDetails = ({ product }) => {
  if (!product) return null
  return (
    <div className="space-y-2">
      <div className="text-xl font-semibold">{product.name}</div>
      <div className="text-green-700 font-medium">₹{product.price}</div>
      <p className="text-sm text-gray-700">{product.description}</p>
    </div>
  )
}

export default ProductDetails


