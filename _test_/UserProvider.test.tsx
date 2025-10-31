import { render, screen, waitFor } from '@testing-library/react'
import { UserProvider } from '@/context/UserProvider'

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => [{ id: '1', name: 'Rama' }]
  } as any)
})

afterEach(() => {
  jest.restoreAllMocks()
})

test('renders child', async () => {
  render(
    <UserProvider>
      <div>ok</div>
    </UserProvider>
  )

  await waitFor(() => expect(screen.getByText('ok')).toBeInTheDocument())

})
