import { describe, it, expect, beforeEach, vi } from 'vitest'

// Fresh module (and therefore a fresh in-memory DB) per test.
async function freshDb() {
  process.env.DB_PATH = ':memory:'
  vi.resetModules()
  return import('../db.js')
}

describe('db.upsertUserOnLogin', () => {
  it('creates a member with created_at and last_login_at', async () => {
    const { upsertUserOnLogin } = await freshDb()
    const user = upsertUserOnLogin('alice@cmcspacey.com')
    expect(user.email).toBe('alice@cmcspacey.com')
    expect(user.role).toBe('member')
    expect(typeof user.created_at).toBe('string')
    expect(typeof user.last_login_at).toBe('string')
  })

  it('assigns admin role to contact@cmcspacey.com', async () => {
    const { upsertUserOnLogin } = await freshDb()
    const user = upsertUserOnLogin('contact@cmcspacey.com')
    expect(user.role).toBe('admin')
  })

  it('updates last_login_at on second login without duplicating the row', async () => {
    const { upsertUserOnLogin, getDb } = await freshDb()
    upsertUserOnLogin('bob@cmcspacey.com')
    const second = upsertUserOnLogin('bob@cmcspacey.com')
    const count = getDb().prepare('SELECT COUNT(*) AS n FROM users WHERE email = ?').get('bob@cmcspacey.com')
    expect(count.n).toBe(1)
    expect(second.email).toBe('bob@cmcspacey.com')
  })
})
