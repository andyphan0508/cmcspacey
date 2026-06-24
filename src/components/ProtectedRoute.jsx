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
