import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { History } from "./pages/LaunchHistory/LaunchHistory"
import { AuthPage } from "./pages/create-account"
import { AlertsPage } from "./pages/alerts"
import { DashboardPage } from "./pages/company"
import { RocketDetailsPage } from "./pages/company/rocket-dashboard"
import SinaisVitais from "./pages/SinaisVitais"
import SettingsPage from "./pages/settings"
import { Users } from "./pages/settings/Users"
import { NotFound } from "./pages/notfound"
import VisitorDashboard from "./pages/visitor/VisitorDashboard"

import { ProtectedRoute } from './components/ProtectedRoute';


const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />
  },
  {
    path: "/dashboard",
    element: <DashboardPage />
  },
  {
    path: "/rocket/:launchId",
    element: <RocketDetailsPage />
  },
  {
    path: "/visitor",
    element: <VisitorDashboard />
  },
  {
    path: "*",
    element: <NotFound />
  },
  {

    element: <ProtectedRoute />,
    children: [
      {
        path: "/alerts",
        element: <AlertsPage />
      },
      {
        path: "/sinais-vitais/:launchId",
        element: <SinaisVitais />
      },
      {
        path: "/history",
        element: <History />
      },
      {
        path: "/settings",
        element: <SettingsPage />
      },
      {
        element: <ProtectedRoute allowedRoles={['ADMIN']} />,
        children: [
          {
            path: "/settings/users",
            element: <Users />
          }
        ]
      }
    ]
  }
])



export function App() {
  return <RouterProvider router={router} />
}
