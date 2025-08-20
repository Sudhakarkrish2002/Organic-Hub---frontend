import React, { useState } from 'react'
import Input from '@/components/UI/Input'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className="max-w-sm mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input label="New password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input label="Confirm password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <button type="submit" className="btn">Update</button>
      </form>
    </div>
  )
}

export default ResetPassword
