// 封装和文章相关的所有请求
import { request } from "@/utils"
// 获取频道列表
export function getChannelsAPI() {
  return request({
    url: "/channels",
    method: "get",
  })
}
// 提交文章表单
export function createArticleAPI(data) {
  return request({
    url: "/mp/articles?draft=false",
    method: "post",
    data,
  })
}