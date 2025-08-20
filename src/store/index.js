// src/store/index.js
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import productSlice from './slices/productSlice'
import cartSlice from './slices/cartSlice'
import orderSlice from './slices/orderSlice'
import seasonalSlice from './slices/seasonalSlice'
import discountSlice from './slices/discountSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
    cart: cartSlice,
    orders: orderSlice,
    seasonal: seasonalSlice,
    discounts: discountSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export default store