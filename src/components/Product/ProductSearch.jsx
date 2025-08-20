import React, { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { motion } from 'framer-motion'

const ProductSearch = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue)
  const [suggestions, setSuggestions] = useState([])
  
  const popularSearches = [
    'Tomato', 'Carrot', 'Apple', 'Banana', 'Spinach', 'Onion', 'Milk', 'Rice'
  ]
  
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch(searchTerm)
    }, 300)
    
    return () => clearTimeout(delayedSearch)
  }, [searchTerm, onSearch])
  
  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }
  
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search organic products..."
          className="w-full input-organic pl-12 pr-12 text-lg"
        />
        <Search className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>
      
      {!searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg mt-2 p-4 z-10"
        >
          <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setSearchTerm(term)}
                className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ProductSearch;