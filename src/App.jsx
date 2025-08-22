// src/App.jsx
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { store } from './store'
import AppRoutes from './routes/AppRoutes'
import Header from './components/Layout/Header'
import ScrollToTop from './components/Layout/ScrollToTop'
import Footer from './components/Layout/Footer'
import CartBottomBar from './components/Cart/CartBottomBar'
import CartTopButton from './components/Cart/CartTopButton'
import { NotificationProvider } from '@/context/NotificationContext'
import './styles/globals.css'

function App() {
  return (
    <Provider store={store}>
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
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
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
    </Provider>
  )
}

export default App