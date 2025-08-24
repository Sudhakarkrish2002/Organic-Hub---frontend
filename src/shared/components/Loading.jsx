import React from 'react'

const Loading = ({ label = 'Loading...' }) => (
  <div className="flex items-center justify-center p-8 text-green-700">
    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
    {label}
  </div>
)

export default Loading


