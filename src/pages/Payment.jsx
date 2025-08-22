import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react'
import ProductCard from '@/components/Product/ProductCard'
import ProductFilters from '@/components/Product/ProductFilters'
import ProductSearch from '@/components/Product/ProductSearch'
import useProducts from '@/hooks/useProducts'
import useWishlist from '@/hooks/useWishlist'
import Button from '@/components/UI/Button'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const { toggleWishlist } = useWishlist()
  
  const category = searchParams.get('category')
  const search = searchParams.get('search')
  const sort = searchParams.get('sort') || 'newest'
  const page = parseInt(searchParams.get('page')) || 1
  
  const { 
    products, 
    loading, 
    error, 
    totalPages, 
    loadProducts, 
    searchProducts, 
    filterByCategory, 
    sortProducts, 
    setPage 
  } = useProducts({
    category,
    search,
    sort,
    page,
    limit: 12
  })
  
  const handleSearch = (query) => {
    searchProducts(query)
    setSearchParams(prev => {
      if (query) {
        prev.set('search', query)
      } else {
        prev.delete('search')
      }
      prev.set('page', '1')
      return prev
    })
  }
  
  const handleCategoryFilter = (selectedCategory) => {
    filterByCategory(selectedCategory)
    setSearchParams(prev => {
      if (selectedCategory) {
        prev.set('category', selectedCategory)
      } else {
        prev.delete('category')
      }
      prev.set('page', '1')
      return prev
    })
  }
  
  const handleSort = (sortOption) => {
    sortProducts(sortOption)
    setSearchParams(prev => {
      prev.set('sort', sortOption)
      prev.set('page', '1')
      return prev
    })
  }
  
  const handlePageChange = (newPage) => {
    setPage(newPage)
    setSearchParams(prev => {
      prev.set('page', newPage.toString())
      return prev
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleWishlist = (product) => {
    toggleWishlist(product)
  }
  
  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <div className="bg-white border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-800">
              {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : 'All Products'}
            </h1>
            <p className="text-green-600 mt-2">
              Fresh, organic, and healthy products delivered to your door
            </p>
          </div>
          
          {/* Search Bar */}
          <ProductSearch onSearch={handleSearch} initialValue={search} />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <ProductFilters
              onCategoryChange={handleCategoryFilter}
              selectedCategory={category}
              onClose={() => setShowFilters(false)}
            />
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 text-green-600 hover:text-green-700"
                >
                  <Filter className="w-5 h-5" />
                  Filters
                </button>
                
                <span className="text-sm text-gray-600">
                  {products.length} products found
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <select
                  value={sort}
                  onChange={(e) => handleSort(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="rating">Best Rated</option>
                </select>
                
                {/* View Toggle */}
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Products Grid/List */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card-organic p-4 animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="bg-gray-200 h-4 rounded"></div>
                      <div className="bg-gray-200 h-3 rounded w-2/3"></div>
                      <div className="bg-gray-200 h-6 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} viewMode={viewMode} onWishlist={handleWishlist} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  No products found
                </h3>
                <p className="text-green-600 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={() => window.location.reload()}>
                  Reset Filters
                </Button>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    const pageNum = i + 1
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 text-sm border rounded-lg ${
                          pageNum === page
                            ? 'bg-green-600 text-white border-green-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                  
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products;