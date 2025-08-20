import React from 'react'

const OrderStatusUpdate = ({ status = 'Processing', onChange }) => (
  <select value={status} onChange={(e) => onChange?.(e.target.value)} className="border rounded px-2 py-1">
    {['Processing', 'Packed', 'Shipped', 'Delivered'].map((s) => (
      <option key={s} value={s}>{s}</option>
    ))}
  </select>
)

export default OrderStatusUpdate


