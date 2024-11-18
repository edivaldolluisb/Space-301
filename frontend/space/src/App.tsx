import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CreateTripPage } from "./pages/create-account"
import { TripDetailsPage } from "./pages/trip-details"
import NewLaunch from "./pages/NewLaunch"

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
    path: "/launches",
    element: <NewLaunch />
  }
])



export function App() {
  return <RouterProvider router={router} />
}
