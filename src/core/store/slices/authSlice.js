// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authAPI from '@/features/auth/services/authService'

// Safe localStorage access
const getStoredToken = () => {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem('token')
    } catch (error) {
      console.error('Error accessing localStorage:', error)
      return null
    }
  }
  return null
}

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find(u => u.email === credentials.email && u.password === credentials.password)
      
      if (!user) {
        throw new Error('Invalid credentials')
      }

      // Create a simple token
      const token = btoa(JSON.stringify({ userId: user._id, email: user.email }))
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token)
      }
      
      return {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        },
        token: token
      }
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed')
    }
  }
)

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
      const existingUser = existingUsers.find(user => user.email === userData.email)
      
      if (existingUser) {
        throw new Error('User with this email already exists')
      }

      // Create new user
      const newUser = {
        _id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        createdAt: new Date().toISOString(),
        isActive: true,
        role: 'user'
      }

      // Save to localStorage
      existingUsers.push(newUser)
      localStorage.setItem('users', JSON.stringify(existingUsers))
      
      return { message: 'Account created successfully' }
    } catch (error) {
      return rejectWithValue(error.message || 'Signup failed')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: getStoredToken(),
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token)
        localStorage.setItem('user', JSON.stringify(action.payload.user))
      }
    },
    logout: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
    clearError: (state) => {
      state.error = null
    },
    clearAuth: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
    },
    initializeAuth: (state) => {
      const token = getStoredToken()
      if (token) {
        state.token = token
        // Note: isAuthenticated will be set to true after token verification
        // This should be handled by the AuthContext
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false
        // Don't automatically log in after signup
        // User will be redirected to login page
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { login, logout, clearError, initializeAuth, clearAuth } = authSlice.actions
export default authSlice.reducer