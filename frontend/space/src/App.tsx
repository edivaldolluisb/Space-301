import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { History } from "./pages/LaunchHistory/History"
import HistoryDetails from "./pages/LaunchHistory/HistoryDetails"
import { CreateTripPage } from "./pages/create-account"
import { AlertsPage } from "./pages/trip-details"
import { DashboardPage } from "./pages/company"
import { RocketDetailsPage } from "./pages/company/rocket-dashboard"
import SinaisVitais from "./pages/SinaisVitais"
import SpaceSettings from "./pages/SpaceSettings"
import VisitorDashboard from "./pages/VisitorDashboard"


const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />
  },
  {
    path: "/alerts",
    element: <AlertsPage />
  },
  {
    path: "/sinais-vitais",
    element: <SinaisVitais />
  },
  {
    path: "/dashboard",
    element: <DashboardPage />
  },
  {
    path: "/rocket/:rocketId",
    element: <RocketDetailsPage />
  },
  {
    path: "/history",
    element: <History />
  },
  {
    path: "/history/details/:id",
    element: <HistoryDetails />
  },
  {
    path: "/settings",
    element: <SpaceSettings />
  },
  {
    path: "/visitor",
    element: <VisitorDashboard />
  }
])

export function App() {
  return <RouterProvider router={router} />
}
