import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({ behavior = 'instant' }) => {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    const isSmooth = behavior === 'smooth'
    window.scrollTo({ top: 0, left: 0, behavior: isSmooth ? 'smooth' : 'auto' })
  }, [pathname, search, hash, behavior])

  return null
}

export default ScrollToTop


