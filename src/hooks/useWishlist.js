import { useCallback } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'

const WISHLIST_KEY = 'wishlist'

const useWishlist = () => {
  const [wishlistItems, setWishlistItems, clearWishlist] = useLocalStorage(WISHLIST_KEY, [])

  const isInWishlist = useCallback(
    (productId) => wishlistItems?.some((item) => String(item._id) === String(productId)),
    [wishlistItems]
  )

  const addToWishlist = useCallback(
    (product) => {
      setWishlistItems((prev) => {
        const exists = prev?.some((p) => String(p._id) === String(product._id))
        if (exists) return prev
        return [...(prev || []), product]
      })
    },
    [setWishlistItems]
  )

  const removeFromWishlist = useCallback(
    (productId) => {
      setWishlistItems((prev) => (prev || []).filter((p) => String(p._id) !== String(productId)))
    },
    [setWishlistItems]
  )

  const toggleWishlist = useCallback(
    (product) => {
      setWishlistItems((prev) => {
        const exists = (prev || []).some((p) => String(p._id) === String(product._id))
        if (exists) {
          return (prev || []).filter((p) => String(p._id) !== String(product._id))
        }
        return [...(prev || []), product]
      })
    },
    [setWishlistItems]
  )

  return {
    wishlistItems: wishlistItems || [],
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
  }
}

export default useWishlist


