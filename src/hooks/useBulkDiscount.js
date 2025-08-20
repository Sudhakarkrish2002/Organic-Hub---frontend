import { useSelector } from 'react-redux'
import { calculateBulkDiscount, getBulkDiscountTiers } from '@/utils/bulkCalculator'

const useBulkDiscount = (product, quantity) => {
  const { bulkDiscounts } = useSelector((state) => state.cart)
  
  const discount = product?.bulkDiscount ? 
    calculateBulkDiscount(product.price, quantity, product.bulkDiscount) : null
  
  const discountTiers = product ? getBulkDiscountTiers(product) : []
  
  const isEligibleForDiscount = product?.bulkDiscount && quantity >= product.bulkDiscount.minQty
  
  const getNextDiscountTier = () => {
    if (!product?.bulkDiscount) return null
    
    const minQty = product.bulkDiscount.minQty
    if (quantity < minQty) {
      return {
        needed: minQty - quantity,
        discount: product.bulkDiscount.discountPercent,
        minQty,
      }
    }
    return null
  }
  
  return {
    discount,
    discountTiers,
    isEligibleForDiscount,
    nextTier: getNextDiscountTier(),
    cartDiscount: bulkDiscounts[product?._id],
  }
}

export default useBulkDiscount;
