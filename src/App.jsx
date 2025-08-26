// src/App.jsx
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { store } from './core/store'
import AppRoutes from './core/routes/AppRoutes'
import Header from './shared/components/Header'
import ScrollToTop from './shared/components/ScrollToTop'
import Footer from './shared/components/Footer'
import CartBottomBar from './features/cart/components/CartBottomBar'
import CartTopButton from './features/cart/components/CartTopButton'
import Chatbot from './shared/components/Chatbot'
import { NotificationProvider } from './shared/context/NotificationContext'
import { AuthProvider } from './features/auth/context/AuthContext'
import './styles/globals.css'

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NotificationProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <div className="min-h-screen w-full bg-gradient-to-b from-green-50 to-white">
            <Header />
            <ScrollToTop behavior="smooth" />
            <main className="w-full pb-16">
              <AppRoutes />
            </main>
            <Footer />
            <CartTopButton />
            <CartBottomBar />
            <Chatbot />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 2000,
                style: {
                  background: '#ffffff',
                  color: '#166534',
                  border: '1px solid #dcfce7',
                },
                success: {
                  style: {
                    background: '#dcfce7',
                    color: '#166534',
                  },
                },
              }}
            />
          </div>
        </Router>
        </NotificationProvider>
      </AuthProvider>
    </Provider>
  )
}

export default App