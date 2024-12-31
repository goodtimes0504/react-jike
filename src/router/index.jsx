//路由配置
import Layout from "@/pages/Layout"
import Login from "@/pages/Login"
import Home from "@/pages/Home"
import Article from "@/pages/Article"
import Publish from "@/pages/Publish"
import { createBrowserRouter, Navigate } from "react-router-dom"
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
      children: [
        {
          path: "/",
          element: <Navigate to="/home" replace />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "article",
          element: <Article />,
        },
        {
          path: "publish",
          element: <Publish />,
        },
      ],
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
