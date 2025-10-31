'use client'
import React, { useState } from 'react'
import type { User } from '@/types/user'
import Button from './ui/Button'

export default function UserForm({ initial, onSubmit, onCancel }: {
  initial?: User
  onSubmit: (payload: Partial<User> & Omit<User, 'id'>) => void
  onCancel: () => void
}) {
  const [name, setName] = useState(initial?.name ?? '')
  const [email, setEmail] = useState(initial?.email ?? '')
  const [phone, setPhone] = useState(initial?.phone ?? '')
  const [company, setCompany] = useState(initial?.company?.name ?? '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const payload: any = { name, email, phone, company: { name: company } }
    if (initial?.id) payload.id = initial.id
    setTimeout(() => {
      onSubmit(payload)
      setLoading(false)
    }, 400)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-black">
      <div>
        <label className="block text-sm">Name</label>
        <input className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm">Email</label>
        <input className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm">Phone</label>
        <input className="w-full border rounded px-3 py-2" value={phone} onChange={e => setPhone(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm">Company</label>
        <input className="w-full border rounded px-3 py-2" value={company} onChange={e => setCompany(e.target.value)} />
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="ghost" onClick={onCancel} type="button">Cancel</Button>
        <Button type="submit">{loading ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  )
}
