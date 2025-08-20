import React, { useState } from 'react'
import Input from '@/components/UI/Input'

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" className="btn">Login</button>
    </form>
  )
}

export default LoginForm


