import { Router } from 'express'
import { verifyImapLogin } from '../lib/imap.js'
import { upsertUserOnLogin } from '../db.js'
import { signSession } from '../lib/jwt.js'
import { requireAuth } from '../middleware/requireAuth.js'

const router = Router()

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 8 * 60 * 60 * 1000,
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ error: 'missing_fields' })
  }

  const result = await verifyImapLogin(email, password)
  if (result.status === 'auth') return res.status(401).json({ error: 'invalid_credentials' })
  if (result.status === 'connect') return res.status(503).json({ error: 'mail_unreachable' })
  if (result.status !== 'ok') return res.status(500).json({ error: 'unexpected_status' })

  const user = await upsertUserOnLogin(email)
  const token = signSession(user)
  res.cookie('session', token, COOKIE_OPTS)
  res.json({ email: user.email, display_name: user.display_name, role: user.role })
})

router.post('/logout', (_req, res) => {
  const { maxAge, ...CLEAR_OPTS } = COOKIE_OPTS
  res.clearCookie('session', CLEAR_OPTS)
  res.json({ ok: true })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ email: req.user.email, role: req.user.role })
})

export default router
