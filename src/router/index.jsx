//路由配置
import Layout from "@/pages/Layout"
import Login from "@/pages/Login"
import { createBrowserRouter } from "react-router-dom"
import AuthRoute from "@/components/AuthRoute"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <AuthRoute>
          <Layout />
        </AuthRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
)

export default router
