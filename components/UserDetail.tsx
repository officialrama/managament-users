'use client'
import React from 'react'
import type { User } from '@/types/user'
import Avatar from './ui/Avatar'

export default function UserDetail({ user }: { user: User }) {
  return (
    <div className="space-y-3 text-black">
      <div className="flex items-center gap-4">
        <Avatar src={user.avatarUrl} name={user.name} size={80} />
        <div>
          <div className="text-xl font-semibold">{user.name}</div>
          <div className="text-sm text-gray-500">{user.company?.name}</div>
        </div>
      </div>
      <div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Phone:</strong> {user.phone}</div>
        <div><strong>Website:</strong> {user.website}</div>
        <div><strong>Address:</strong> {user.address?.street}, {user.address?.city}</div>
      </div>
    </div>
  )
}
