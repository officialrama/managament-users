import { User } from '@/types/user'

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch('/users.json')
  if (!res.ok) throw new Error('Failed to fetch users')
  const data = (await res.json()) as User[]
  return data
}
