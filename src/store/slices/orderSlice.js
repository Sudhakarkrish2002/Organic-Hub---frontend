import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list: [],
  current: null,
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders(state, action) {
      state.list = action.payload || []
    },
    setCurrentOrder(state, action) {
      state.current = action.payload || null
    },
  },
})

export const { setOrders, setCurrentOrder } = orderSlice.actions
export default orderSlice.reducer


