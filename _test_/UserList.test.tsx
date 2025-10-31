// _test_/UserList.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { UserProvider } from '@/context/UserProvider'
import UserList from '@/components/UserList'
import fs from 'fs'
import path from 'path'

// baca file public/users.json relatif ke root project (process.cwd())
const usersJsonPath = path.resolve(process.cwd(), 'public', 'users.json')

beforeAll(() => {
  // pastikan file ada
  if (!fs.existsSync(usersJsonPath)) {
    throw new Error(`public/users.json not found at ${usersJsonPath}`)
  }
})

beforeEach(() => {
  const raw = fs.readFileSync(usersJsonPath, 'utf-8')
  const users = JSON.parse(raw)

  // mock global.fetch agar UserProvider menerima isi users.json
  ;(global as any).fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => users,
  })
})

afterEach(() => {
  jest.restoreAllMocks()
})

test('renders users page using public/users.json', async () => {
  render(
    <UserProvider>
      <UserList />
    </UserProvider>
  )

  // tunggu heading Users (findByRole menggunakan act internal)
  const heading = await screen.findByRole('heading', { name: /Users/i })
  expect(heading).toBeInTheDocument()

  // ambil first user name dari file untuk memastikan data dipakai
  const raw = fs.readFileSync(usersJsonPath, 'utf-8')
  const users = JSON.parse(raw)
  const firstName = users[0]?.name || ''

  // pastikan nama user dari users.json muncul di DOM
  if (firstName) {
    const userEl = await screen.findByText(new RegExp(firstName, 'i'))
    expect(userEl).toBeInTheDocument()
  }
})
