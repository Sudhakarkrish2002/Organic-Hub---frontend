import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setProducts, setLoading, setError } from '@/store/slices/productSlice'

const useProducts = (filters = {}) => {
  const dispatch = useDispatch()
  const { products, currentProduct, loading, error, totalPages } = useSelector((state) => state.products)
  const [localFilters, setLocalFilters] = useState(filters)
  
  useEffect(() => {
    dispatch(setLoading(true))
    // Placeholder: simulate product fetch
    const demo = Array.from({ length: 8 }).map((_, i) => ({
      _id: String(i + 1),
      name: `Product ${i + 1}`,
      price: (i + 1) * 50,
      image: '/vite.svg',
    }))
    dispatch(setProducts(demo))
  }, [dispatch, localFilters])
  
  const loadProducts = (newFilters = {}) => {
    setLocalFilters({ ...localFilters, ...newFilters })
  }
  
  const loadProduct = (productId) => {}
  
  const searchProducts = (query) => {
    setLocalFilters({ ...localFilters, search: query, page: 1 })
  }
  
  const filterByCategory = (category) => {
    setLocalFilters({ ...localFilters, category, page: 1 })
  }
  
  const sortProducts = (sortBy) => {
    setLocalFilters({ ...localFilters, sort: sortBy, page: 1 })
  }
  
  const setPage = (page) => {
    setLocalFilters({ ...localFilters, page })
  }
  
  return {
    products,
    currentProduct,
    loading,
    error,
    totalPages,
    filters: localFilters,
    loadProducts,
    loadProduct,
    searchProducts,
    filterByCategory,
    sortProducts,
    setPage,
  }
}

export default useProducts;

