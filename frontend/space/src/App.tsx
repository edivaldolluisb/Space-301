import { createBrowserRouter, RouterProvider } from "react-router-dom"
import History from "./pages/History"
import HistoryDetails from "./pages/HistoryDetails"
import { CreateTripPage } from "./pages/create-account"
import { TripDetailsPage } from "./pages/trip-details"

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />
  },
  {
    path: "/alerts",
    element: <TripDetailsPage />
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
