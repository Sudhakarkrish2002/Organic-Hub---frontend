import React from 'react'
import AddProduct from '@/features/admin/components/Products/AddProduct'
import ProductTable from '@/features/admin/components/Products/ProductTable'
import BulkActions from '@/features/admin/components/Products/BulkActions'

const ProductManagement = () => (
  <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
    <h1 className="text-2xl font-semibold">Product Management</h1>
    <AddProduct />
    <BulkActions />
    <ProductTable products={[]} />
  </div>
)

export default ProductManagement


