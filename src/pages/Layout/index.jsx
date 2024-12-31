// 测试token是否成功注入
import { request } from "@/utils"
import { useEffect } from "react"
const Layout = () => {
  useEffect(() => {
    const loadProfile = async () => {
      const res = await request.get("/user/profile")
      console.log(res)
    }
    loadProfile()
  }, []) // 空依赖数组
  return <div>Layout</div>
}

export default Layout
