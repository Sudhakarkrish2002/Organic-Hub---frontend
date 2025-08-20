import React from 'react'
import OrderHistory from '@/components/Order/OrderHistory'

const Orders = () => (
  <div className="max-w-3xl mx-auto px-4 py-6">
    <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
    <OrderHistory orders={[]} />
  </div>
)

export default Orders
