import React from 'react'

const QuickStats = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
    {['Revenue', 'Users', 'Low Stock', 'Refunds'].map((s) => (
      <div key={s} className="border rounded-md p-3 text-center">{s}</div>
    ))}
  </div>
)

export default QuickStats


