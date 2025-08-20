import React from 'react'

const BulkDiscountInfo = ({ tiers = [] }) => {
  if (!tiers.length) return null
  return (
    <div className="text-xs text-green-700">
      <div className="font-medium">Bulk Pricing</div>
      <ul className="list-disc ml-4">
        {tiers.map((t) => (
          <li key={t.qty}>Buy {t.qty}+ → {t.discount}% off</li>
        ))}
      </ul>
    </div>
  )
}

export default BulkDiscountInfo
