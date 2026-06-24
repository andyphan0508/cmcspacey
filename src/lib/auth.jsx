import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const AuthContext = createContext(null)

async function api(path, options = {}) {
  return fetch(`/api${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const res = await api('/me')
      setUser(res.ok ? await res.json() : null)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const login = useCallback(async (email, password) => {
    let res
    try {
      res = await api('/login', { method: 'POST', body: JSON.stringify({ email, password }) })
    } catch {
      return { ok: false, error: 'mail_unreachable' }
    }
    if (res.ok) {
      setUser(await res.json())
      return { ok: true }
    }
    if (res.status === 401) return { ok: false, error: 'invalid_credentials' }
    if (res.status === 503) return { ok: false, error: 'mail_unreachable' }
    return { ok: false, error: 'unknown' }
  }, [])

  const logout = useCallback(async () => {
    try {
      await api('/logout', { method: 'POST' })
    } catch {
      // ignore network errors — still clear local session
    }
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
