// src/utils/bulkCalculator.js

export const calculateBulkDiscount = (price, quantity, bulkDiscount) => {
    if (!bulkDiscount || quantity < bulkDiscount.minQty) {
      return {
        originalPrice: price * quantity,
        finalPrice: price * quantity,
        discountPercent: 0,
        savings: 0,
      }
    }
    
    const originalPrice = price * quantity
    const discountAmount = (originalPrice * bulkDiscount.discountPercent) / 100
    const finalPrice = originalPrice - discountAmount
    
    return {
      originalPrice,
      finalPrice,
      discountPercent: bulkDiscount.discountPercent,
      savings: discountAmount,
    }
  }
  
  export const getBulkDiscountTiers = (product) => {
    if (!product.bulkDiscount) return []
    
    return [
      {
        minQty: product.bulkDiscount.minQty,
        discount: product.bulkDiscount.discountPercent,
        label: `Buy ${product.bulkDiscount.minQty}+ kg`,
      },
    ]
  }
  
  export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount)
  }