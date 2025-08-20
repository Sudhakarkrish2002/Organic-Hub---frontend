import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext({ user: null, token: null, login: () => {}, logout: () => {} })

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  const login = ({ user: u, token: t }) => {
    setUser(u || null)
    setToken(t || null)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)

export default AuthContext


