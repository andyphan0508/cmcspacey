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
