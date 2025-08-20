import React, { createContext, useContext } from 'react'
import { toast } from 'react-hot-toast'

const NotificationContext = createContext({ notify: () => {}, error: () => {} })

export const NotificationProvider = ({ children }) => {
  const notify = (message) => toast.success(message || 'Success')
  const error = (message) => toast.error(message || 'Something went wrong')

  return (
    <NotificationContext.Provider value={{ notify, error }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)

export default NotificationContext


