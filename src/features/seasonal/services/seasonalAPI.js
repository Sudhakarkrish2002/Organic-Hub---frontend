import api from './api'

const seasonalAPI = {
  getSeasonalProducts: async (season) => {
    return await api.get(`/products/seasonal/${season}`)
  },
  
  getCurrentSeasonProducts: async () => {
    return await api.get('/products/seasonal/current')
  },
  
  getFeaturedSeasonal: async (season) => {
    return await api.get(`/products/seasonal/${season}/featured`)
  }
}

export default seasonalAPI;