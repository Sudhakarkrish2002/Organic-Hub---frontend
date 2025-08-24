import React, { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, initializeAuth } from '@/store/slices/authSlice'

// Safe localStorage access
const safeLocalStorage = {
  getItem: (key) => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(key)
      } catch (error) {
        console.error('Error accessing localStorage:', error)
        return null
      }
    }
    return null
  },
  setItem: (key, value) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, value)
      } catch (error) {
        console.error('Error setting localStorage:', error)
      }
    }
  },
  removeItem: (key) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(key)
      } catch (error) {
        console.error('Error removing from localStorage:', error)
      }
    }
  }
}

const AuthContext = createContext({ 
  user: null, 
  token: null, 
  isAuthenticated: false,
  isLoading: true,
  login: () => {}, 
  logout: () => {} 
})

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { user, token, isAuthenticated } = useSelector((state) => state.auth)
  const [localToken, setLocalToken] = useState(() => safeLocalStorage.getItem('token'))
  const [localUser, setLocalUser] = useState(() => {
    const savedUser = safeLocalStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuthState = () => {
      const savedToken = safeLocalStorage.getItem('token')
      const savedUser = safeLocalStorage.getItem('user')
      
      if (savedToken && savedUser && !isAuthenticated) {
        try {
          // Restore authentication state from localStorage
          const userData = JSON.parse(savedUser)
          dispatch(login({
            user: userData,
            token: savedToken
          }))
        } catch (error) {
          console.error('Error parsing saved user data:', error)
          // Clear invalid data
          safeLocalStorage.removeItem('token')
          safeLocalStorage.removeItem('user')
          setLocalToken(null)
          setLocalUser(null)
        }
      }
      
      // Mark initialization as complete
      setIsLoading(false)
    }

    // Small delay to ensure Redux state is ready
    const timer = setTimeout(initializeAuthState, 100)
    return () => clearTimeout(timer)
  }, [dispatch, isAuthenticated])

  // Sync local state with Redux state
  useEffect(() => {
    if (token && token !== localToken) {
      setLocalToken(token)
      safeLocalStorage.setItem('token', token)
    } else if (!token && localToken) {
      setLocalToken(null)
      safeLocalStorage.removeItem('token')
    }
  }, [token, localToken])

  useEffect(() => {
    if (user && JSON.stringify(user) !== JSON.stringify(localUser)) {
      setLocalUser(user)
      safeLocalStorage.setItem('user', JSON.stringify(user))
    } else if (!user && localUser) {
      setLocalUser(null)
      safeLocalStorage.removeItem('user')
    }
  }, [user, localUser])

  const loginUser = (authData) => {
    // Save to localStorage immediately
    safeLocalStorage.setItem('token', authData.token)
    safeLocalStorage.setItem('user', JSON.stringify(authData.user))
    
    // Update local state
    setLocalToken(authData.token)
    setLocalUser(authData.user)
    
    // Dispatch to Redux
    dispatch(login(authData))
  }

  const logoutUser = () => {
    // Clear localStorage
    safeLocalStorage.removeItem('token')
    safeLocalStorage.removeItem('user')
    
    // Clear local state
    setLocalToken(null)
    setLocalUser(null)
    
    // Dispatch to Redux
    dispatch(logout())
  }

  // Determine if user is authenticated (either from Redux or localStorage)
  const isUserAuthenticated = isAuthenticated || (localToken && localUser)

  return (
    <AuthContext.Provider value={{ 
      user: user || localUser, 
      token: localToken, 
      isAuthenticated: isUserAuthenticated,
      isLoading,
      login: loginUser, 
      logout: logoutUser 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthContext
