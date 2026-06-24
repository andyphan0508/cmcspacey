# Auth + Dashboard Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add multi-user login (validated against the PA Vietnam IMAP server) and a protected dashboard shell to the existing Vite landing site, with a Node/Express + SQLite backend.

**Architecture:** Monorepo with one `package.json`. The existing Vite SPA keeps the landing page at `/` and gains `react-router` routes `/login` and `/app/*`. A new Express backend under `server/` exposes `/api/login`, `/api/logout`, `/api/me`. Login is verified by attempting an IMAP connection; on success the backend issues a JWT stored in an httpOnly cookie. SQLite (better-sqlite3) stores a minimal `users` table. The mail password is used only to verify IMAP and is never persisted.

**Tech Stack:** Node + Express (ESM), better-sqlite3, imapflow, jsonwebtoken, cookie-parser, dotenv; React 18 + react-router-dom; Vitest + supertest for backend tests; Tailwind + i18next (existing).

## Global Constraints

- Project is ESM (`"type": "module"` in package.json) — all backend files use `import`/`export`.
- Do NOT break the existing landing page; it must keep rendering at route `/`.
- Do NOT persist the mail password to the database or logs — use it only to verify IMAP, then discard.
- All user-facing strings go through i18next in `vi`/`en`/`zh`; default language is `vi`.
- SQLite timestamps stored as ISO-8601 text (`new Date().toISOString()`) for Postgres compatibility later.
- JWT secret read from `process.env.JWT_SECRET`; never hardcoded.
- Mail server (PA Vietnam, SSL): IMAP `mail90168.maychuemail.com:993` secure; SMTP `mail90168.maychuemail.com:465` secure (SMTP unused in this plan, only seeded into `.env.example`).
- Admin email: `contact@cmcspacey.com` → `role='admin'`; all others → `role='member'`.
- JWT session lifetime: 8 hours.

---

## File Structure

**Backend (new, under `server/`):**
- `server/app.js` — builds the Express app (exported `createApp()` for tests).
- `server/index.js` — loads env, calls `createApp()`, listens on `PORT`.
- `server/db.js` — SQLite init, migration, `upsertUserOnLogin(email)`.
- `server/lib/jwt.js` — `signSession(user)`, `verifySession(token)`.
- `server/lib/imap.js` — `verifyImapLogin(email, password)` → `{ status: 'ok'|'auth'|'connect' }`.
- `server/middleware/requireAuth.js` — cookie→JWT guard, sets `req.user`.
- `server/routes/auth.js` — `/login`, `/logout`, `/me`.
- `server/scripts/test-imap.js` — manual smoke test against real IMAP.
- `server/.env.example` — config template.

**Backend tests (new, under `server/__tests__/`):**
- `server/__tests__/jwt.test.js`
- `server/__tests__/db.test.js`
- `server/__tests__/imap.test.js`
- `server/__tests__/auth.routes.test.js`

**Frontend (new/modified, under `src/`):**
- `src/main.jsx` — MODIFY: mount router + AuthProvider instead of `<App/>` directly.
- `src/router.jsx` — new route table.
- `src/lib/auth.jsx` — AuthContext + `useAuth()` + API calls.
- `src/components/ProtectedRoute.jsx` — redirect when unauthenticated.
- `src/pages/Login.jsx` — login form.
- `src/pages/dashboard/Shell.jsx` — sidebar + header layout.
- `src/pages/dashboard/Home.jsx`, `Mail.jsx`, `HR.jsx` — content pages/placeholders.
- `src/locales/vi.js`, `en.js`, `zh.js` — MODIFY: add `auth` + `dash` keys.
- `vite.config.js` — MODIFY: add `/api` dev proxy.
- `.gitignore` — MODIFY: ignore SQLite DB file.

---

## Task 1: Backend scaffolding + tooling

**Files:**
- Modify: `package.json` (deps + scripts)
- Modify: `vite.config.js`
- Modify: `.gitignore`
- Create: `server/app.js`, `server/index.js`, `server/.env.example`
- Test: `server/__tests__/app.test.js`

