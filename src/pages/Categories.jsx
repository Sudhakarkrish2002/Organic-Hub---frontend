import React from 'react'

const Categories = () => (
  <div className="max-w-6xl mx-auto px-4 py-6">
    <h1 className="text-2xl font-semibold mb-4">Categories</h1>
    <ul className="list-disc ml-6">
      {['Vegetables', 'Fruits', 'Dairy', 'Grains', 'Natural'].map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  </div>
)

export default Categories
