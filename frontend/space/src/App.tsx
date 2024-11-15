import { createBrowserRouter, RouterProvider } from "react-router-dom"
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
])

export function App() {
  return <RouterProvider router={router} />
}
