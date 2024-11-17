import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CreateTripPage } from "./pages/create-account"
import { AlertsPage } from "./pages/trip-details"
import { DashboardPage } from "./pages/company"


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
])

export function App() {
  return <RouterProvider router={router} />
}
