import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.scss"
import { RouterProvider } from "react-router-dom"
import router from "./router/index.jsx"
import { Provider } from "react-redux"
import store from "@/store/index.js"
import "normalize.css"
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </Provider>
  </StrictMode>
)
