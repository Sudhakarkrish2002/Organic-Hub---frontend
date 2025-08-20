import React from 'react'
import OrderCard from './OrderCard'

const OrderHistory = ({ orders = [] }) => {
  if (!orders.length) return <p className="text-sm text-gray-600">No orders yet.</p>
  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <OrderCard key={o.id || o._id} order={o} />
      ))}
    </div>
  )
}

export default OrderHistory


