import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserFromStorage, updateLastActivity, clearAuth } from '../store/authSlice'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const useAuthContext = useAuth

// Utility function to clear all auth data
export const clearAllAuthData = () => {
  const authKeys = [
    'user', 'token', 'refreshToken', 'userId', 'authToken', 
    'accessToken', 'organicHubCart', 'wishlist', 'orders', 
    'lastActivity', 'sessionData', 'userPreferences', 'authState'
  ]
  
  authKeys.forEach(key => {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
  })
  
  // Clear cookies
  document.cookie.split(";").forEach(function(c) { 
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
  })
  
  console.log('🧹 All authentication data cleared!')
}

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, loading } = useSelector(state => state.auth)
  const [isInitialized, setIsInitialized] = useState(false)

  // Check for stored user data on app load
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')
        const storedRefreshToken = localStorage.getItem('refreshToken')

        if (storedUser && storedToken) {
          dispatch(login({
            user: JSON.parse(storedUser),
            token: storedToken
          }))
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        // Clear corrupted data
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
      } finally {
        setIsInitialized(true)
      }
    }

    initializeAuth()
  }, [dispatch])

  // Auto-logout after inactivity (30 minutes)
  useEffect(() => {
    if (!isAuthenticated) return

    const INACTIVITY_TIMEOUT = 30 * 60 * 1000 // 30 minutes
    let inactivityTimer

    const resetTimer = () => {
      clearTimeout(inactivityTimer)
      inactivityTimer = setTimeout(() => {
        dispatch(clearAuth())
        // Don't auto-redirect, let user choose
        // window.location.href = '/login'
        console.log('Session expired due to inactivity')
      }, INACTIVITY_TIMEOUT)
    }

    const handleActivity = () => {
      dispatch(updateLastActivity())
      resetTimer()
    }

    // Set up activity listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click']
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true)
    })

    // Start the timer
    resetTimer()

    // Cleanup
    return () => {
      clearTimeout(inactivityTimer)
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true)
      })
    }
  }, [isAuthenticated, dispatch])

  // Check token expiration every 5 minutes
  useEffect(() => {
    if (!isAuthenticated) return

    const checkTokenExpiry = () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]))
          const currentTime = Date.now() / 1000
          
          if (payload.exp < currentTime) {
            // Token expired, try to refresh
            // For now, just logout
            dispatch(clearAuth())
            // Don't auto-redirect, let user choose
            // window.location.href = '/login'
            console.log('Token expired')
          }
        } catch (error) {
          console.error('Error checking token expiry:', error)
          dispatch(clearAuth())
          // Don't auto-redirect, let user choose
          // window.location.href = '/login'
          console.log('Token validation error')
        }
      }
    }

    const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000) // Check every 5 minutes
    return () => clearInterval(interval)
  }, [isAuthenticated, dispatch])

  const value = {
    user,
    isAuthenticated,
    loading,
    isInitialized,
    login: (authData) => {
      dispatch(login(authData))
    },
    logout: () => {
      dispatch(clearAuth())
      // Clear all auth data
      clearAllAuthData()
    }
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
