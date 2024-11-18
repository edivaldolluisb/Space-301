import { createBrowserRouter, RouterProvider } from "react-router-dom"
import History from "./pages/History"
import HistoryDetails from "./pages/HistoryDetails"
import { CreateTripPage } from "./pages/create-account"
import { TripDetailsPage } from "./pages/trip-details"
import NewLaunch from "./pages/NewLaunch"
import { AlertsPage } from "./pages/trip-details"
import { DashboardPage } from "./pages/company"
import { RocketDetailsPage } from "./pages/company/rocket-dashboard"


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
  },
  {
    path: "/launches",
    element: <NewLaunch />
  }
])



export function App() {
  return <RouterProvider router={router} />
}
