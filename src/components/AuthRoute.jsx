// 封装高阶组件 有token正常跳转 没有token就跳转到登录页

import { getToken, removeToken } from "@/utils"
import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { request } from "@/utils/request"
import { message } from "antd"

// eslint-disable-next-line react/prop-types
function AuthRoute({ children }) {
  const token = getToken()
  const [isValid, setIsValid] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        // 1. 先等待 5 秒
        // await new Promise((resolve) => setTimeout(resolve, 5000))
        // 2. 然后发送验证请求
        const res = await request.get("/user/profile")
        console.log(res)
        setIsValid(true)
      } catch (error) {
        console.log(error)
        message.error("登录过期，请重新登录")
        removeToken()
      } finally {
        setLoading(false)
      }
    }

    validateToken()
  }, [token])

  if (loading) {
    return <div>Loading...</div>
  }

  return isValid ? children : <Navigate to="/login" replace />
}

export default AuthRoute
