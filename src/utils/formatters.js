import { CURRENCY } from './constants'

export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(amount || 0))

export const truncate = (text, max = 100) =>
  String(text || '').length > max ? `${String(text).slice(0, max)}…` : String(text || '')


