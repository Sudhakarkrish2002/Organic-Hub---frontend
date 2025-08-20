import React from 'react'

const OrderDetails = ({ order }) => {
  if (!order) return null
  return (
    <div className="space-y-2">
      <div className="text-sm">Address: {order.address || 'N/A'}</div>
      <div className="text-sm">Payment: {order.paymentMethod || 'N/A'}</div>
      <div className="text-sm">Total: ₹{order.total || 0}</div>
    </div>
  )
}

export default OrderDetails


