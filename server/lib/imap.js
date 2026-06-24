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
