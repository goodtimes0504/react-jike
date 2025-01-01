// 封装和文章相关的所有请求
import { request } from "@/utils"
// 获取频道列表
export function getChannelsAPI() {
  return request({
    url: "/channels",
    method: "get",
  })
}
