import api from './api'

const authAPI = {
  login: async (credentials) => {
    return await api.post('/auth/login', credentials)
  },
  
  signup: async (userData) => {
    return await api.post('/auth/register', userData)
  },
  
  forgotPassword: async (email) => {
    return await api.post('/auth/forgot-password', { email })
  },
  
  resetPassword: async (token, password) => {
    return await api.post('/auth/reset-password', { token, password })
  },
  
  getProfile: async () => {
    return await api.get('/auth/me')
  },
  
  updateProfile: async (userData) => {
    return await api.put('/auth/profile', userData)
  },
  
  verifyToken: async () => {
    return await api.get('/auth/me')
  }
}

export default authAPI;