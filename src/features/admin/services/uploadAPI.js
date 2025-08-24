import api from './api'

const uploadAPI = {
  uploadImage: async (file, folder = 'products') => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('folder', folder)
    
    return await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  
  uploadMultipleImages: async (files, folder = 'products') => {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`images`, file)
    })
    formData.append('folder', folder)
    
    return await api.post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}

export default uploadAPI;