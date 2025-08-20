import React from 'react'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const { id } = useParams()
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Product Detail</h1>
      <p>Product ID: {id}</p>
    </div>
  )
}

export default ProductDetail


