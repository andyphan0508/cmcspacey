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
