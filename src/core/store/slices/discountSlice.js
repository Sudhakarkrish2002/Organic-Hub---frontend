import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tiers: [],
}

const discountSlice = createSlice({
  name: 'discounts',
  initialState,
  reducers: {
    setTiers(state, action) {
      state.tiers = action.payload || []
    },
  },
})

export const { setTiers } = discountSlice.actions
export default discountSlice.reducer


