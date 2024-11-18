import { createBrowserRouter, RouterProvider } from "react-router-dom"
import History from "./pages/History"
import HistoryDetails from "./pages/HistoryDetails"

const router = createBrowserRouter([
  {
    path: "/",
    element: <History />
  },
  {
    path: "/details/:id",
    element: <HistoryDetails />
  },
])

export function App() {

  return <RouterProvider router={router} />
}

