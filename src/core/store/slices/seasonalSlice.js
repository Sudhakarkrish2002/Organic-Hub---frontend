// src/store/slices/seasonalSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import seasonalAPI from '@/services/seasonalAPI'

export const fetchSeasonalProducts = createAsyncThunk(
  'seasonal/fetchProducts',
  async (season, { rejectWithValue }) => {
    try {
      const response = await seasonalAPI.getSeasonalProducts(season)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

const seasonalSlice = createSlice({
  name: 'seasonal',
  initialState: {
    currentSeason: 'summer', // Default
    seasonalProducts: [],
    featuredSeasonal: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentSeason: (state, action) => {
      state.currentSeason = action.payload
    },
    clearSeasonalError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeasonalProducts.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSeasonalProducts.fulfilled, (state, action) => {
        state.loading = false
        state.seasonalProducts = action.payload.products
        state.featuredSeasonal = action.payload.featured
      })
      .addCase(fetchSeasonalProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setCurrentSeason, clearSeasonalError } = seasonalSlice.actions
export default seasonalSlice.reducer