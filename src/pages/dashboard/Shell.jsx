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
