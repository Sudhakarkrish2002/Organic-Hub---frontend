import React from 'react'

const steps = ['Processing', 'Packed', 'Shipped', 'Delivered']

const OrderTracking = ({ status = 'Processing' }) => {
  return (
    <ol className="flex items-center gap-4 text-sm">
      {steps.map((s) => (
        <li key={s} className={s === status ? 'text-green-700 font-medium' : 'text-gray-500'}>
          {s}
        </li>
      ))}
    </ol>
  )
}

export default OrderTracking


