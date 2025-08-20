import React, { useState } from 'react'
import Input from '@/components/UI/Input'

const SignupForm = ({ onSubmit }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.({ name, email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
      <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" className="btn">Create Account</button>
    </form>
  )
}

export default SignupForm


