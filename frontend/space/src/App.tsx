import { createBrowserRouter, RouterProvider } from "react-router-dom"
import History from "./pages/History"
import HistoryDetails from "./pages/HistoryDetails"
import { CreateTripPage } from "./pages/create-account"
import { AlertsPage } from "./pages/trip-details"
import { DashboardPage } from "./pages/company"
import { RocketDetailsPage } from "./pages/company/rocket-dashboard"
import SinaisVitais from "./pages/SinaisVitais"


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
    path: "/details/:id",
    element: <HistoryDetails />
  }
])

export function App() {
  return <RouterProvider router={router} />
}
