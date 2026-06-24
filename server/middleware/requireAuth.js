import { verifySession } from '../lib/jwt.js'

export function requireAuth(req, res, next) {
  const token = req.cookies?.session
  if (!token) return res.status(401).json({ error: 'unauthorized' })
  try {
    const payload = verifySession(token)
    req.user = { email: payload.email, role: payload.role }
    next()
  } catch {
    res.status(401).json({ error: 'unauthorized' })
  }
}
