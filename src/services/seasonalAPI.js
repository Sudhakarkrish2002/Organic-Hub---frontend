import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const seasonalAPI = {
  // Get all seasonal products
  getSeasonalProducts: async (params = {}) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/seasonal`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get seasonal product by ID
  getSeasonalProductById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/seasonal/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new seasonal product (Admin only)
  createSeasonalProduct: async (productData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/seasonal`, productData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update seasonal product (Admin only)
  updateSeasonalProduct: async (id, productData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_BASE_URL}/seasonal/${id}`, productData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete seasonal product (Admin only)
  deleteSeasonalProduct: async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_BASE_URL}/seasonal/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get seasonal products by category
  getSeasonalProductsByCategory: async (category) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/seasonal/category/${category}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get current seasonal products
  getCurrentSeasonalProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/seasonal/current`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Search seasonal products
  searchSeasonalProducts: async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/seasonal/search`, {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default seasonalAPI;
