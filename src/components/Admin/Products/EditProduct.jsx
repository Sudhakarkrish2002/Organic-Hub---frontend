import React, { useState } from 'react'
import Input from '@/components/UI/Input'

const EditProduct = ({ product = {}, onSubmit }) => {
  const [form, setForm] = useState({
    name: product.name || '',
    price: product.price || '',
    category: product.category || 'vegetables',
    stock: product.stock || 0,
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.({ ...product, ...form })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
        <Input label="Price (₹)" name="price" type="number" value={form.price} onChange={handleChange} required />
        <label className="flex flex-col gap-1">
          <span className="text-sm text-gray-700">Category</span>
          <select name="category" value={form.category} onChange={handleChange} className="border rounded-md px-3 py-2">
            {['vegetables', 'fruits', 'dairy', 'grains', 'natural'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <Input label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} />
      </div>
      <button type="submit" className="btn">Save Changes</button>
    </form>
  )
}

export default EditProduct


