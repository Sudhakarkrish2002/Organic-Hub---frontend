import React from 'react'

const OrderCard = ({ order }) => {
  if (!order) return null
  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Order ID</p>
          <p className="font-medium">{order.id || order._id}</p>
        </div>
        <div className="text-sm">{order.status || 'Processing'}</div>
      </div>
      <div className="mt-2 text-sm text-gray-700">{order.items?.length || 0} item(s)</div>
    </div>
  )
}

export default OrderCard


