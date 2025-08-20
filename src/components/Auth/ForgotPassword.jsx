import React, { useState } from 'react'
import Input from '@/components/UI/Input'

const ForgotPassword = ({ onSubmit }) => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.({ email })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit" className="btn">Send reset link</button>
    </form>
  )
}

export default ForgotPassword


