import React, { useState, useEffect, useRef } from 'react'
import { Search, X, Clock, TrendingUp, History, Filter, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const ProductSearch = ({ 
  onSearch, 
  initialValue = '',
  placeholder = "Search organic products...",
  showFilters = false,
  onFilterToggle
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValue)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchHistory, setSearchHistory] = useLocalStorage('searchHistory', [])
  const [recentSearches, setRecentSearches] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef(null)
  
  // Popular searches with categories
  const popularSearches = [
    { term: 'Tomato', category: 'vegetables', icon: '🍅' },
    { term: 'Carrot', category: 'vegetables', icon: '🥕' },
    { term: 'Apple', category: 'fruits', icon: '🍎' },
    { term: 'Banana', category: 'fruits', icon: '🍌' },
    { term: 'Spinach', category: 'vegetables', icon: '🥬' },
    { term: 'Onion', category: 'vegetables', icon: '🧅' },
    { term: 'Milk', category: 'dairy', icon: '🥛' },
    { term: 'Rice', category: 'grains', icon: '🍚' },
    { term: 'Honey', category: 'natural', icon: '🍯' },
    { term: 'Organic', category: 'all', icon: '🌱' }
  ]

  // Trending searches (could be fetched from API)
  const trendingSearches = [
    { term: 'Seasonal Fruits', category: 'trending', icon: '🔥' },
    { term: 'Fresh Vegetables', category: 'trending', icon: '🔥' },
    { term: 'Organic Dairy', category: 'trending', icon: '🔥' },
    { term: 'Natural Products', category: 'trending', icon: '🔥' }
  ]

  // Search suggestions based on input
  const generateSuggestions = (input) => {
    if (!input.trim()) return []
    
    const inputLower = input.toLowerCase()
    const suggestions = []
    
    // Add category-based suggestions
    const categories = ['vegetables', 'fruits', 'dairy', 'grains', 'natural']
    categories.forEach(category => {
      if (category.includes(inputLower) || inputLower.includes(category)) {
        suggestions.push({
          term: `${category.charAt(0).toUpperCase() + category.slice(1)}`,
          category: 'category',
          icon: '📂',
          type: 'category'
        })
      }
    })
    
    // Add product suggestions
    popularSearches.forEach(item => {
      if (item.term.toLowerCase().includes(inputLower)) {
        suggestions.push({
          ...item,
          type: 'product'
        })
      }
    })
    
    // Add organic-related suggestions
    const organicTerms = ['organic', 'natural', 'fresh', 'healthy', 'pesticide-free']
    organicTerms.forEach(term => {
      if (term.includes(inputLower) || inputLower.includes(term)) {
        suggestions.push({
          term: term.charAt(0).toUpperCase() + term.slice(1),
          category: 'organic',
          icon: '🌱',
          type: 'organic'
        })
      }
    })
    
    return suggestions.slice(0, 8)
  }

  // Handle search input changes
  useEffect(() => {
    if (searchTerm.trim()) {
      const newSuggestions = generateSuggestions(searchTerm)
      setSuggestions(newSuggestions)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchTerm])

  // Debounced search
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm.trim()) {
        setIsLoading(true)
        onSearch(searchTerm)
        setIsLoading(false)
        
        // Add to search history
        if (searchTerm.trim() && !searchHistory.includes(searchTerm.trim())) {
          const newHistory = [searchTerm.trim(), ...searchHistory.slice(0, 9)]
          setSearchHistory(newHistory)
        }
      }
    }, 300)
    
    return () => clearTimeout(delayedSearch)
  }, [searchTerm, onSearch, searchHistory, setSearchHistory])

  // Update recent searches from history
  useEffect(() => {
    setRecentSearches(searchHistory.slice(0, 5))
  }, [searchHistory])

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.term)
    setShowSuggestions(false)
    onSearch(suggestion.term)
    
    // Add to history
    if (!searchHistory.includes(suggestion.term)) {
      const newHistory = [suggestion.term, ...searchHistory.slice(0, 9)]
      setSearchHistory(newHistory)
    }
  }

  // Handle history item click
  const handleHistoryClick = (term) => {
    setSearchTerm(term)
    setShowSuggestions(false)
    onSearch(term)
  }

  // Clear search
  const handleClear = () => {
    setSearchTerm('')
    setShowSuggestions(false)
    onSearch('')
  }

  // Remove from history
  const removeFromHistory = (term, e) => {
    e.stopPropagation()
    const newHistory = searchHistory.filter(item => item !== term)
    setSearchHistory(newHistory)
  }

  // Clear all history
  const clearAllHistory = () => {
    setSearchHistory([])
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative max-w-2xl mx-auto" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full input-organic pl-12 pr-12 text-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        
        {/* Search Icon */}
        <Search className={`absolute left-4 top-4 w-6 h-6 ${
          isLoading ? 'text-green-500 animate-pulse' : 'text-gray-400'
        }`} />
        
        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Filter Toggle Button */}
        {showFilters && (
          <button
            onClick={onFilterToggle}
            className="absolute right-12 top-4 text-gray-400 hover:text-green-600 transition-colors"
          >
            <Filter className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white rounded-xl shadow-2xl mt-2 p-4 z-50 border border-gray-200 max-h-96 overflow-y-auto"
          >
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <History className="w-4 h-4" />
                    Recent Searches
                  </h4>
                  <button
                    onClick={clearAllHistory}
                    className="text-xs text-red-500 hover:text-red-700 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((term, index) => (
                    <div
                      key={index}
                      onClick={() => handleHistoryClick(term)}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{term}</span>
                      </div>
                      <button
                        onClick={(e) => removeFromHistory(term, e)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Suggestions
                </h4>
                <div className="space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <span className="text-lg">{suggestion.icon}</span>
                      <div className="flex-1">
                        <span className="text-gray-700 font-medium">{suggestion.term}</span>
                        <span className="text-xs text-gray-500 ml-2 capitalize">
                          {suggestion.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Trending
              </h4>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(item)}
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 rounded-lg text-sm hover:from-orange-100 hover:to-red-100 transition-all border border-orange-200"
                  >
                    <span>{item.icon}</span>
                    {item.term}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Searches */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Popular Searches</h4>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(item)}
                    className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg text-sm hover:bg-green-100 transition-colors border border-green-200"
                  >
                    <span>{item.icon}</span>
                    {item.term}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Tips */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                💡 Try searching by category, product name, or organic features
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductSearch