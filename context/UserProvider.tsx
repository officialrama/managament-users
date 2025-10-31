'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '@/types/user'
import { fetchUsers } from '@/lib/fetchUsers' 

type UserContextType = {
  users: User[]
  loading: boolean
  error?: string
  addUser: (u: Omit<User, 'id'>) => void
  updateUser: (id: User['id'], patch: Partial<User>) => void
  removeUser: (id: User['id']) => void
  reload: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function useUsers() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUsers must be used within UserProvider')
  return ctx
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchUsers()
      .then(data => {
        if (!mounted) return
        // Add avatar url using picsum seed
        const withAvatar = data.map(u => ({ ...u, avatarUrl: `https://picsum.photos/seed/${u.id}/100/100` }))
        setUsers(withAvatar)
      })
      .catch(e => {
        if (!mounted) return
        setError(String(e))
      })
      .finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  const addUser = (u: Omit<User, 'id'>) => {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    const newUser: User = { ...u, id, avatarUrl: `https://picsum.photos/seed/${id}/100/100` }
    setUsers(prev => [newUser, ...prev])
  }

  const updateUser = (id: User['id'], patch: Partial<User>) => {
    setUsers(prev => prev.map(p => (p.id === id ? { ...p, ...patch } : p)))
  }

  const removeUser = (id: User['id']) => {
    setUsers(prev => prev.filter(u => u.id !== id))
  }

  const reload = async () => {
    setLoading(true)
    try {
      const d = await fetchUsers()
      setUsers(d.map(u => ({ ...u, avatarUrl: `https://picsum.photos/seed/${u.id}/100/100` })))
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <UserContext.Provider value={{ users, loading, error, addUser, updateUser, removeUser, reload }}>
      {children}
    </UserContext.Provider>
  )
}
