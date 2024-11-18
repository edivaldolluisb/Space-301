import { createBrowserRouter, RouterProvider } from "react-router-dom"

import DashBoardEmpresa from "./pages/DashBoardEmpresa"
import SettingsPage from "./pages/SettingsPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashBoardEmpresa />
  },
  {
    path: "/settings",
    element: <SettingsPage />
  },
])

export function App() {

  return <RouterProvider router={router} />
}