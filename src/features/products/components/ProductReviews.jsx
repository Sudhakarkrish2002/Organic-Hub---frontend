import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ThumbsUp, MessageCircle, Send, User, Calendar, Edit, Trash2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import Button from '../UI/Button'

const ProductReviews = ({ 
  productId, 
  reviews = [], 
  averageRating = 0, 
  totalReviews = 0,
  onReviewSubmit,
  onReviewEdit,
  onReviewDelete
}) => {
  const { user } = useSelector((state) => state.auth)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [editingReview, setEditingReview] = useState(null)
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: '',
    pros: '',
    cons: ''
  })
  const [sortBy, setSortBy] = useState('recent')
  const [filterRating, setFilterRating] = useState(0)

  const ratingLabels = {
    5: 'Excellent',
    4: 'Very Good',
    3: 'Good',
    2: 'Fair',
    1: 'Poor'
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.comment.trim()) {
      return
    }

    try {
      if (editingReview) {
        await onReviewEdit(editingReview._id, formData)
        setEditingReview(null)
      } else {
        await onReviewSubmit({
          ...formData,
          productId,
          userId: user?.id,
          userName: user?.name
        })
      }
      
      setFormData({
        rating: 5,
        title: '',
        comment: '',
        pros: '',
        cons: ''
      })
      setShowReviewForm(false)
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }

  const handleEdit = (review) => {
    setEditingReview(review)
    setFormData({
      rating: review.rating,
      title: review.title || '',
      comment: review.comment,
      pros: review.pros || '',
      cons: review.cons || ''
    })
    setShowReviewForm(true)
  }

  const handleCancel = () => {
    setShowReviewForm(false)
    setEditingReview(null)
    setFormData({
      rating: 5,
      title: '',
      comment: '',
      pros: '',
      cons: ''
    })
  }

  const filteredAndSortedReviews = reviews
    .filter(review => filterRating === 0 || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt)
        case 'rating':
          return b.rating - a.rating
        case 'helpful':
          return (b.helpfulCount || 0) - (a.helpfulCount || 0)
        default:
          return 0
      }
    })

  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const rating = 5 - i
    const count = reviews.filter(r => r.rating === rating).length
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
    return { rating, count, percentage }
  })

  return (
    <div className="space-y-6">
      {/* Reviews Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Customer Reviews</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-800">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-600">({totalReviews} reviews)</span>
          </div>
        </div>
        
        {user && (
          <Button
            onClick={() => setShowReviewForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Write a Review
          </Button>
        )}
      </div>

      {/* Rating Distribution */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-800 mb-3">Rating Distribution</h4>
        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm text-gray-600">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              </div>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              {editingReview ? 'Edit Review' : 'Write a Review'}
            </h4>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Rating Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleRatingChange(rating)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        formData.rating === rating
                          ? 'bg-yellow-100 border-2 border-yellow-400'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <Star className={`w-6 h-6 ${
                        formData.rating >= rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                      }`} />
                    </button>
                  ))}
                  <span className="ml-3 text-sm text-gray-600">
                    {ratingLabels[formData.rating]}
                  </span>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Summarize your experience"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Comment *
                </label>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder="Share your detailed experience with this product..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What you liked (optional)
                  </label>
                  <input
                    type="text"
                    name="pros"
                    value={formData.pros}
                    onChange={handleInputChange}
                    placeholder="e.g., Fresh, Organic, Good quality"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What could be improved (optional)
                  </label>
                  <input
                    type="text"
                    name="cons"
                    value={formData.cons}
                    onChange={handleInputChange}
                    placeholder="e.g., Price, Delivery time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white flex-1"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {editingReview ? 'Update Review' : 'Submit Review'}
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews Filters and Sorting */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Filter by:</label>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(Number(e.target.value))}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value={0}>All Ratings</option>
            {[5, 4, 3, 2, 1].map(rating => (
              <option key={rating} value={rating}>
                {rating} Star{rating > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="rating">Highest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredAndSortedReviews.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No reviews found. Be the first to review this product!</p>
          </div>
        ) : (
          filteredAndSortedReviews.map((review) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{review.userName}</div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                {user && (user.id === review.userId || user.role === 'admin') && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(review)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onReviewDelete(review._id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{ratingLabels[review.rating]}</span>
              </div>

              {/* Review Title */}
              {review.title && (
                <h5 className="font-medium text-gray-800 mb-2">{review.title}</h5>
              )}

              {/* Review Content */}
              <p className="text-gray-700 mb-3">{review.comment}</p>

              {/* Pros and Cons */}
              {(review.pros || review.cons) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  {review.pros && (
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-sm font-medium text-green-800 mb-1">👍 What you liked:</div>
                      <div className="text-sm text-green-700">{review.pros}</div>
                    </div>
                  )}
                  {review.cons && (
                    <div className="bg-red-50 rounded-lg p-3">
                      <div className="text-sm font-medium text-red-800 mb-1">👎 What could be improved:</div>
                      <div className="text-sm text-red-700">{review.cons}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Review Actions */}
              <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  Helpful ({review.helpfulCount || 0})
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  Reply
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

export default ProductReviews