**Interfaces:**
- Produces: `createApp()` from `server/app.js` — returns a configured Express `app` with JSON body parsing, cookie parsing, and a `GET /api/health` route returning `{ ok: true }`. Routes mounted under `/api` will be added in later tasks.

- [ ] **Step 1: Install dependencies**

Run:
```bash
npm install express cookie-parser jsonwebtoken better-sqlite3 imapflow dotenv
npm install -D vitest supertest concurrently
```

- [ ] **Step 2: Add scripts to package.json**

In `package.json`, replace the `"scripts"` block with:
```json
  "scripts": {
    "dev": "vite",
    "dev:server": "node --watch server/index.js",
    "dev:all": "concurrently -n web,api -c blue,green \"npm:dev\" \"npm:dev:server\"",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "predeploy": "npm run build",
    "deploy": "npm run build && gh-pages -d dist -b gh-pages"
  },
```

- [ ] **Step 3: Add `/api` proxy to vite.config.js**

Replace `vite.config.js` contents with:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
```

- [ ] **Step 4: Ignore the SQLite DB file**

Append to `.gitignore`:
```
# SQLite local database
server/*.sqlite
server/*.sqlite-journal
```

- [ ] **Step 5: Create `server/.env.example`**

```
# Mail server PA Vietnam (recommended SSL settings)
IMAP_HOST=mail90168.maychuemail.com
IMAP_PORT=993
IMAP_SECURE=true

# Used by the webmail spec later (kept here for reference)
SMTP_HOST=mail90168.maychuemail.com
SMTP_PORT=465
SMTP_SECURE=true

# Backend
PORT=3001
JWT_SECRET=change-me-to-a-long-random-string
DB_PATH=./server/data.sqlite
NODE_ENV=development
```

- [ ] **Step 6: Write the failing test**

Create `server/__tests__/app.test.js`:
```js
import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { createApp } from '../app.js'

describe('app', () => {
  it('responds to GET /api/health', async () => {
    const app = createApp()
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ ok: true })
  })
})
```

- [ ] **Step 7: Run test to verify it fails**

Run: `npm test -- app.test`
Expected: FAIL — cannot resolve `../app.js`.

- [ ] **Step 8: Create `server/app.js`**

```js
import express from 'express'
import cookieParser from 'cookie-parser'

export function createApp() {
  const app = express()
  app.use(express.json())
  app.use(cookieParser())

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true })
  })

  return app
}
```

- [ ] **Step 9: Create `server/index.js`**

```js
import 'dotenv/config'
import { createApp } from './app.js'

const port = process.env.PORT || 3001
const app = createApp()

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`)
})
```

- [ ] **Step 10: Run test to verify it passes**

Run: `npm test -- app.test`
Expected: PASS.

- [ ] **Step 11: Commit**

```bash
git add package.json package-lock.json vite.config.js .gitignore server/
git commit -m "feat(server): scaffold express backend with health route"
```

---

## Task 2: SQLite users table + upsert-on-login

**Files:**
- Create: `server/db.js`
- Test: `server/__tests__/db.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `getDb()` → a memoized better-sqlite3 `Database` (path from `process.env.DB_PATH`, runs migration on first call).
  - `upsertUserOnLogin(email)` → inserts the user if new (setting `role` from the admin rule and `created_at`), always updates `last_login_at`, and returns the row `{ id, email, display_name, role, last_login_at, created_at }`.

- [ ] **Step 1: Write the failing test**

Create `server/__tests__/db.test.js`:
```js
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
```

> Note: `vi.resetModules()` + dynamic `import()` gives each test a fresh module instance, so the memoized in-memory DB does not leak between tests.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- db.test`
Expected: FAIL — cannot resolve `../db.js`.

- [ ] **Step 3: Create `server/db.js`**

```js
import Database from 'better-sqlite3'

const ADMIN_EMAIL = 'contact@cmcspacey.com'
let db

export function getDb() {
  if (!db) {
    db = new Database(process.env.DB_PATH || './server/data.sqlite')
    db.pragma('journal_mode = WAL')
    migrate(db)
  }
  return db
}

function migrate(database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      email         TEXT UNIQUE NOT NULL,
      display_name  TEXT,
      role          TEXT NOT NULL DEFAULT 'member',
      last_login_at TEXT,
      created_at    TEXT NOT NULL
    );
  `)
}

export function upsertUserOnLogin(email) {
  const now = new Date().toISOString()
  const database = getDb()
  const existing = database.prepare('SELECT * FROM users WHERE email = ?').get(email)

  if (existing) {
    database.prepare('UPDATE users SET last_login_at = ? WHERE email = ?').run(now, email)
    return database.prepare('SELECT * FROM users WHERE email = ?').get(email)
  }

  const role = email === ADMIN_EMAIL ? 'admin' : 'member'
  database
    .prepare('INSERT INTO users (email, role, last_login_at, created_at) VALUES (?, ?, ?, ?)')
    .run(email, role, now, now)
  return database.prepare('SELECT * FROM users WHERE email = ?').get(email)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- db.test`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add server/db.js server/__tests__/db.test.js
git commit -m "feat(server): add users table and upsertUserOnLogin"
```

---

## Task 3: JWT session helpers

**Files:**
- Create: `server/lib/jwt.js`
- Test: `server/__tests__/jwt.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `signSession(user)` → JWT string. Payload `{ email, role }`, `expiresIn: '8h'`, signed with `process.env.JWT_SECRET`.
  - `verifySession(token)` → decoded payload `{ email, role, iat, exp }`; throws if invalid/expired.

- [ ] **Step 1: Write the failing test**

Create `server/__tests__/jwt.test.js`:
```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- jwt.test`
Expected: FAIL — cannot resolve `../lib/jwt.js`.

- [ ] **Step 3: Create `server/lib/jwt.js`**

```js
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- jwt.test`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add server/lib/jwt.js server/__tests__/jwt.test.js
git commit -m "feat(server): add JWT session sign/verify helpers"
```

---

## Task 4: IMAP login verification

**Files:**
- Create: `server/lib/imap.js`
- Test: `server/__tests__/imap.test.js`

**Interfaces:**
- Consumes: env `IMAP_HOST`, `IMAP_PORT`, `IMAP_SECURE`.
- Produces: `verifyImapLogin(email, password)` → resolves to `{ status: 'ok' | 'auth' | 'connect' }`. `'ok'` = connected & authenticated; `'auth'` = authentication rejected; `'connect'` = could not reach/handshake the server.

- [ ] **Step 1: Write the failing test**

Create `server/__tests__/imap.test.js`:
```js
import { describe, it, expect, vi, beforeEach } from 'vitest'

const connect = vi.fn()
const logout = vi.fn()

vi.mock('imapflow', () => ({
  ImapFlow: vi.fn().mockImplementation(() => ({ connect, logout })),
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
    const { verifyImapLogin } = await import('../lib/imap.js')
    const res = await verifyImapLogin('a@b.com', 'pw')
    expect(res).toEqual({ status: 'ok' })
  })

  it('returns auth when authentication fails', async () => {
    const err = new Error('bad creds')
    err.authenticationFailed = true
    connect.mockRejectedValue(err)
    const { verifyImapLogin } = await import('../lib/imap.js')
    const res = await verifyImapLogin('a@b.com', 'wrong')
    expect(res).toEqual({ status: 'auth' })
  })

  it('returns connect on a non-auth error', async () => {
    connect.mockRejectedValue(new Error('ETIMEDOUT'))
    const { verifyImapLogin } = await import('../lib/imap.js')
    const res = await verifyImapLogin('a@b.com', 'pw')
    expect(res).toEqual({ status: 'connect' })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- imap.test`
Expected: FAIL — cannot resolve `../lib/imap.js`.

- [ ] **Step 3: Create `server/lib/imap.js`**

```js
import { ImapFlow } from 'imapflow'

export async function verifyImapLogin(email, password) {
  const client = new ImapFlow({
    host: process.env.IMAP_HOST,
    port: Number(process.env.IMAP_PORT || 993),
    secure: process.env.IMAP_SECURE !== 'false',
    auth: { user: email, pass: password },
    logger: false,
    socketTimeout: 10000,
    greetingTimeout: 10000,
    connectionTimeout: 10000,
  })

  try {
    await client.connect()
    await client.logout()
    return { status: 'ok' }
  } catch (err) {
    if (err && err.authenticationFailed) return { status: 'auth' }
    return { status: 'connect' }
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- imap.test`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add server/lib/imap.js server/__tests__/imap.test.js
git commit -m "feat(server): add IMAP login verification"
```

---

## Task 5: Auth routes + requireAuth middleware

**Files:**
- Create: `server/middleware/requireAuth.js`
- Create: `server/routes/auth.js`
- Modify: `server/app.js` (mount the router)
- Test: `server/__tests__/auth.routes.test.js`

**Interfaces:**
- Consumes: `verifyImapLogin` (Task 4), `upsertUserOnLogin` (Task 2), `signSession`/`verifySession` (Task 3).
- Produces:
  - `requireAuth(req, res, next)` — reads `req.cookies.session`, verifies it, sets `req.user = { email, role }`; else `401 { error: 'unauthorized' }`.
  - Express router with: `POST /login` `{ email, password }` → 200 `{ email, display_name, role }` + sets httpOnly `session` cookie; `400` missing fields; `401` bad creds; `503` connect error. `POST /logout` → 200 `{ ok: true }`, clears cookie. `GET /me` (guarded) → 200 `{ email, role }`.

- [ ] **Step 1: Write the failing test**

Create `server/__tests__/auth.routes.test.js`:
```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- auth.routes`
Expected: FAIL — cannot resolve `../routes/auth.js` (mounted in app).

- [ ] **Step 3: Create `server/middleware/requireAuth.js`**

```js
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
```

- [ ] **Step 4: Create `server/routes/auth.js`**

```js
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

  const user = upsertUserOnLogin(email)
  const token = signSession(user)
  res.cookie('session', token, COOKIE_OPTS)
  res.json({ email: user.email, display_name: user.display_name, role: user.role })
})

router.post('/logout', (_req, res) => {
  res.clearCookie('session')
  res.json({ ok: true })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ email: req.user.email, role: req.user.role })
})

export default router
```

- [ ] **Step 5: Mount the router in `server/app.js`**

Replace `server/app.js` contents with:
```js
import express from 'express'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.js'

export function createApp() {
  const app = express()
  app.use(express.json())
  app.use(cookieParser())

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true })
  })

  app.use('/api', authRouter)

  return app
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test -- auth.routes`
Expected: PASS (5 tests).

- [ ] **Step 7: Run the full backend suite**

Run: `npm test`
Expected: all tests pass (app, db, jwt, imap, auth.routes).

- [ ] **Step 8: Commit**

```bash
git add server/middleware/requireAuth.js server/routes/auth.js server/app.js server/__tests__/auth.routes.test.js
git commit -m "feat(server): add login/logout/me routes with auth guard"
```

---

## Task 6: IMAP smoke-test script (manual)

**Files:**
- Create: `server/scripts/test-imap.js`

**Interfaces:**
- Consumes: `verifyImapLogin` (Task 4), env from `server/.env`.

- [ ] **Step 1: Create the script**

```js
import 'dotenv/config'
import { verifyImapLogin } from '../lib/imap.js'

const [, , email, password] = process.argv
if (!email || !password) {
  console.error('Usage: node server/scripts/test-imap.js <email> <password>')
  process.exit(1)
}

const result = await verifyImapLogin(email, password)
console.log('IMAP host:', process.env.IMAP_HOST, 'port:', process.env.IMAP_PORT)
console.log('Result:', result)
process.exit(result.status === 'ok' ? 0 : 1)
```

- [ ] **Step 2: Verify against the real server (requires real credentials + `server/.env`)**

```bash
cp server/.env.example server/.env   # then edit JWT_SECRET; IMAP host/port already filled
node server/scripts/test-imap.js <real-email> <real-password>
```
Expected: `Result: { status: 'ok' }` for valid credentials; `{ status: 'auth' }` for a wrong password. If this fails with `connect`, re-check IMAP host/port with the user before proceeding.

- [ ] **Step 3: Commit**

```bash
git add server/scripts/test-imap.js
git commit -m "chore(server): add manual IMAP smoke-test script"
```

---

## Task 7: Frontend auth context + router wiring

**Files:**
- Create: `src/lib/auth.jsx`
- Create: `src/components/ProtectedRoute.jsx`
- Create: `src/router.jsx`
- Modify: `src/main.jsx`

**Interfaces:**
- Consumes: backend `/api/login`, `/api/logout`, `/api/me`.
- Produces:
  - `AuthProvider` + `useAuth()` exposing `{ user, loading, login(email, password), logout() }`. `login` returns `{ ok: true }` or `{ ok: false, error: 'invalid_credentials' | 'mail_unreachable' | 'unknown' }`.
  - `ProtectedRoute` component rendering `<Outlet/>` when authed, redirecting to `/login` otherwise.
  - `router` (createBrowserRouter) wiring `/`, `/login`, `/app` (+ children `index`, `mail`, `hr`). The dashboard pages (`Shell`, `Home`, `Mail`, `HR`) and `Login` are built in Tasks 8–9; import them here so this task and the next compile together.

> This task has no unit test runner for React; verification is the production build plus the manual preview steps in Task 9.

- [ ] **Step 1: Create `src/lib/auth.jsx`**

```jsx
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
    await api('/logout', { method: 'POST' })
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
```

- [ ] **Step 2: Create `src/components/ProtectedRoute.jsx`**

```jsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()
  if (loading) {
    return <div className="flex h-screen items-center justify-center text-gray-500">…</div>
  }
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}
```

- [ ] **Step 3: Create `src/router.jsx`**

```jsx
import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Shell from './pages/dashboard/Shell.jsx'
import Home from './pages/dashboard/Home.jsx'
import Mail from './pages/dashboard/Mail.jsx'
import HR from './pages/dashboard/HR.jsx'

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  {
    path: '/app',
    element: <ProtectedRoute />,
    children: [
      {
        element: <Shell />,
        children: [
          { index: true, element: <Home /> },
          { path: 'mail', element: <Mail /> },
          { path: 'hr', element: <HR /> },
        ],
      },
    ],
  },
])
```

- [ ] **Step 4: Update `src/main.jsx`**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import './i18n'
import { AuthProvider } from './lib/auth.jsx'
import { router } from './router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
```

- [ ] **Step 5: Commit** (build verified at the end of Task 9, after the imported pages exist)

```bash
git add src/lib/auth.jsx src/components/ProtectedRoute.jsx src/router.jsx src/main.jsx
git commit -m "feat(web): add auth context, protected route, and router"
```

---

## Task 8: Login page

**Files:**
- Create: `src/pages/Login.jsx`

**Interfaces:**
- Consumes: `useAuth()` (Task 7), i18n keys `auth.*` (Task 10).
- Produces: `Login` default export — a centered form (email + password) that calls `login`, shows a translated error on failure, and navigates to `/app` on success.

- [ ] **Step 1: Create `src/pages/Login.jsx`**

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../lib/auth.jsx'

export default function Login() {
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    const res = await login(email, password)
    setBusy(false)
    if (res.ok) {
      navigate('/app')
    } else {
      setError(t(`auth.errors.${res.error}`))
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8 shadow">
        <h1 className="text-xl font-semibold text-gray-900">{t('auth.title')}</h1>
        {error && <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <div className="space-y-1">
          <label className="text-sm text-gray-700">{t('auth.email')}</label>
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-gray-700">{t('auth.password')}</label>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {busy ? t('auth.signingIn') : t('auth.signIn')}
        </button>
      </form>
    </div>
  )
}
```

- [ ] **Step 2: Commit** (build verified at end of Task 9)

```bash
git add src/pages/Login.jsx
git commit -m "feat(web): add login page"
```

---

## Task 9: Dashboard shell + placeholder pages

**Files:**
- Create: `src/pages/dashboard/Shell.jsx`
- Create: `src/pages/dashboard/Home.jsx`
- Create: `src/pages/dashboard/Mail.jsx`
- Create: `src/pages/dashboard/HR.jsx`

**Interfaces:**
- Consumes: `useAuth()` (Task 7), i18n keys `dash.*` (Task 10).
- Produces: `Shell` (sidebar nav + header with user email + logout, renders `<Outlet/>`), and `Home`/`Mail`/`HR` content pages. `HR` shows a "no permission" message when `user.role !== 'admin'`.

- [ ] **Step 1: Create `src/pages/dashboard/Shell.jsx`**

```jsx
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, Mail, Users, LogOut } from 'lucide-react'
import { useAuth } from '../../lib/auth.jsx'

export default function Shell() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function onLogout() {
    await logout()
    navigate('/login')
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
    }`

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="flex w-60 flex-col border-r border-gray-200 bg-white p-4">
        <div className="mb-6 px-2 text-lg font-bold text-gray-900">CMC SpaceY</div>
        <nav className="flex flex-1 flex-col gap-1">
          <NavLink to="/app" end className={linkClass}>
            <Home size={18} /> {t('dash.nav.home')}
          </NavLink>
          <NavLink to="/app/mail" className={linkClass}>
            <Mail size={18} /> {t('dash.nav.mail')}
          </NavLink>
          <NavLink to="/app/hr" className={linkClass}>
            <Users size={18} /> {t('dash.nav.hr')}
          </NavLink>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
          <span className="text-sm text-gray-600">{user?.email}</span>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut size={16} /> {t('dash.logout')}
          </button>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/pages/dashboard/Home.jsx`**

```jsx
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../lib/auth.jsx'

export default function Home() {
  const { t } = useTranslation()
  const { user } = useAuth()
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">{t('dash.home.welcome')}</h1>
      <p className="mt-2 text-gray-600">{user?.email}</p>
    </div>
  )
}
```

- [ ] **Step 3: Create `src/pages/dashboard/Mail.jsx`**

```jsx
import { useTranslation } from 'react-i18next'

export default function Mail() {
  const { t } = useTranslation()
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">{t('dash.nav.mail')}</h1>
      <p className="mt-2 text-gray-600">{t('dash.comingSoon')}</p>
    </div>
  )
}
```

- [ ] **Step 4: Create `src/pages/dashboard/HR.jsx`**

```jsx
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../lib/auth.jsx'

export default function HR() {
  const { t } = useTranslation()
  const { user } = useAuth()
  if (user?.role !== 'admin') {
    return <p className="text-gray-600">{t('dash.noPermission')}</p>
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">{t('dash.nav.hr')}</h1>
      <p className="mt-2 text-gray-600">{t('dash.comingSoon')}</p>
    </div>
  )
}
```

- [ ] **Step 5: Verify the production build compiles**

Run: `npm run build`
Expected: build succeeds with no unresolved-import errors (this exercises Tasks 7–9 + i18n keys from Task 10, so do this step after Task 10 if running strictly in order; otherwise expect missing-key warnings only, not build failures).

- [ ] **Step 6: Commit**

```bash
git add src/pages/dashboard/
git commit -m "feat(web): add dashboard shell and placeholder pages"
```

---

## Task 10: i18n keys for auth + dashboard

**Files:**
- Modify: `src/locales/vi.js`
- Modify: `src/locales/en.js`
- Modify: `src/locales/zh.js`

**Interfaces:**
- Consumes: nothing.
- Produces: `auth` and `dash` translation namespaces used by Tasks 8–9.

- [ ] **Step 1: Add keys to `src/locales/vi.js`**

Add these two top-level keys to the exported object (alongside existing keys):
```js
  auth: {
    title: 'Đăng nhập',
    email: 'Email',
    password: 'Mật khẩu',
    signIn: 'Đăng nhập',
    signingIn: 'Đang đăng nhập…',
    errors: {
      invalid_credentials: 'Sai email hoặc mật khẩu',
      mail_unreachable: 'Không kết nối được máy chủ mail, thử lại sau',
      unknown: 'Có lỗi xảy ra, thử lại sau',
    },
  },
  dash: {
    logout: 'Đăng xuất',
    comingSoon: 'Tính năng đang phát triển',
    noPermission: 'Bạn không có quyền truy cập mục này',
    nav: { home: 'Trang chủ', mail: 'Hộp thư', hr: 'Nhân sự' },
    home: { welcome: 'Chào mừng đến với bảng điều khiển' },
  },
```

- [ ] **Step 2: Add keys to `src/locales/en.js`**

```js
  auth: {
    title: 'Sign in',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign in',
    signingIn: 'Signing in…',
    errors: {
      invalid_credentials: 'Incorrect email or password',
      mail_unreachable: 'Cannot reach mail server, please try again later',
      unknown: 'Something went wrong, please try again',
    },
  },
  dash: {
    logout: 'Sign out',
    comingSoon: 'Feature under development',
    noPermission: 'You do not have access to this section',
    nav: { home: 'Home', mail: 'Mailbox', hr: 'HR' },
    home: { welcome: 'Welcome to the dashboard' },
  },
```

- [ ] **Step 3: Add keys to `src/locales/zh.js`**

```js
  auth: {
    title: '登录',
    email: '邮箱',
    password: '密码',
    signIn: '登录',
    signingIn: '登录中…',
    errors: {
      invalid_credentials: '邮箱或密码错误',
      mail_unreachable: '无法连接邮件服务器，请稍后重试',
      unknown: '发生错误，请稍后重试',
    },
  },
  dash: {
    logout: '退出登录',
    comingSoon: '功能开发中',
    noPermission: '您无权访问此部分',
    nav: { home: '主页', mail: '邮箱', hr: '人事' },
    home: { welcome: '欢迎使用控制台' },
  },
```

- [ ] **Step 4: Verify build + commit**

Run: `npm run build`
Expected: build succeeds.
```bash
git add src/locales/
git commit -m "feat(web): add auth and dashboard i18n keys"
```

---

## Task 11: End-to-end manual verification

**Files:** none (verification only).

- [ ] **Step 1: Set up env**

```bash
cp server/.env.example server/.env
# edit server/.env: set JWT_SECRET to a long random string (IMAP host/port already filled)
```

- [ ] **Step 2: Start both processes**

Run: `npm run dev:all`
Expected: vite on `http://localhost:5173`, API on `http://localhost:3001`.

- [ ] **Step 3: Verify the landing page still works**

Open `http://localhost:5173/` — the existing landing page renders unchanged.

- [ ] **Step 4: Verify protected redirect**

Open `http://localhost:5173/app` — redirected to `/login`.

- [ ] **Step 5: Verify bad credentials**

At `/login`, submit a wrong password for a real mailbox → error message "Sai email hoặc mật khẩu".

- [ ] **Step 6: Verify successful login**

Submit valid PA Vietnam mailbox credentials → lands on `/app` dashboard; header shows the email. Reloading `/app` stays logged in (cookie persists).

- [ ] **Step 7: Verify admin vs member**

Log in as `contact@cmcspacey.com` → `/app/hr` shows the HR placeholder. Log in as a non-admin mailbox → `/app/hr` shows "Bạn không có quyền truy cập mục này".

- [ ] **Step 8: Verify logout**

Click logout → redirected to `/login`; visiting `/app` again redirects to `/login`.

- [ ] **Step 9: Final full test run**

Run: `npm test`
Expected: all backend tests pass.

---

## Notes for the implementer

- Run two processes during dev: `npm run dev:all`.
- The frontend has no component-test runner in this plan; frontend correctness is verified by `npm run build` + the manual steps in Task 11.
- Never log or store the mail password. The login route discards it after `verifyImapLogin`.
- When moving to AWS later: swap better-sqlite3 for Postgres (the `users` schema and ISO timestamps are already compatible), set `NODE_ENV=production` (enables `secure` cookies), and serve the built frontend.
