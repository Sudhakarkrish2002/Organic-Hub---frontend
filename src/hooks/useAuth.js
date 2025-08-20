import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { loginUser, signupUser, logout } from '@/store/slices/authSlice'
import authAPI from '@/services/authAPI'

const useAuth = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth)
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && !isAuthenticated) {
      // Verify token and set user
      authAPI.verifyToken()
        .then(response => {
          // Handle valid token
        })
        .catch(() => {
          localStorage.removeItem('token')
          dispatch(logout())
        })
    }
  }, [dispatch, isAuthenticated])
  
  const login = async (credentials) => {
    return dispatch(loginUser(credentials))
  }
  
  const signup = async (userData) => {
    return dispatch(signupUser(userData))
  }
  
  const logoutUser = () => {
    dispatch(logout())
  }
  
  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    signup,
    logout: logoutUser,
  }
}

export default useAuth;