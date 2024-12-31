//axios的封装处理
import axios from "axios"

//1.根域名配置
//2.超时时间
//3.请求拦截器
//4.响应拦截器
//5.错误统一处理
//6.取消请求
//7.封装请求方法
//8.设置请求头
const request = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
})
// 在请求发送之前做拦截 插入一些自定义的配置 参数的处理等
request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器 在响应返回到客户端之前做拦截 重点处理返回的数据
request.interceptors.response.use(
  // 2xx的响应状态码都会触发该函数
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { request }
