// src/App.jsx
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { store } from './store'
import AppRoutes from './routes/AppRoutes'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import './styles/globals.css'

function App() {
  return (
    <Provider store={store}>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <div className="min-h-screen w-full bg-gradient-to-b from-green-50 to-white">
          <Header />
          <main className="min-h-screen w-full">
            <AppRoutes />
          </main>
          <Footer />
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
    </Provider>
  )
}

export default App