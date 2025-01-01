// 用户相关的所有请求
import { request } from "@/utils/request"
// 登录
export function loginAPI(formData) {
  return request({
    url: "/authorizations",
    method: "post",
    data: formData,
  })
}
// 获取用户信息
export function getProfileAPI() {
  return request({
    url: "/user/profile",
    method: "get",
  })
}
