import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.scss"
import { RouterProvider } from "react-router-dom"
import router from "./router/index.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </StrictMode>
)
