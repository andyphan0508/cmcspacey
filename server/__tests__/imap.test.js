import { describe, it, expect, vi, beforeEach } from 'vitest'

const connect = vi.fn()
const logout = vi.fn()
const on = vi.fn()
const close = vi.fn()

vi.mock('imapflow', () => ({
  ImapFlow: vi.fn().mockImplementation(function () { return { connect, logout, on, close } }),
}))

beforeEach(() => {
  vi.clearAllMocks()
  process.env.IMAP_HOST = 'mail.example.com'
  process.env.IMAP_PORT = '993'
  process.env.IMAP_SECURE = 'true'
})

describe('verifyImapLogin', () => {
  it('returns ok when connect succeeds', async () => {
    connect.mockResolvedValue()
    logout.mockResolvedValue()
    close.mockResolvedValue()
    const { verifyImapLogin } = await import('../lib/imap.js')
    const res = await verifyImapLogin('a@b.com', 'pw')
    expect(res).toEqual({ status: 'ok' })
  })

  it('returns auth when authentication fails', async () => {
    const err = new Error('bad creds')
    err.authenticationFailed = true
    connect.mockRejectedValue(err)
    close.mockResolvedValue()
    const { verifyImapLogin } = await import('../lib/imap.js')
    const res = await verifyImapLogin('a@b.com', 'wrong')
    expect(res).toEqual({ status: 'auth' })
  })

  it('returns connect on a non-auth error', async () => {
    connect.mockRejectedValue(new Error('ETIMEDOUT'))
    close.mockResolvedValue()
    const { verifyImapLogin } = await import('../lib/imap.js')
    const res = await verifyImapLogin('a@b.com', 'pw')
    expect(res).toEqual({ status: 'connect' })
  })
})
