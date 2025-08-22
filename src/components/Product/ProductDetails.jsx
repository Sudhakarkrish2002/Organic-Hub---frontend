import React from 'react'

const ProductDetails = ({ product }) => {
  if (!product) return null
  const getDisplayWeight = (p) => {
    if (p.weight) return p.weight
    const nameLower = (p.name || '').toLowerCase()
    // Exclusions: do not show weight for paneer/panner, butter, yogurt
    if (/(paneer|panner|butter|yogurt)/i.test(nameLower)) {
      return ''
    }
    const isLiquid = Boolean(
      p.isLiquid ||
      p.unit === 'L' ||
      (Array.isArray(p.tags) && p.tags.includes('liquid')) ||
      /(milk|oil|juice|honey|ghee|curd|buttermilk|butter\s?milk|yogurt)/i.test(nameLower)
    )
    return isLiquid ? '1 litre' : '1 kg'
  }
  const displayWeight = getDisplayWeight(product)
  return (
    <div className="space-y-2">
      <div className="text-xl font-semibold">{product.name}</div>
      <div className="text-green-700 font-medium">₹{product.price}</div>
      {displayWeight && (
        <div className="text-sm text-gray-600">Weight: {displayWeight}</div>
      )}
      <p className="text-sm text-gray-700">{product.description}</p>
    </div>
  )
}

export default ProductDetails


