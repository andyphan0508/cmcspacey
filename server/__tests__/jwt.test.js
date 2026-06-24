import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { signSession, verifySession } from '../lib/jwt.js'

beforeEach(() => {
  process.env.JWT_SECRET = 'test-secret'
})

afterEach(() => {
  delete process.env.JWT_SECRET
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

  it('throws when JWT_SECRET is not set', () => {
    delete process.env.JWT_SECRET
    expect(() => signSession({ email: 'a@b.com', role: 'admin' })).toThrow('JWT_SECRET is not set')
  })
})
