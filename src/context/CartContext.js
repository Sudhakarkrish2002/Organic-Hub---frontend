import React, { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext({ items: [], addItem: () => {}, removeItem: () => {}, clear: () => {} })

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])

  const addItem = (item) => setItems((prev) => {
    const existing = prev.find((p) => p.id === item.id)
    if (existing) return prev.map((p) => (p.id === item.id ? { ...p, qty: (p.qty || 1) + (item.qty || 1) } : p))
    return [...prev, { ...item, qty: item.qty || 1 }]
  })

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id))
  const clear = () => setItems([])

  const value = useMemo(() => ({ items, addItem, removeItem, clear }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCartContext = () => useContext(CartContext)

export default CartContext


