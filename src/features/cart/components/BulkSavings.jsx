import React from 'react'

const BulkSavings = ({ tiers = [] }) => {
  if (!tiers.length) return null
  return (
    <div className="text-sm text-green-700">
      <div className="font-medium mb-1">Bulk Discounts</div>
      <ul className="list-disc ml-5">
        {tiers.map((t) => (
          <li key={t.qty}>Buy {t.qty}+ save {t.discount}%</li>
        ))}
      </ul>
    </div>
  )
}

export default BulkSavings


