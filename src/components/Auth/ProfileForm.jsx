import React, { useState } from 'react'
import Input from '@/components/UI/Input'

const ProfileForm = ({ profile = {}, onSubmit }) => {
  const [name, setName] = useState(profile.name || '')
  const [email, setEmail] = useState(profile.email || '')
  const [phone, setPhone] = useState(profile.phone || '')
  const [address, setAddress] = useState(profile.address || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.({ name, email, phone, address })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
      <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Input label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <button type="submit" className="btn">Save</button>
    </form>
  )
}

export default ProfileForm


