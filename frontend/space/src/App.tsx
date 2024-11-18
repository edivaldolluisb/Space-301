import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CreateTripPage } from "./pages/create-account"
import { TripDetailsPage } from "./pages/trip-details"
import SinaisVitais from "./pages/SinaisVitais"

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
    path: "/sinais-vitais",
    element: <SinaisVitais />
  },
])

export function App() {
  return <RouterProvider router={router} />
}
