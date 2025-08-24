import React from 'react'

/**
 * Modal
 *
 * Props:
 * - isOpen: boolean - visibility control
 * - onClose: () => void - close callback
 * - title?: string - optional header title
 * - children: ReactNode - modal content
 * - footer?: ReactNode - optional footer actions
 */

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="text-gray-500">✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal


