import React from 'react'

const ProductTable = ({ products = [], onSelect }) => (
  <table className="w-full border text-sm">
    <thead className="bg-gray-50">
      <tr>
        <th className="p-2 border">#</th>
        <th className="p-2 border text-left">Name</th>
        <th className="p-2 border">Price</th>
        <th className="p-2 border">Stock</th>
      </tr>
    </thead>
    <tbody>
      {products.map((p, idx) => (
        <tr key={p.id || p._id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onSelect?.(p)}>
          <td className="p-2 border text-center">{idx + 1}</td>
          <td className="p-2 border">{p.name}</td>
          <td className="p-2 border text-center">₹{p.price}</td>
          <td className="p-2 border text-center">{p.stock}</td>
        </tr>
      ))}
      {!products.length && (
        <tr><td className="p-2 border text-center" colSpan={4}>No products</td></tr>
      )}
    </tbody>
  </table>
)

export default ProductTable


