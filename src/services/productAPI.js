import api from './api'

const productAPI = {
  getAllProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return await api.get(`/products?${queryString}`)
  },
  
  getProduct: async (id) => {
    return await api.get(`/products/${id}`)
  },
  
  searchProducts: async (query, filters = {}) => {
    const params = { search: query, ...filters }
    const queryString = new URLSearchParams(params).toString()
    return await api.get(`/products/search?${queryString}`)
  },
  
  getProductsByCategory: async (category, params = {}) => {
    const queryString = new URLSearchParams({ category, ...params }).toString()
    return await api.get(`/products?${queryString}`)
  },
  
  getFeaturedProducts: async () => {
    return await api.get('/products?featured=true&limit=8')
  },
  
  getRelatedProducts: async (productId, limit = 4) => {
    return await api.get(`/products/${productId}/related?limit=${limit}`)
  }
}

export default productAPI;
