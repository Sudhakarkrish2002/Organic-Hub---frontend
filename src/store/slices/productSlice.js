import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  loading: false,
  error: null,
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.items = action.payload || []
      state.loading = false
      state.error = null
    },
    setLoading(state, action) {
      state.loading = Boolean(action.payload)
    },
    setError(state, action) {
      state.error = action.payload || 'Error'
      state.loading = false
    },
  },
})

export const { setProducts, setLoading, setError } = productSlice.actions
export default productSlice.reducer


