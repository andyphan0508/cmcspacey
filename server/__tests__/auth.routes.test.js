import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'

const verifyImapLogin = vi.fn()
vi.mock('../lib/imap.js', () => ({ verifyImapLogin: (...a) => verifyImapLogin(...a) }))

beforeEach(async () => {
  vi.clearAllMocks()
  process.env.JWT_SECRET = 'test-secret'
  process.env.DB_PATH = ':memory:'
})

async function freshApp() {
  vi.resetModules()
  const { createApp } = await import('../app.js')
  return createApp()
}

describe('auth routes', () => {
  it('400 when fields missing', async () => {
    const app = await freshApp()
    const res = await request(app).post('/api/login').send({ email: 'a@b.com' })
    expect(res.status).toBe(400)
  })

  it('logs in on ok, sets cookie, and /me works', async () => {
    verifyImapLogin.mockResolvedValue({ status: 'ok' })
    const app = await freshApp()
    const login = await request(app).post('/api/login').send({ email: 'contact@cmcspacey.com', password: 'pw' })
    expect(login.status).toBe(200)
    expect(login.body.role).toBe('admin')
    const cookie = login.headers['set-cookie']
    expect(cookie).toBeTruthy()

    const me = await request(app).get('/api/me').set('Cookie', cookie)
    expect(me.status).toBe(200)
    expect(me.body.email).toBe('contact@cmcspacey.com')
  })

  it('401 on bad credentials', async () => {
    verifyImapLogin.mockResolvedValue({ status: 'auth' })
    const app = await freshApp()
    const res = await request(app).post('/api/login').send({ email: 'a@b.com', password: 'x' })
    expect(res.status).toBe(401)
  })

  it('503 on connection error', async () => {
    verifyImapLogin.mockResolvedValue({ status: 'connect' })
    const app = await freshApp()
    const res = await request(app).post('/api/login').send({ email: 'a@b.com', password: 'x' })
    expect(res.status).toBe(503)
  })

  it('401 on /me without a cookie', async () => {
    const app = await freshApp()
    const res = await request(app).get('/api/me')
    expect(res.status).toBe(401)
  })
})
