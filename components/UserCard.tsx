'use client'
import React from 'react'
import { User } from '@/types/user'
import Avatar from './ui/Avatar'
import Button from './ui/Button'

export default function UserCard({ user, onOpen, onEdit, onDelete }: {
  user: User
  onOpen: (u: User) => void
  onEdit: (u: User) => void
  onDelete: (id: User['id']) => void
}) {
  return (
    <div className="bg-white border rounded p-4 flex items-center gap-4">
      <Avatar src={user.avatarUrl} name={user.name} />
      <div className="flex-1">
        <div className="font-semibold text-black">{user.name}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => onOpen(user)} className="text-sm text-blue-600 underline cursor-pointer">View</button>
        <Button variant="ghost" onClick={() => onEdit(user)}>Edit</Button>
        <Button variant="ghost" onClick={() => onDelete(user.id)}>Delete</Button>
      </div>
    </div>
  )
}
