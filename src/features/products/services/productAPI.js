import api from '@/services/api'

const productAPI = {
  getAllProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return await api.get(`/api/products?${queryString}`)
  },
  
  getProduct: async (id) => {
    return await api.get(`/api/products/${id}`)
  },
  
  searchProducts: async (query, filters = {}) => {
    const params = { search: query, ...filters }
    const queryString = new URLSearchParams(params).toString()
    return await api.get(`/api/products/search?${queryString}`)
  },
  
  getProductsByCategory: async (category, params = {}) => {
    const queryString = new URLSearchParams({ category, ...params }).toString()
    return await api.get(`/api/products?${queryString}`)
  },
  
  getFeaturedProducts: async () => {
    return await api.get('/api/products?featured=true&limit=8')
  },
  
  getRelatedProducts: async (productId, limit = 4) => {
    return await api.get(`/api/products/${productId}/related?limit=${limit}`)
  }
}

export default productAPI;
