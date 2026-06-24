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
