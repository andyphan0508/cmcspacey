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
