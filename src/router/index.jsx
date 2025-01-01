//路由配置
import Layout from "@/pages/Layout"
import Login from "@/pages/Login"
// import Home from "@/pages/Home"
// import Article from "@/pages/Article"
// import Publish from "@/pages/Publish"
import { createBrowserRouter, Navigate } from "react-router-dom"
import AuthRoute from "@/components/AuthRoute"
import { lazy, Suspense } from "react"
// 把Home 和 Article和 Publish 设置为懒加载
const Home = lazy(() => import("@/pages/Home"))
const Article = lazy(() => import("@/pages/Article"))
const Publish = lazy(() => import("@/pages/Publish"))
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
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "article",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Article />
            </Suspense>
          ),
        },
        {
          path: "publish",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Publish />
            </Suspense>
          ),
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
