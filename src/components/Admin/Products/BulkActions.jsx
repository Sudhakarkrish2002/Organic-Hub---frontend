import React from 'react'

const BulkActions = ({ onDelete, onDiscount }) => (
  <div className="flex items-center gap-2">
    <button className="btn" onClick={onDiscount}>Apply Discount</button>
    <button className="btn" onClick={onDelete}>Delete Selected</button>
  </div>
)

export default BulkActions


