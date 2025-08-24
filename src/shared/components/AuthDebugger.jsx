import React, { useState } from 'react'
import { useAuthContext } from '@/features/auth/context/AuthContext'
import { clearAllAuthData } from '@/features/auth/context/AuthContext'
import { useSelector } from 'react-redux'

const AuthDebugger = () => {
  const [showDebug, setShowDebug] = useState(false)
  const { user, isAuthenticated, loading } = useAuthContext()
  const authState = useSelector(state => state.auth)

  const handleClearAuth = () => {
    clearAllAuthData()
    window.location.reload()
  }

  const checkLocalStorage = () => {
    const authKeys = ['user', 'token', 'refreshToken', 'users', 'organicHubCart', 'wishlist', 'orders']
    const storageData = {}
    
    authKeys.forEach(key => {
      const value = localStorage.getItem(key)
      if (value) {
        try {
          storageData[key] = JSON.parse(value)
        } catch {
          storageData[key] = value
        }
      }
    })
    
    console.log('📦 Current localStorage data:', storageData)
    return storageData
  }

  if (!showDebug) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowDebug(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg"
        >
          🔧 Auth Debug
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">🔧 Authentication Debugger</h2>
          <button
            onClick={() => setShowDebug(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Current Auth State */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Current Auth State:</h3>
            <div className="text-sm space-y-1">
              <p><strong>Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
              <p><strong>Loading:</strong> {loading ? '🔄 Yes' : '✅ No'}</p>
              <p><strong>User:</strong> {user ? user.name : 'None'}</p>
              <p><strong>Email:</strong> {user ? user.email : 'None'}</p>
            </div>
          </div>

          {/* Redux State */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Redux Auth State:</h3>
            <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
              {JSON.stringify(authState, null, 2)}
            </pre>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={checkLocalStorage}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              📦 Check localStorage (see console)
            </button>
            
            <button
              onClick={handleClearAuth}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
            >
              🧹 Clear All Auth Data & Reload
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ul className="text-sm space-y-1">
              <li>• Click "Check localStorage" to see stored data in console</li>
              <li>• Click "Clear All Auth Data" to start fresh</li>
              <li>• This will clear user, cart, wishlist, and all auth data</li>
              <li>• Page will reload automatically after clearing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthDebugger
