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


const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />
  },
  {
    path: "/",
    element: <AuthPage />
  },
  {
    path: "/alerts",
    element: <AlertsPage />
  },
  {
    path: "/sinais-vitais/:launchId",
    element: <SinaisVitais />
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
    path: "/history",
    element: <History />
  },
  {
    path: "/settings",
    element: <SettingsPage />
  },
  {
    path: "/settings/users",
    element: <Users />
  },
  {
    path:"/visitor",
    element:<VisitorDashboard/>
  }
])



export function App() {
  return <RouterProvider router={router} />
}
