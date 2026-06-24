import jwt from 'jsonwebtoken'

const EXPIRES_IN = '8h'

function secret() {
  const s = process.env.JWT_SECRET
  if (!s) throw new Error('JWT_SECRET is not set')
  return s
}

export function signSession(user) {
  return jwt.sign({ email: user.email, role: user.role }, secret(), { expiresIn: EXPIRES_IN })
}

export function verifySession(token) {
  return jwt.verify(token, secret())
}
