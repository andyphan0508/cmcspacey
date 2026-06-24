import { describe, it, expect, beforeEach } from 'vitest'
import { signSession, verifySession } from '../lib/jwt.js'

beforeEach(() => {
  process.env.JWT_SECRET = 'test-secret'
})

describe('jwt helpers', () => {
  it('round-trips email and role', () => {
    const token = signSession({ email: 'a@b.com', role: 'admin' })
    const payload = verifySession(token)
    expect(payload.email).toBe('a@b.com')
    expect(payload.role).toBe('admin')
  })

  it('throws on a tampered token', () => {
    const token = signSession({ email: 'a@b.com', role: 'member' })
    expect(() => verifySession(token + 'x')).toThrow()
  })
})
