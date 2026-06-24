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
