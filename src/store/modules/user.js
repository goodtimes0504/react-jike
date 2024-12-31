// 和用户相关的状态管理
import { request } from "@/utils"
import { createSlice } from "@reduxjs/toolkit"

const userStore = createSlice({
  name: "user",
  initialState: {
    token: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
  },
})
//结构出actionCreator
const { setToken } = userStore.actions
//获取reducer函数
const userReducer = userStore.reducer
//异步方法 完成登录获取token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await request.post("/authorizations", loginForm)
    dispatch(setToken(res.data.token))
  }
}
export { setToken, fetchLogin }
//userReducer
export default userReducer
