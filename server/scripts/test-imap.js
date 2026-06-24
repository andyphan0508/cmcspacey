import '../env.js'
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
