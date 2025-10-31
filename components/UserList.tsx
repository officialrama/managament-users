'use client'
import React, { useState } from 'react'
import { useUsers } from '@/context/UserProvider'
import UserCard from './UserCard'
import Modal from './ui/Modal'
import UserDetail from './UserDetail'
import UserForm from './UserForm'
import Button from './ui/Button'
import type { User } from '@/types/user'

export default function UserList() {
  const { users, loading, error, addUser, updateUser, removeUser } = useUsers()
  const [openDetail, setOpenDetail] = useState(false)
  const [selected, setSelected] = useState<User | null>(null)
  const [editing, setEditing] = useState<User | null>(null)
  const [openForm, setOpenForm] = useState(false)

  const onOpen = (u: User) => { setSelected(u); setOpenDetail(true) }
  const onCloseDetail = () => setOpenDetail(false)

  const onEdit = (u: User) => { setEditing(u); setOpenForm(true) }
  const onAdd = () => { setEditing(null); setOpenForm(true) }

  const onSubmit = (payload: Omit<User, 'id'> & Partial<Pick<User, 'id'>>) => {
    if ((payload as any).id) {
      updateUser((payload as any).id, payload)
    } else {
      addUser(payload)
    }
    setOpenForm(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button onClick={onAdd}>Add User</Button>
      </div>

      {loading && <div>Loading users...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {!loading && users.length === 0 && <div>No users yet</div>}

      <div className="grid gap-3">
        {users.map(u => (
          <UserCard key={u.id} user={u} onOpen={onOpen} onEdit={onEdit} onDelete={removeUser} />
        ))}
      </div>

      <Modal open={openDetail} onClose={onCloseDetail} title={"Profile"}>
        {selected && <UserDetail user={selected} />}
      </Modal>

      <Modal open={openForm} onClose={() => setOpenForm(false)} title={editing ? 'Edit user' : 'Add user'}>
        <UserForm initial={editing ?? undefined} onSubmit={onSubmit} onCancel={() => setOpenForm(false)} />
      </Modal>
    </div>
  )
}
